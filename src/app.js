const express = require("express");
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
const otpGenerator = require("otp-generator");
const { generateToken } = require("../utils/auth");
const querystring = require("querystring");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

const { v4: uuidv4 } = require("uuid");
const { sendMail } = require("./service/mailSender.js");
const { upload } = require("./service/multer.js");
const fs = require("fs");

// const adminFireBase = require('firebase-admin');
// const serviceAccount = require('./config/followupsdemo-firebase-adminsdk-t0rmy-26813e95da.json');


const logIncollection = require("./models/admin.model.js");
const pipelineModel = require("./models/pipeline.model.js");
const memberModel = require("./models/member.model.js");
// const WAmodel = require("./models/whatsappSession.model.js");
const remarkModel = require("./models/remark.model.js");
const leadsModel = require("./models/leads.model.js");
const templateModel = require("./models/temlate.model.js");
const memberRoute = require("./routes/members.route.js");
const { log } = require("console");

const qrcode = require('qrcode');


// adminFireBase.initializeApp({
//   credential: adminFireBase.credential.cert(serviceAccount)
// });

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

hbs.registerPartials(path.join(__dirname, "../template/partials"));

hbs.registerHelper("formatDate", function (datetime) {
  if (!datetime) {
    return ''; // Return an empty string if datetime is invalid
}
  const date = new Date(datetime);
  return date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
});

