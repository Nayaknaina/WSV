const express = require("express");
const logIncollection = require("./models/admin.model.js");
const app = express();
const path = require("path");
const port = process.env.PORT || 8000;
const templatepath = path.join(__dirname, "../template");
const hbs = require("hbs");
require("dotenv").config();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const MongoStore = require("connect-mongo");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/auth");
const querystring = require("querystring");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const { v4: uuidv4 } = require('uuid');
const pipelineModel = require('./models/pipeline.model.js')

// Middleware
const sessionStore =
  process.env.NODE_ENV === "production"
    ? MongoStore.create({
        mongoUrl:
          "mongodb+srv://nainanayak288:Dkccg5NaZMANqu7F@wsvconnect.bpxfx.mongodb.net/",
      }) // Replace with your MongoDB connection URI
    : new session.MemoryStore();


app.use(
  session({
    secret: "your_secret_key", // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);

const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path));
app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(path.join(__dirname, '../template/partials'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static("template"));



// Passport.js Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK,
  passReqToCallback: true
},
async function(request, accessToken, refreshToken, profile, done) {
  try {
    let user = await logIncollection.findOne({ googleId: profile.id });
    
    if (user) {
      // Update the existing user
      user.name = profile.displayName;
      user.email = profile.email;
      user.profilePicture = profile.photos[0].value;
      await user.save();
    } else {
      // Create a new user
      user = await logIncollection.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.email,
        profilePicture: profile.photos[0].value,
      });
    }
    
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

// Passport.js serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id); // Serialize user by their unique ID
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await logIncollection.findById(id); // Find user by ID
    
    
    done(null, user); // Attach user object to request
  } catch (err) {
    done(err, null);
  }
});

app.use(passport.initialize());
app.use(passport.session());


// app.use('/pipeline', pipelineRouter)

// Handle root request
app.get("/", (req, res) => {
  res.sendFile(path.join(static_path, "index.html"));
});

app.get("/connect", async (req, res) => {
  const token = req.cookies["360Followers"];
  // console.log(token);

  const userData =  jwt.decode(token);
  if (userData === null) {
    
    return res.redirect("/login");
  }

  const user = jwt.decode(userData);

  res.render("connect", { user, allLeads: null });
});
// Login and Signup routes
app.get("/login", (req, res) => {
  res.render("signup");
});

// app 
app.get("/apps", (req, res) => {
  res.render("app");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

// ! pipeline are here 

app.post('/pipeline',async (req,res)=>{
  const {title,color} = req.body

  const token = req.cookies["360Followers"];
  const userData = jwt.decode(token);

  if (!userData) {
    return res.redirect("/login");
  }
  const user = await logIncollection.findById(userData.id);

  const pipeline = new pipelineModel({ uid:user._id, color, title ,cid:user.cid });
    await pipeline.save();
    // console.log(pipeline);
  
    res.redirect('/dashboard')
  })

app.get('/pipeline/del/:id',async(req,res)=>{
  const {id} = req.params
  let pipeline = await pipelineModel.findByIdAndDelete(id)
  // console.log(pipeline);
  res.redirect('/dashboard')
})

app.post('/pipeline/update/:id',async(req,res)=>{
  const {id} = req.params
  const {title,color} = req.body
  let pipeline = await pipelineModel.findById(id)

  console.log(pipeline);
  console.log(title,color);

  pipeline.color = color;
  pipeline.title = title;
  pipeline.updatedAt = Date.now();
  await pipeline.save()
  res.redirect('/dashboard')
})



app.get("/profile", async (req, res) => {

  const token = req.cookies["360Followers"];
    const userData = jwt.decode(token);

    if (!userData) {
      return res.redirect("/login");
    }
    const user = await logIncollection.findById(userData.id);

    res.render("profile", { user });
});


  

// Dashboard route
app.get("/dashboard", async (req, res) => {
  try {
    const token = req.cookies["360Followers"];
    const userData = jwt.decode(token);
    
    if (!userData) {
      return res.redirect("/login");
    }
    
    const user = await logIncollection.findById(userData.id);
    const pipelines = await pipelineModel.find({uid: user._id})
    // req.session.id = userData.id;
    res.render("dashboard", { user, pipelines });
  } catch (error) {
    res.status(500).send("Internal error");
  }
});

// Google Authentication Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }),(req,res)=>{
  
  
});

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/signup' }),
  async (req, res) => {
    const token = await generateToken(req.user);

    res.cookie("360Followers", token, { httpOnly: true, maxAge: 3600000 });
    res.redirect('/dashboard');
  }
);



