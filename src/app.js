const express = require("express");
const logIncollection = require("./models/admin.model.js");
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const app = express();
const path = require("path");
const port = process.env.PORT || 8000;
let qrCodeData = ''; // To store QR code data
let whatsappClientReady = false; // Flag to track client readiness
const templatepath = path.join(__dirname, "../template");
const hbs = require("hbs");
require("dotenv").config();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const MongoStore = require("connect-mongo");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const { generateToken } = require("../utils/auth");
const querystring = require("querystring");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const { v4: uuidv4 } = require('uuid');
const { sendMail } = require("./service/mailSender.js");
const pipelineModel = require('./models/pipeline.model.js')
const memberModel = require('./models/member.models.js')
const leadsModel = require('./models/leads.model.js')

const memberRoute = require('./routes/members.route.js');
const { log } = require("console");

// Initialize WhatsApp Client
const client = new Client({
  authStrategy: new LocalAuth(), // This saves session data locally
});



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

hbs.registerHelper('formatDate', function (datetime) {
  const date = new Date(datetime);
  return date.toISOString().split('T')[0]; // Extract YYYY-MM-DD
});

hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper('containsPhoneNumber', function (text) {
  // Regular expression for matching phone numbers
  const phoneNumberPattern = /(\+?\d{1,4}[ -]?)?(\(?\d{2,4}\)?[ -]?)?\d{6,12}/;
  return phoneNumberPattern.test(text);
});



app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static("template"));

// Endpoint to handle logout
app.get('/logout', async (req, res) => {
  try {
      await client.logout(); // Log out the client
      console.log('Logged out successfully.');
      whatsappClientReady = false;
      qrCodeData = ''; // Clear QR code data
      res.send('Logged out successfully. <a href="/qr">Scan QR Code again</a>');
  } catch (error) {
      console.error('Error logging out:', error);
      res.status(500).send('Error logging out.');
  }
});
// Generate and store the QR code data
client.on('qr', (qr) => {
  qrcode.toDataURL(qr, (err, url) => {
      if (err) {
          console.error('Error generating QR code:', err);
          return;
      }
      qrCodeData = url;
     
      
  });
});

// Event when client is authenticated and READY
client.on('ready', () => {
  console.log('WhatsApp client is ready!');
  whatsappClientReady = true;
});

// Event when client is disconnected
client.on('disconnected', () => {
  console.log('WhatsApp client has been disconnected.');
  whatsappClientReady = false;
});

// Function to send a WhatsApp message
function sendMessageToLead(phoneNumber, message) {
  if (!whatsappClientReady) {
      console.error('WhatsApp client is not ready. Cannot send message.');
      return;
  }

  client.sendMessage(phoneNumber, message)
      .then((result) => {
          console.log('Message sent:', result);
      })
      .catch((error) => {
          console.error('Error sending message:', error);
      });
}


// Serve QR code via HTTP
app.get('/qr', isAdminLoggedIn,(req, res) => {
  const user = req.user
  console.log( qrCodeData);
  
  res.render("qr",{user,qrCodeData});
});

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


app.use('/member', memberRoute)

// Handle root request
app.get("/", (req, res) => {
  res.sendFile(path.join(static_path, "index.html"));
});

app.get("/connect", isAdminLoggedIn, async (req, res) => {
  const user = req.user
  res.render("connect", { user, allLeads: null });
});
// Login and Signup routes
app.get("/login", (req, res) => {
  res.render("signup");
});

// app 
app.get("/apps", isAdminLoggedIn,(req, res) => {
  const user = req.user
  res.render("app",{user});
});
// team 
app.get("/team", isAdminLoggedIn,(req, res) => {
  const user = req.user
  res.render("team",{user});
});