hbs.registerHelper("formatTime", function (datetime) {
  if (!datetime) {
      return ''; // Return an empty string if datetime is invalid
  }
  const date = new Date(datetime);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`; // Format as HH:MM
});

hbs.registerHelper('countLeadsByStatus', function(leads, pipelineTitle) {
  // Check if leads is defined and is an array
  if (!Array.isArray(leads)) {
    return 0; // Return 0 if leads is not an array
  }

  const filteredLeads = leads.filter(lead => {
    return lead.status && lead.status.title === pipelineTitle;
  });

  return filteredLeads.length;
});
hbs.registerHelper("ifEquals", function (arg1, arg2, options) {
  return arg1 === arg2 ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper('json', function(context) {
  return JSON.stringify(context);
});

hbs.registerHelper("containsPhoneNumber", function (text) {
  // Regular expression for matching phone numbers
  const phoneNumberPattern = /(\+?\d{1,4}[ -]?)?(\(?\d{2,4}\)?[ -]?)?\d{6,12}/;
  return phoneNumberPattern.test(text);
});

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static("template"));

// Passport.js Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
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
    }
  )
);

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

app.use("/member", memberRoute);

// Handle root request
app.get("/", (req, res) => {
  res.sendFile(path.join(static_path, "index.html"));
});

app.get("/connect", isAdminLoggedIn, async (req, res) => {
  const user = req.user;
  res.render("connect", { user, allLeads: null });
});
// Login and Signup routes
app.get("/login", (req, res) => {
  res.render("signup");
});

// app
app.get("/apps", isAdminLoggedIn, (req, res) => {
  const user = req.user;
  res.render("app", { user });
});

app.get("/template", isAdminLoggedIn, async (req, res) => {
  let user;
  console.log(req.user);

  if (req.user.role === "admin") {
    user = await logIncollection.findById(req.user.id);
  } else {
    user = await memberModel.findById(req.user.id);
  }

  let templates = await templateModel.find({ cid: user.cid });
  console.log(templates);


  res.render("template", { user, templates });
});

app.post(
  "/template/update/:id",
  isAdminLoggedIn,
  upload.fields([{ name: "image" }, { name: "pdf" }]),
  async (req, res) => {
    let { id } = req.params;
    let template = await templateModel.findById(id);

    let { title, text, client, team } = req.body;

    const imageFile = req.files["image"] ? req.files["image"][0].filename : "";
    const pdfFile = req.files["pdf"] ? req.files["pdf"][0].filename : "";
    console.log(imageFile);

    template.title = title;
    template.text = text;

    template.client = client === "on" ? true : false;
    template.team = team === "on" ? true : false;

    const filePath1 = path.join(
      __dirname,
      "..",
      "template",
      "images",
      "uploads",
      "whatsapp",
      template.image
    );
    const filePath2 = path.join(
      __dirname,
      "..",
      "template",
      "images",
      "uploads",
      "whatsapp",
      template.pdf
    );
    if (template.image != "") {
      fs.unlink(filePath1, (err) => {
        if (err) {
          console.log("Error removing file", err);
          return;
        }
        console.log("file removed successfully");
      });
      template.image = imageFile;
    } else {
      template.image = imageFile;
    }

    if (template.pdf != "") {
      fs.unlink(filePath2, (err) => {
        if (err) {
          console.log("Error removing file", err);
          return;
        }
        console.log("file removed successfully");
      });
      template.pdf = imageFile;
    } else {
      template.pdf = imageFile;
    }

    await template.save();
    // console.log(req.body);
    res.redirect("/template");
  }
);

// team
app.get("/team", isAdminLoggedIn, async (req, res) => {
  let user;
  if (user.role === "admin") {
    user = await logIncollection.findById(req.user.id).populate("teams");
  } else {
    user = await memberModel.findById(req.user.id).populate("owner_id");
    console.log(user);
  }
  res.render("team", { user });
});

app.get("/team/invite", isAdminLoggedIn, async (req, res) => {
  const user = req.user;
  const { name, email, mobile } = req.query;
  const password = otpGenerator.generate(8, {
    digits: true,
    lowerCaseAlphabets: true,
    upperCaseAlphabets: true,
    specialChars: false,
  });

  const mailMsg = `
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
        <a href="https://360followups.com/member/login" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
          Login to Dashboard
        </a>
      </div>

      <p>Regards,<br>Web Soft Valley Technology</p>
    </div>
  `;
  const subject = `Invitation from ${user.name}`;
  const isSent = await sendMail(email, mailMsg, subject);
  console.log(isSent);

  if (isSent[0].res === "okk") {
    const newMember = new memberModel({
      name,
      email,
      mobile,
      password,
      cid: user.cid,
      owner_id: user._id,
    });
    await newMember.save();
    user.teams.push(newMember._id);
    await user.save();
  }

  return res.redirect("/team");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

// ! pipeline are here

app.post("/pipeline", isAdminLoggedIn, async (req, res) => {
  const { title, color } = req.body;

  const user = await logIncollection.findById(req.user.id);

  const pipeline = new pipelineModel({
    uid: user._id,
    color,
    title,
    cid: user.cid,
  });
  await pipeline.save();
  // console.log(pipeline);

  res.redirect("/dashboard");
});

app.get("/pipeline/del/:id", isAdminLoggedIn, async (req, res) => {
  const { id } = req.params;
  let pipeline = await pipelineModel.findByIdAndDelete(id);
  // console.log(pipeline);
  res.redirect("/dashboard");
});

app.post("/pipeline/update/:id", isAdminLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { title, color, defaultVal } = req.body;

  let pipeline = await pipelineModel.findById(id);
  
  pipeline.color = color;
  pipeline.title = title;
  
  if (defaultVal == "on") {
    console.log(defaultVal);
    await pipelineModel.updateMany({ uid: req.user.id }, { $set: { defaultVal: false } });
    req.session.pipe = id;

    await pipeline.save();
    return res.redirect('/pipe/abc')
  }
  
  return res.redirect("/dashboard");
});
app.get('/pipe/abc', async (req,res)=>{

  let pipe = await pipelineModel.findById(req.session.pipe)
  pipe.defaultVal = true;
  await pipe.save()

  delete req.session.pipe;
  req.session.save();

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


app.post("/submit-form", async (req, res) => {
  try {
    const email = req.body.email;
    const organizationName = req.body.organizationName;
    const sector = req.body.sector;

    const user = await logIncollection.findOne({ email });

    if (user) {
      res.send({ message: "Form submitted successfully", id: user._id });
    } else {
      res.status(404).send({ message: "User not found" })
    }
  } catch (error) {
    res.status(500).send("Internal error");
  }
});
//UPDATE-USER
app.post("/update-user", async (req, res) => {
  try {
    const id = req.body.id;
    const organizationName = req.body.organizationName;
    const sector = req.body.sector;

    await logIncollection.findByIdAndUpdate(id, {
      organizationName,
      sector,
    });

    res.send({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error updating user" });
  }
});

// Dashboard route
app.get("/dashboard", isAdminLoggedIn, async (req, res) => {
  try {
    console.log("dashboard");
    
    const user = await logIncollection.findById(req.user.id).populate("myleads");
    if (!user.organizationName) {
      return res.render("dashboard", { showForm: true });
    }
 
    const pipes = await pipelineModel.find({ cid: user.cid }).sort({ defaultVal: -1 }).exec();
    const leads = await leadsModel.find({ cid: user.cid }).populate("status")
    
    
    res.render("dashboard", { user, pipes, leads});
    // res.render("dashboard", { user, pipes, leads, showForm: false,qrCode: qrCodeImage });

  } catch (error) {
    res.status(500).send("Internal error");
  }
});
// app.get("/dashboard", isAdminLoggedIn, async (req, res) => {
//   try {
//     const user = await logIncollection.findById(req.user.id);
//     const pipelines = await pipelineModel.find({ uid: user._id });
//     // req.session.id = userData.id;
//     res.render("dashboard", { user, pipelines });
//   } catch (error) {
//     res.status(500).send("Internal error");
//   }
// });
// app.get("/dashboard", isAdminLoggedIn, async (req, res) => {
//   try {
//     const user = await Organization.findOne({ email: req.user.email });
//     let showForm = true;
//     if (user) {
//       showForm = !user.formSubmitted;
//     }
//     res.render("dashboard", { user, showForm });
//   } catch (error) {
//     res.status(500).send("Internal error");
//   }
// });

// Google Authentication Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  (req, res) => { }
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/signup" }),
  async (req, res) => {
    console.log(req.user);

    let user = await logIncollection.findOne({ email: req.user.email })
    const cid = uuidv4();
    user.cid = cid;
    user.role = "admin"
    await user.save()

    const pipelines = [
      { title: 'win', color: '#28A745' },
      { title: 'loss', color: '#DC3545' },
      { title: 'held', color: '#007BFF' },
      { title: 'pending', color: '#FFC107' },
    ].map(pipelineData => new pipelineModel({
      uid: user._id,
      color: pipelineData.color,
      title: pipelineData.title,
      cid: user.cid,
    }));

    // Save all pipelines in parallel
    await Promise.all(pipelines.map(pipeline => pipeline.save()));

    const templates = [
      {
        title: 'welcome',
        text: "hello dear ! 👋\r\n\r\nWelcome to 360followups! thank you for reaching out to us and showing interest in our services. we're excited to connect with you! our team will be in touch with you shortly to assist you with your needs and provide the best solutions tailored just for you.",
        client: true, team: false
      },

      {
        title: 'after call',
        text: "hello 👋\n\nthank you for taking the time to speak with us today. we truly appreciate your interest in 360followups and are excited to help you achieve your goals.\nif you have any further questions or need assistance, feel free to reach out. we’re here for you!",
        client: true,
        team: false,
      },

      {
        title: 'before call',
        text: '',
        client: false,
        team: false
      }
    ].map(temp => new templateModel({
      uid: user._id,
      title: temp.title,
      text: temp.text,
      client: temp.client,
      team: temp.team,
      cid: user.cid,
    }));

    // Save all pipelines in parallel
    await Promise.all(templates.map(temp => temp.save()));

    const token = await generateToken(user);

    res.cookie("360Followers", token, {
      httpOnly: true,
      maxAge: 2 * 30 * 24 * 60 * 60 * 1000,
    });
    res.redirect("/dashboard");
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
    const newUser = new logIncollection({
      name,
      email,
      password,
      cid,
      role: "admin",
    });
    await newUser.save();

    const pipelines = [
      { title: 'win', color: '#28A745' },
      { title: 'loss', color: '#DC3545' },
      { title: 'held', color: '#007BFF' },
      { title: 'pending', color: '#FFC107' },
    ].map(pipelineData => new pipelineModel({
      uid: user._id,
      color: pipelineData.color,
      title: pipelineData.title,
      cid: user.cid,
    }));

    // Save all pipelines in parallel
    await Promise.all(pipelines.map(pipeline => pipeline.save()));

    const templates = [
      {
        title: 'welcome',
        text: "hello dear ! 👋\r\n\r\nWelcome to 360followups! thank you for reaching out to us and showing interest in our services. we're excited to connect with you! our team will be in touch with you shortly to assist you with your needs and provide the best solutions tailored just for you.",
        client: true, team: false
      },

      {
        title: 'after call',
        text: "hello 👋\n\nthank you for taking the time to speak with us today. we truly appreciate your interest in 360followups and are excited to help you achieve your goals.\nif you have any further questions or need assistance, feel free to reach out. we’re here for you!",
        client: true,
        team: false,
      },

      {
        title: 'before call',
        text: '',
        client: false,
        team: false
      }
    ].map(temp => new templateModel({
      uid: user._id,
      title: temp.title,
      text: temp.text,
      client: temp.client,
      team: temp.team,
      cid: user.cid,
    }));

    // Save all pipelines in parallel
    await Promise.all(templates.map(temp => temp.save()));

    const token = await generateToken(newUser);

    res.cookie("360Followers", token, {
      httpOnly: true,
      maxAge: 2 * 30 * 24 * 60 * 60 * 1000,
    });
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
    res.cookie("360Followers", token, {
      httpOnly: true,
      maxAge: 2 * 30 * 24 * 60 * 60 * 1000,
    });
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
          code,
        },
      }
    );

    console.log("now we have an token");

    const accessToken = tokenResponse.data.access_token;
    console.log(accessToken);
    let admin = await logIncollection.findById(req.user.id);
    // console.log(admin);

    admin.facebookToken = accessToken;
    await admin.save();

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

    if (!admin) {
      return res.redirect("/login");
    }

    console.log(allLeads.length);

    allLeads.forEach(async (lead) => {
      const perLead = await leadsModel.findOne({ lead_id: lead.id });

      if (!perLead) {
        let leads_datas = [];

        lead.field_data.forEach((data) => {
          leads_datas.push({ que: data.name, ans: data.values[0] });
        });

        const newLead = new leadsModel({
          lead_id: lead.id,
          income_time: lead.created_time,
          cid: admin.cid,
          leads_data: leads_datas,
          app: "facebook",
        });
        await newLead.save();
        // console.log(leads_datas);
      }
    });

    if (chalteRahoId) 
      clearInterval(chalteRahoId)
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

    if (req.user.role === "admin") {
      user = await logIncollection.findById(req.user.id).populate({
        path: "myleads",
        populate: {
          path: "status", // Ensure that leads' status is populated
        },
        populate: {
          path: "remarks", // Populate status from leads
        },
      });
    } else {
      user = await memberModel.findById(req.user.id).populate({
        path: "myleads",
        populate: {
          path: "status", // Populate status from leads
        },
        populate: {
          path: "remarks", // Populate status from leads
        },
      });
    }

    let leads = await leadsModel.find({ cid: user.cid }).populate("status");
    let pipes = await pipelineModel.find({ cid: user.cid });
    // let remarks = await remarkModel.find({ uid: user._id }).sort({ createdAt: -1 });


    res.render("leads", { user, leads, pipes });
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).send("Error fetching leads");
  }
});

app.get("/lead/book/:id", isAdminLoggedIn, async (req, res) => {
  let { id } = req.params;

  let lead = await leadsModel.findById(id);
  if (!lead) {
    return res.redirect("/leads");
  }

  if (req.user.role === "admin") {
    let admin = await logIncollection.findById(req.user.id);
    admin.myleads.push(lead._id);
    lead.uid = admin._id;
    await admin.save();
    await lead.save();
  } else {
    let member = await memberModel.findById(req.user.id);
    member.myleads.push(lead._id);
    lead.uid = member._id;
    await member.save();
    await lead.save();
    
    console.log("bokking the leads by ", member);
  }
  console.log("ready for message sending");
  
//   const interval = setInterval(() => {
//     if (whatsappClientReady) {
//       sendMessageOnWA('9755313770', 'Hello!');
//         clearInterval(interval); // Stop checking once the message is sent
//     } else {
//         console.log('Waiting for WhatsApp client to be ready...');
//     }
// }, 5000);

  res.redirect("/leads");
});

app.get("/lead/remove/:id", isAdminLoggedIn, async (req, res) => {
  let { id } = req.params;

  let lead = await leadsModel.findById(id);
  if (!lead) {
    return res.redirect("/leads");
  }
  if (req.user.role === "admin") {
    let admin = await logIncollection.findById(req.user.id);
    admin.myleads.splice(admin.myleads.indexOf(lead._id), 1);
    lead.uid = "";
    await admin.save();
    await lead.save();
  } else {
    let member = await memberModel.findById(req.user.id);
    member.myleads.splice(member.myleads.indexOf(lead._id), 1);
    lead.uid = "";
    await member.save();
    await lead.save();

    console.log("bokking the leads by ", member);
  }
  res.redirect("/leads");
});

app.post("/lead/status/update/:id", isAdminLoggedIn, async (req, res) => {
  let { id } = req.params;

  let lead = await leadsModel.findById(id);
  let pipe = await pipelineModel.findById(req.body.pipeId);

  if (!lead) {
    return res.redirect("/leads");
  }
  lead.status = pipe._id;
  await lead.save();

  res.redirect("/leads");
});

app.post('/remark/add/:id',isAdminLoggedIn, async (req,res)=>{
  const {id} = req.params;
  const {text, time, date} = req.body;
  let user ;
  console.log("hheeyeyy", req.body,id);
  
  if (req.user.role === 'admin') {
    user = await logIncollection.findById(req.user.id)
  }else 
    user = await memberModel.findById(req.user.id)

  console.log(req.body);
  let lead = await leadsModel.findById(id)
  console.log(lead);

  let remark = new remarkModel({
    uid: user._id,
    cid: user.cid,
    lead_id: lead._id,
    text,
    time,
    date,
  })
  await remark.save()

  lead.remarks.push(remark._id)
  await lead.save()
  console.log(lead);
  
  return res.json(remark);
  
})


app.post('/save-fcm-token', isAdminLoggedIn,async (req, res) => {
  const fcmToken = req.body.token;
  console.log('Received FCM Token:', fcmToken);

  let user; 
  if(req.user.role === 'admin')
    user = await logIncollection.findById(req.user.id)
  else
    user = await memberModel.findById(req.user.id)

  user.fcmToken = fcmToken;
  await user.save();

  res.status(200).send('FCM token saved successfully.');
});

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

app.listen(port, () => {
  console.log(`Server is running at PORT:${port}`);
  
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

  allLeads.forEach(async (lead) => {
    const perLead = await leadsModel.findOne({ lead_id: lead.id });

    if (!perLead) {
      console.log("new lead found", lead);

      let leads_datas = [];

      lead.field_data.forEach((data) => {
        leads_datas.push({ que: data.name, ans: data.values[0] });
      });

      const newLead = new leadsModel({
        lead_id: lead.id,
        income_time: lead.created_time,
        cid: user.cid,
        leads_data: leads_datas,
        app: "facebook",
      });
      await newLead.save();
      allNewLeads.push(newLead);

      // console.log(leads_datas);
    }
  });

  return allLeads;
}

let chalteRahoId;
function chalteRaho(token) {
  let i = 0;
  chalteRahoId = setInterval(() => {
    findNewLead(token);
    console.log("step", i++);
  }, 60000);
}

async function sendPushNotification(fcmToken, title, body) {
  const msg = {
    notification: {
      title: title,
      body: body,
    },
    token: fcmToken, // User's FCM token
  };

  try {
    // Send notification via FCM
    const res = await admin.messaging().send(msg);
    console.log('Successfully sent message:', res);
  } catch (err) {
    console.error('Error sending message:', err);
  }
}