// Signup handler

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const user = await logIncollection.findOne({ email });

    if (user)
      return res.render("signup", { errorMessage: "User already exists" });
    if (password !== confirmPassword)
      return res.render("signup", { errorMessage: "Passwords do not match" });
    const cid = uuidv4();
    const newUser = new logIncollection({ name, email, password,cid });
    await newUser.save();
    const token = await generateToken(newUser);

    res.cookie("360Followers", token, { httpOnly: true, maxAge: 3600000 });
    res.redirect("/dashboard");
  } catch (err) {
    res.status(500).send("Error signing up");
  }
});

// Login handler
app.post("/login", async (req, res) => {
  try {
    const check = await logIncollection.findOne({ email: req.body.email });

    if (!check || check.password !== req.body.password) {
      return res.render("signup", {
        errorMessage: "Invalid username or password",
      });
    }

    const token = await generateToken(check);
    res.cookie("360Followers", token, { httpOnly: true, maxAge: 3600000 });
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error logging in");
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("360Followers");
  res.redirect("/");
});

// Facebook Login Route
app.get("/auth/facebook", (req, res) => {
  const facebookAuthUrl =
    `https://www.facebook.com/v20.0/dialog/oauth?` +
    querystring.stringify({
      client_id: process.env.FB_CLIENT_ID,
      redirect_uri: process.env.REDIRECT_URI,
      scope: "email,pages_show_list,leads_retrieval",
      response_type: "code",
    });

  res.redirect(facebookAuthUrl);
});

// Facebook Callback Route
app.get("/auth/facebook/callback", async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("Invalid authorization code");
  }

  try {
    const tokenResponse = await axios.get(
      "https://graph.facebook.com/v20.0/oauth/access_token",
      {
        params: {
          client_id: process.env.FB_CLIENT_ID,
          redirect_uri: process.env.REDIRECT_URI,
          client_secret: process.env.FB_CLIENT_SECRET,
          code
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;
    // console.log(accessToken);

    req.session.accessToken = accessToken;
    // console.log(req.session.accessToken);

    res.redirect("/leads");
  } catch (error) {
    console.error("Error fetching access token:", error);
    res.status(500).send("Error logging in with Facebook.");
  }
});

// Facebook Leads Fetch Route
app.get("/leads", ensureAuthenticated, async (req, res) => {
  try {
    const accessToken = req.session.accessToken;

    const pagesResponse = await axios.get(
      `https://graph.facebook.com/v20.0/me/accounts`,
      {
        params: {
          access_token: accessToken,
        },
      }
    );

    const pages = pagesResponse.data.data;
    let allLeads = [];

    for (const page of pages) {
      const leadFormsResponse = await axios.get(
        `https://graph.facebook.com/v20.0/${page.id}/leadgen_forms`,
        {
          params: { access_token: page.access_token },
        }
      );

      const leadForms = leadFormsResponse.data.data;

      for (const form of leadForms) {
        const leadsResponse = await axios.get(
          `https://graph.facebook.com/v20.0/${form.id}/leads`,
          {
            params: {
              access_token: page.access_token,
              fields: "id,created_time,field_data",
            },
          }
        );

        allLeads.push(...leadsResponse.data.data);
      }
    }

    const token = req.cookies["360Followers"];
    const userData = jwt.decode(token);

    if (!userData) {
      return res.redirect("/login");
    }

    const user = await logIncollection.findById(userData.id);

    // console.log(allLeads);

    res.render("leads", { user, allLeads });
    // res.json({ leads: allLeads });
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).send("Error fetching leads");
  }
});

// Middleware to ensure the user is authenticated
function ensureAuthenticated(req, res, next) {
  // console.log(req.session.accessToken);

  if (req.session.accessToken) {
    return next();
  }
  res.redirect("/connect");
}

// Handle dynamic routes to serve pages without .html extension
app.get("/:page", (req, res) => {
  const page = req.params.page;
  const filePath = path.join(static_path, `${page}.html`);

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send("Page not found");
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at PORT:${port}`);
});