app.get("/team/invite", isAdminLoggedIn, async(req, res) => {
  const user = req.user;
  const {name, email} = req.query
  const password = otpGenerator.generate(8, { 
    digits: true, 
    lowerCaseAlphabets: true, 
    upperCaseAlphabets: true, 
    specialChars: false
  });

 

  const mailMsg = 
  `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <div style="text-align: center;">
        <img src="https://example.com/logo.png" alt="Web Soft Valley" style="width: 100px;"/>
        <h2>Web Soft Valley</h2>
        <p>Developing Future</p>
      </div>

      <h3>Hello ${name} !</h3>
      <p>Congratulations! Your account has been created successfully. You can log in now and start using our service.</p>
      
      <p>Email: <a href="mailto:${email}">${email}</a></p>
      <p>Password: <strong>${password}</strong></p>

      <div style="text-align: center;">
        <a href="https://example.com/login" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
          Login to Dashboard
        </a>
      </div>

      <p>Regards,<br>Web Soft Valley Technology</p>
    </div>
  `;
  const subject = `Invitation from ${user.name}`
  const isSent = await sendMail(email, mailMsg, subject);
  console.log(isSent);

  if (isSent[0].res === 'okk') {
    const newMember = new memberModel({ name, email, password,cid: user.cid, owner_id: user._id });
    await newMember.save();
    user.teams.push(newMember._id)
    await user.save()
  }
  
  return res.redirect("/team");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

// ! pipeline are here 

app.post('/pipeline',isAdminLoggedIn, async (req,res)=>{
  const {title,color} = req.body

  const user = await logIncollection.findById(req.user.id);

  const pipeline = new pipelineModel({ uid:user._id, color, title ,cid:user.cid });
    await pipeline.save();
    // console.log(pipeline);
  
    res.redirect('/dashboard')
  })

app.get('/pipeline/del/:id',isAdminLoggedIn, async(req,res)=>{
  const {id} = req.params
  let pipeline = await pipelineModel.findByIdAndDelete(id)
  // console.log(pipeline);
  res.redirect('/dashboard')
})

app.post('/pipeline/update/:id', isAdminLoggedIn,async(req,res)=>{
  const {id} = req.params
  const {title,color, defaultVal} = req.body
  
  let pipeline = await pipelineModel.findById(id)
  
  pipeline.color = color;
  pipeline.title = title;
  pipeline.updatedAt = Date.now();
  
  if (defaultVal === 'on') { 
    await pipelineModel.updateMany({ uid: req.user.id }, { $set: { defaultVal: false } });
    
    pipeline.defaultVal = true;
  }
  else{
  pipeline.defaultVal = false;
  }

  await pipeline.save()
  res.redirect('/dashboard')

})



app.get("/profile", isAdminLoggedIn, async (req, res) => {

    const user = await logIncollection.findById(req.user.id);

    res.render("profile", { user });
});

app.get("/gethelp", isAdminLoggedIn, async (req, res) => {

  const user = await logIncollection.findById(req.user.id);

  res.render("gethelp", { user });
});

  

// Dashboard route
app.get("/dashboard", isAdminLoggedIn, async (req, res) => {
  try {
    
    const user = await logIncollection.findById(req.user.id);
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

    res.cookie("360Followers", token, { httpOnly: true, maxAge: 2 * 30 * 24 * 60 * 60 * 1000 });
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
    const newUser = new logIncollection({ name, email, password,cid, role: 'admin' });
    await newUser.save();
    const token = await generateToken(newUser);

    res.cookie("360Followers", token, { httpOnly: true, maxAge: 2 * 30 * 24 * 60 * 60 * 1000 });
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
    res.cookie("360Followers", token, { httpOnly: true, maxAge: 2 * 30 * 24 * 60 * 60 * 1000 });
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
    console.log("redirected from /auth/fb");
    
  res.redirect(facebookAuthUrl);
});

// Facebook Callback Route
app.get("/auth/facebook/callback", isAdminLoggedIn, async (req, res) => {
  const { code } = req.query;
  console.log("comming to /auth/fb/cb");

  if (!code) {
    console.log("no code");
    
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

    console.log("now we have an token");
    
    const accessToken = tokenResponse.data.access_token;
    console.log(accessToken);
    let admin = await logIncollection.findById(req.user.id)
    // console.log(admin);
    
    admin.facebookToken = accessToken;
    await admin.save()

    
    // console.log(req.session.accessToken);

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


    if (!userData) {
      return res.redirect("/login");
    }
    
    const user = await logIncollection.findById(userData.id);

    console.log(allLeads[0]);

    allLeads.forEach(async (lead)=>{
      const perLead = await leadsModel.findOne({lead_id: lead.id})

      if (!perLead) {
        let leads_datas = [];

        lead.field_data.forEach((data)=>{
          leads_datas.push({que:data.name, ans:data.values[0]});  
        })

        const newLead = new leadsModel({ 
          lead_id: lead.id,
          income_time:lead.created_time,
          cid: user.cid,
          leads_data:leads_datas,
          app: 'facebook',
         });
         await newLead.save()
        // console.log(leads_datas);
      }
    })

    chalteRaho(accessToken);

    res.redirect("/leads");
  } catch (error) {
    console.error("Error fetching access token:", error);
    res.status(500).send("Error logging in with Facebook.");
  }
});

// Facebook Leads Fetch Route
app.get("/leads", isAdminLoggedIn, async (req, res) => {
  try {
let user;
console.log("leads page");

    if (req.user.role === 'admin') {   
       user = await logIncollection.findById(req.user.id).populate('myleads')
    }
    else{
      user = await memberModel.findById(req.user.id).populate('myleads')
    }
  
    let leads = await leadsModel.find({cid: user.cid})
   console.log(user);
   
    res.render("leads", { user, leads });
    // res.json({ leads: allLeads });
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).send("Error fetching leads");
  }
});

app.get('/lead/book/:id', isAdminLoggedIn, async (req,res)=>{
  let {id} = req.params;
  
  let lead = await leadsModel.findById(id);
  if (!lead) {
    return res.redirect('/leads')
  }
  if (req.user.role === 'admin') {   
    let admin = await logIncollection.findById(req.user.id)
    admin.myleads.push(lead._id)
    lead.uid = admin._id;
    await admin.save()
    await lead.save()
  }
  else{
    let member = await memberModel.findById(req.user.id)
    member.myleads.push(lead._id)
    lead.uid = member._id;
    await member.save()
    await lead.save()
    
    console.log("bokking the leads by ", member);
    
  }
  res.redirect('/leads')
  
})

app.get('/lead/remove/:id', isAdminLoggedIn, async (req,res)=>{
  let {id} = req.params;
  
  let lead = await leadsModel.findById(id);
  if (!lead) {
    return res.redirect('/leads')
  }
  if (req.user.role === 'admin') {   
    let admin = await logIncollection.findById(req.user.id)
    admin.myleads.splice(admin.myleads.indexOf(lead._id), 1);
    lead.uid = '';
    await admin.save()
    await lead.save()
  }
  else{
    let member = await memberModel.findById(req.user.id)
    member.myleads.splice(member.myleads.indexOf(lead._id), 1);
    lead.uid = '';
    await member.save()
    await lead.save()
    
    console.log("bokking the leads by ", member);
    
  }
  res.redirect('/leads')
  
})


// // Middleware to ensure the user is authenticated
// function ensureAuthenticated(req, res, next) {
//   // console.log(req.session.accessToken);

//   if (req.session.accessToken) {
//     return next();
//   }
//   res.redirect("/connect");
// }

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
  client.initialize();
});




function isAdminLoggedIn(req, res, next) {
  console.log("isAdminLoggedIn middilware");
  const token = req.cookies["360Followers"];
  
  if (!token || token === undefined) {
    return res.redirect("/login");
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
     return res.redirect("/login");
    }   
    
    req.user = decoded;
    // console.log(req.user);
   return next();
  });
}



async function findNewLead(accessToken) {
  
  let allNewLeads = [];
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


  
  allLeads.forEach(async (lead)=>{
    const perLead = await leadsModel.findOne({lead_id: lead.id})

    if (!perLead) {

      console.log("new lead found",lead );
      
      let leads_datas = [];

      lead.field_data.forEach((data)=>{
        leads_datas.push({que:data.name, ans:data.values[0]});  
      })

      const newLead = new leadsModel({ 
        lead_id: lead.id,
        income_time:lead.created_time,
        cid: user.cid,
        leads_data:leads_datas,
        app: 'facebook',
       });
       await newLead.save()
       allNewLeads.push(newLead)

      // console.log(leads_datas);
    }
  })

return allLeads;
}

function chalteRaho(token) {
  let i = 0;
  setInterval(() => {
    findNewLead(token)
    console.log("step",i++);
    
  }, 60000);
}