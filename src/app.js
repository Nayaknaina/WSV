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
const { generateToken } = require("../utils/auth.js");
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

const remarkModel = require("./models/remark.model.js");
const leadsModel = require("./models/leads.model.js");
const templateModel = require("./models/temlate.model.js");
const WaModel = require("./models/wA.model.js");

//payment gateway routes
const paymentRoute = require("./routes/payment.route.js");

const memberRoute = require("./routes/members.route.js");
const userRoute = require("./routes/users.route.js");
const Route = require("./routes/index.route.js");
const { log } = require("console");

//Whatsapp-----------------------------------------

const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qr = require("qr-image");

// Initialize variables
let qrCodeData = "";
let whatsappClientReady = false;
let isConnected = false;
let connectedPhoneNumber = "";

// Initialize the WhatsApp Client with Local Authentication
let client = new Client({
  puppeteer: {
    headless: true,
    ignoreHTTPSErrors: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
  authStrategy: new LocalAuth(),
});

const sessionStore =
  process.env.NODE_ENV === "production"
    ? MongoStore.create({
        mongoUrl:
          "mongodb+srv://nainanayak288:01QKzxY3dSOcP1nN@wsvconnect.bpxfx.mongodb.net/",
        collectionName: "sessions", // Collection name for sessions
      })
    : new session.MemoryStore();

const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: "your_secret_key", // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);

app.set("view engine", "hbs");
app.set("views", templatepath);

hbs.registerPartials(path.join(__dirname, "../template/partials"));

hbs.registerHelper("formatDate", function (datetime) {
  if (!datetime) {
    return ""; // Return an empty string if datetime is invalid
  }
  const date = new Date(datetime);
  return date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
});

hbs.registerHelper("formatTime", function (datetime) {
  if (!datetime) {
    return ""; // Return an empty string if datetime is invalid
  }
  const date = new Date(datetime);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`; // Format as HH:MM
});

hbs.registerHelper("countLeadsByStatus", function (leads, pipelineTitle) {
  // Check if leads is defined and is an array
  if (!Array.isArray(leads)) {
    return 0; // Return 0 if leads is not an array
  }

  const filteredLeads = leads.filter((lead) => {
    return lead.status && lead.status.title === pipelineTitle;
  });

  return filteredLeads.length;
});

hbs.registerHelper("filterLeadsForMember", function (leads) {
  // Check if leads is defined and is an array
  if (!Array.isArray(leads)) {
    return 0; // Return 0 if leads is not an array
  }
  const filteredLeads = leads.filter(
    (lead) => lead.uid === "" || lead.uid === null
  );
  // console.log(filteredLeads.length);

  return filteredLeads;
});

hbs.registerHelper("ifEquals", function (arg1, arg2, options) {
  return arg1 === arg2 ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper("json", function (context) {
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

app.use(passport.initialize());
app.use(passport.session());
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

app.use("/", Route);
app.use("/member", memberRoute);
app.use("/user", userRoute);
app.use("/payment", paymentRoute);

// Handle root request

app.get("/connection-status", isAdminLoggedIn, async (req, res) => {
  const user = req.user;
  let userWA = await WaModel.findOne({ cid: user.cid });
  console.log(isConnected, user.name, "check connection//");

  if (userWA) {
    if (!userWA.isConnected && isConnected) {
      isConnected = false;
      userWA.isConnected = true;
      userWA.whatsappClientReady = true;
      userWA.connectedPhoneNumber = connectedPhoneNumber;
      await userWA.save();
      req.session.successMSG = `Connected WhatsApp Number: ${connectedPhoneNumber}`;
      return res.json({ isConnected: userWA.isConnected });
    }
    console.log(userWA.isConnected);
    return res.json({ isConnected: userWA.isConnected });
  } else if (isConnected) {
    isConnected = false;
    userWA = new WaModel({
      cid: user.cid,
      isConnected: true,
      whatsappClientReady: true,
      connectedPhoneNumber: connectedPhoneNumber,
    });
    await userWA.save();
    console.log("now we are blocking to refreshing qr page");
    return res.json({ isConnected: userWA.isConnected });
  }

  // isConnected= false;
  isConnected = false;
  return res.json({ isConnected });
});

app.get("/qr", isAdminLoggedIn, async (req, res) => {
  // console.log("qrCodeData genrated in /qr", req.user.name);
  const user = req.user;

  if (qrCodeData) {
    console.log("Qr genrated");
  }
  res.render("qr", {
    user,
    qrCodeData,
    isConnected,
  });
});

//logout whatsapp
app.get("/logoutWA", isAdminLoggedIn, async (req, res) => {
  try {
    // Check if the client is ready before attempting logout
    if (whatsappClientReady && client.pupPage && !client.pupPage.isClosed()) {
      try {
        await client.logout();
        isConnected = false;
        let userWA = await WaModel.findOne({ cid: req.user.cid });
        if (userWA) {
          
          userWA.isConnected = false;
          userWA.whatsappClientReady = false;
          req.session.errorMSG = `Dis-Connected WhatsApp Number: ${connectedPhoneNumber}`;
          userWA.connectedPhoneNumber = "";
          await userWA.save();
        }
        console.log("WhatsApp client logged out successfully.");
      } catch (logoutError) {
        console.error("Error during logout process:", logoutError);
      }
    } else {
      console.warn(
        "WhatsApp client is not ready or session already closed, skipping logout."
      );
    }

    // Mark client as disconnected
    whatsappClientReady = false;
    isConnected = false;

    // Retry cleanup logic for session files
    await cleanupSessionFiles();

    // Redirect to dashboard or another appropriate page
    console.log("whatsapp logout here !");

    res.redirect("/user/dashboard");
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).send("An error occurred during logout.");
  } finally {
    // Attempt to reinitialize the client in all cases
    initializeWhatsAppClient();
  }
});

app.get("/template", isAdminLoggedIn, async (req, res) => {
  let user;

  if (req.user.role === "admin") {
    user = await logIncollection.findById(req.user.id);
  } else {
    user = await memberModel.findById(req.user.id);
  }

  let templates = await templateModel.find({ cid: user.cid, num: { $ne: 4 } });
  let specialTemp = await templateModel.find({ cid: user.cid, num: 4  });
  // console.log(templates);

  res.render("template", { user, templates,specialTemp });
});

app.post(
  "/template/update/:id",
  isAdminLoggedIn,
  upload.fields([{ name: "image" }, { name: "pdf" }]),
  async (req, res) => {
    try {
      let { id } = req.params;
      let template = await templateModel.findById(id);

      let { title, text, client, team } = req.body;

      template.title = title;
      template.text = text;

      template.client = client === "on" ? true : false;
      template.team = team === "on" ? true : false;
      let imageFile = req.files["image"] ? req.files["image"][0].filename : "";
      let pdfFile = req.files["pdf"] ? req.files["pdf"][0].filename : "";

      if (imageFile !== "" && template.image !== "") {
        const imagePath = path.join(
          __dirname,
          "..",
          "template",
          "images",
          "uploads",
          "whatsapp",
          template.image
        );

        fs.unlink(imagePath, (err) => {
          if (err) {
            console.log("Error removing file", err);
            return;
          }
          console.log("file removed successfully");
        });
        template.image = imageFile;
      } else if (imageFile !== "") {
        template.image = imageFile;
      }

      if (pdfFile !== "" && template.pdf !== "") {
        const pdfPath = path.join(
          __dirname,
          "..",
          "template",
          "images",
          "uploads",
          "whatsapp",
          template.pdf
        );

        fs.unlink(pdfPath, (err) => {
          if (err) {
            console.log("Error removing file", err);
            return;
          }
          console.log("file removed successfully");
        });
        template.pdf = pdfFile;
      } else if (pdfFile !== "") {
        template.pdf = pdfFile;
      }

      await template.save();
      // console.log(req.body);
      res.redirect("/template");
    } catch (err) {
      console.log("Error in /template/update/id", err);
    }
  }
);

app.get("/get/data", isAdminLoggedIn, async (req, res) => {
  const admin = await logIncollection.findById(req.user.id);
  let allLeads = readJsonFile();

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
      console.log("data created");
    }
  });

  res.redirect("/leads");
});

app.get("/team/invite", isAdminLoggedIn, async (req, res) => {
  try {
    const user = await logIncollection.findById(req.user.id);
    if (user.teams.length >= 3 && user.subscriptionLevel === "free") {
      req.session.errorMSG = `free`;
      return res.redirect("/user/team");
    }
    if (user.teams.length >= 7 && user.subscriptionLevel === "basic") {
      req.session.errorMSG = `basic`;
      return res.redirect("/user/team");
    }

    const { name, email, mobile, countryCode } = req.query;
    let preMem = await memberModel.findOne({ email: email });
    if (preMem !== null) {
      req.session.errorMSG = `This email ID is already registered.`;
      return res.redirect("/user/team");
      return res.redirect("/user/team");
    }
    preMem = await logIncollection.findOne({ email: email });
    if (preMem !== null) {
      req.session.errorMSG = `This email ID is already registered.`;
      return res.redirect("/user/team");
      return res.redirect("/user/team");
    }

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

    const leadContactNo = mobile;
    const text = `Hello ${name}!\n\nCongratulations! Your account has been created successfully. You can log in now and start using our service.
    \n\n Your email: ${email}
    \n Your password : ${password}
    \n\n[Click here to login](https://360followups.com/member/login)`;

    let connStatus = await WaModel.findOne({ cid: user.cid });
    setTimeout(() => {
      // if (reminderTemplate.image !== "") {
      //   // img for user
      //   reminderTempImagePath = path.join(
      //     __dirname,
      //     "../template/images/uploads/whatsapp/",
      //     reminderTemplate.image
      //   );
      // }
      // if (reminderTemplate.pdf !== "") {
      //   // pdf for user
      //   reminderTempPdfPath = path.join(
      //     __dirname,
      //     "../template/images/uploads/whatsapp/",
      //     reminderTemplate.pdf
      //   );
      // }
      // if (afterCallTemp.image !== "") {
      //   // img for lead
      //   LeadTempImagePath = path.join(
      //     __dirname,
      //     "../template/images/uploads/whatsapp/",
      //     afterCallTemp.image
      //   );
      // }
      // if (afterCallTemp.pdf !== "") {
      //   // pdf for lead
      //   LeadTempPdfPath = path.join(
      //     __dirname,
      //     "../template/images/uploads/whatsapp/",
      //     afterCallTemp.pdf
      //   );
      // }
      console.log("/team/invite route");
      console.log(connStatus, leadContactNo, text);

      sendMessageToLead(connStatus, leadContactNo, text); // after temp msg sending to lead
    }, 4000);

    const newMember = new memberModel({
      name,
      email,
      password,
      countryCode,
      mobile,
      cid: user.cid,
      owner_id: user._id,
    });
    await newMember.save();
    user.teams.push(newMember._id);
    await user.save();

    req.session.successMSG = `you have invited ${name} as a team member !. `;
  } catch (error) {
    console.log(error);
  }
  return res.redirect("/user/team");
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
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).send("Internal error");
  }
});
//UPDATE-USER
app.post("/update-user", async (req, res) => {
  try {
    console.log(req.body);

    const { id, organizationName, sector } = req.body;

    await logIncollection.findByIdAndUpdate(id, {
      organizationName,
      sector,
    });

    res.send({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error updating user" });
  }
});

// Google Authentication Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  (req, res) => {}
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/signup" }),
  async (req, res) => {
    console.log(req.user);

    let user = await logIncollection.findOne({ email: req.user.email });
    if (!user.cid) {
      const cid = uuidv4();
      user.cid = cid;
      user.role = "admin";
      await user.save();
    }
    if (!(user.myPipelines.length >= 4)) {
      const pipelines = [
        { title: "win", color: "#28A745", defaultVal: false },
        { title: "lost", color: "#DC3545", defaultVal: false },
        { title: "on hold", color: "#007BFF", defaultVal: true },
        { title: "pending", color: "#FFC107", defaultVal: false },
      ].map(
        (pipelineData) =>
          new pipelineModel({
            uid: user._id,
            defaultVal: pipelineData.defaultVal,
            color: pipelineData.color,
            title: pipelineData.title,
            cid: user.cid,
          })
      );

      // Save all pipelines in parallel
      await Promise.all(
        pipelines.map(async (pipeline) => {
          await pipeline.save();
          user.myPipelines.push(pipeline._id);
        })
      );

      const templates = [
        {
          title: "Reminder Message To Customer",
          text: `Dear [Customer Name],
  
  This is a friendly reminder from [360FollowUps]. We have a scheduled follow-up call with you on [Date] at [Time]. Our representative will be reaching out to discuss your requirements.
  
  If you have any questions or need to reschedule, please feel free to let us know.
  
  Looking forward to speaking with you!
  
  Best Regards,
  The [360FollowUps] Team`,
          client: true,
          team: false,
          num: 1,
        },

        {
          title: "Reminder Message To Team Member",
          text: `Hello [Team Member Name],
  
  Just a reminder that you have a follow-up call scheduled with [Customer Name] on [Date] at [Time]. Please make sure you are prepared with all the necessary details.
  
  Good luck with the call, and let us know if you need any assistance!
  
  Best Regards,
  The [360FollowUps] System`,
          client: false,
          team: true,
          num: 2,
        },

        {
          title: "Thankyou Message To Customer",
          text: `Dear [Customer Name],
  
  Thank you for taking the time to speak with us today. We appreciate the opportunity to understand your needs better and to discuss how we can assist you further.
  
  If you have any questions or need more information, please don’t hesitate to reach out. We look forward to continuing our conversation and helping you achieve your goals.
  
  Best Regards,
  The [360FollowUps] Team`,
          client: true,
          team: false,
          num: 5,
        },

        {
          title: "Notification Message To Team Members",
          text: `Hello [Team Member Name],
  
  A new lead has been added to the CRM. Here are the details:
  - *Lead Name:* [Customer Name]
  - *Contact Number:* [Customer Contact Number]
  - *Date Received:* [Date]
  - *Lead Source:* [Lead Source]
  
  Please follow up with the lead at your earliest convenience to ensure a prompt response.
  
  Best,
  The [360FollowUps] System`,
          client: false,
          team: true,
          num: 3,
        },

        {
          title: "Wellcome Message To Customer",
          text: `Dear [Customer Name],
  
  Welcome to [360FollowUps]! We’re thrilled to have you on board. Our team will be reaching out to you shortly to understand your needs and help you find the best solutions.
  
  If you have any immediate questions, feel free to get in touch with us. We're here to support you every step of the way!
  
  Best Regards,
  The [360FollowUps] Team`,
          client: true,
          team: false,
          num: 4,
        },
      ].map(
        (temp) =>
          new templateModel({
            uid: user._id,
            title: temp.title,
            text: temp.text,
            num: temp.num,
            client: temp.client,
            team: temp.team,
            cid: user.cid,
          })
      );

      // Save all pipelines in parallel
      await Promise.all(
        templates.map(async (temp) => {
          await temp.save();
          user.myTemplates.push(temp._id);
        })
      );
      await user.save();
    }
    const token = await generateToken(user);

    res.cookie("360Followers", token, {
      httpOnly: true,
      maxAge: 2 * 30 * 24 * 60 * 60 * 1000,
    });
    res.redirect("/user/dashboard");
  }
);

app.get("/make/temp", isAdminLoggedIn, async (req, res) => {
  let user = await logIncollection.findById(req.user.id);
  const templates = [
    {
      title: "Reminder Message To Customer",
      text: `Dear [Customer Name],

This is a friendly reminder from [Company].
We have a scheduled follow-up 
call with you on [Date] at [Time].
Our representative will be 
reaching out to discuss your requirements.

If you have any questions or need to reschedule,
please feel free to let us know.

Looking forward to speaking with you!

Best Regards,
The [Company] Team`,
      client: true,
      team: false,
      num: 1,
    },

    {
      title: "Reminder Message To Team Member",
      text: `Hello [Team Member Name],

Just a reminder that you have a follow-up 
call scheduled with [Customer Name] 
on [Date] at [Time].
Please make sure you are prepared 
with all the necessary details.

Good luck with the call, and let us 
know if you need any assistance!

Best Regards,
The [Company] System`,
      client: false,
      team: true,
      num: 2,
    },

    {
      title: "Thankyou Message To Customer",
      text: `Dear [Customer Name],

Thank you for taking the time 
to speak with us today.
We appreciate the opportunity 
to understand your needs 
better and to discuss how we 
can assist you further.

If you have any questions or 
need more information, 
please don’t hesitate to reach out. 
We look forward to continuing our 
conversation and helping you achieve
your goals.

Best Regards,
The [Company] Team`,
      client: true,
      team: false,
      num: 5,
    },

    {
      title: "Notification Message To Team Members",
      text: `Hello [Team Member Name],

A new lead has been added to the CRM.
Here are the details:-

Lead Name: [Customer Name]
Contact Number: [Customer Contact Number]
Date Received: [Date]
Lead Source: [Lead Source]

Please follow up with the lead at your earliest 
convenience to ensure a prompt response.

Best,
The [Company] System`,
      client: false,
      team: true,
      num: 3,
    },

    {
      title: "Wellcome Message To Customer",
      text: `Dear [Customer Name],

Welcome to [Company]! 
We’re thrilled to have you on board. 
Our team will be reaching out to you shortly 
to understand your needs and help you find the 
best solutions.

If you have any immediate questions, 
feel free to get in touch with us. 

We're here to support you every step of the way!

Best Regards,
The [Company] Team`,
      client: true,
      team: false,
      num: 4,
    },
  ].map(
    (temp) =>
      new templateModel({
        uid: user._id,
        title: temp.title,
        text: temp.text,
        num: temp.num,
        client: temp.client,
        team: temp.team,
        cid: user.cid,
      })
  );

  // Save all pipelines in parallel
  await Promise.all(
    templates.map(async (temp) => {
      await temp.save();
      user.myTemplates.push(temp._id);
    })
  );
  await user.save();

  res.redirect("/user/dashboard");
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
  console.log("Entering Facebook callback route");

  if (!code) {
    console.log("No authorization code provided.");
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

    console.log("Access token received");

    const accessToken = tokenResponse.data.access_token;
    console.log("Access token:", accessToken);

    let admin = await logIncollection.findById(req.user.id);
    if (!admin) {
      console.log("Admin not found, redirecting to login.");
      return res.redirect("/login");
    }

    console.log("Admin found:", admin);

    admin.facebookToken = accessToken;
    await admin.save();
    console.log("Access token saved to admin account");

    // Fetch pages
    const pagesResponse = await axios.get(
      `https://graph.facebook.com/v20.0/me/accounts`,
      {
        params: {
          access_token: accessToken,
        },
      }
    );
    console.log("Pages fetched");

    const pages = pagesResponse.data.data;
    let allLeads = [];

    for (const page of pages) {
      console.log(`Fetching leadgen forms for page: ${page.id}`);
      const leadFormsResponse = await axios.get(
        `https://graph.facebook.com/v20.0/${page.id}/leadgen_forms`,
        {
          params: { access_token: page.access_token },
        }
      );

      const leadForms = leadFormsResponse.data.data;

      for (const form of leadForms) {
        console.log(`Fetching leads for form: ${form.id}`);
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

    console.log("Leads fetched:", allLeads);

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
      }
    });

    if (chalteRahoId) clearInterval(chalteRahoId);
    chalteRaho(accessToken, req);
    req.session.successMSG = "Connected to Facebook account.";
    res.redirect("/leads");
  } catch (error) {
    console.error("Error during Facebook callback:", error.response ? error.response.data : error.message);
    res.status(500).send("Error logging in with Facebook.");
  }
});


app.post("/manual/lead", isAdminLoggedIn, async (req, res) => {
  try {
    let user;
    if (req.user.role === "admin") {
      user = await logIncollection.findById(req.user.id);
    } else {
      user = await memberModel.findById(req.user.id);
    }
    let connStatus = await WaModel.findOne({ cid: user.cid });
    const Admin = await logIncollection.findOne({ cid: user.cid });
    const leads_data = Object.entries(req.body)
      .filter(([key]) => key !== "remark" && key !== "remarktime") // Exclude 'remark' and 'remarktime'
      .map(([key, value]) => ({
        que: key,
        ans: value,
      }));
    // console.log(req.body);
    // console.log(leads_data);
    let userType = "logIncollection";
    if (user.role === "admin") {
      userType = "logIncollection";
    } else {
      userType = "teamMember";
    }
    let newManualLead = new leadsModel({
      app: "manual",
      cid: user.cid,
      uid: user._id,
      income_time: new Date(),
      leads_data,
      userType,
    });

    let userContact = user.mobile;
    console.log(req.body, "====", userContact);

    const remarkDateTimeformat = new Date(req.body.remarkTime);
    const remarkDate = remarkDateTimeformat.toISOString().split("T")[0];
    const remarkTime = remarkDateTimeformat.toTimeString().split(" ")[0];

    let remark = new remarkModel({
      text: req.body.remark,
      time: remarkTime,
      date: remarkDate,
      cid: req.user.cid,
      uid: req.user.id,
      lead_id: newManualLead._id,
    });

    await remark.save();
    user.myleads.push(newManualLead._id);
    newManualLead.remarks.push(remark._id);

    let defPipe = await pipelineModel.findOne({ defaultVal: true });
    if (defPipe) {
      newManualLead.status = defPipe._id;
    }
    await newManualLead.save();
    await user.save();

    const mobileRegex = /^[6-9]\d{9}$/;
    let leadContactNo;
    newManualLead.leads_data.forEach((item) => {
      const answer = item.ans.trim();

      if (mobileRegex.test(answer)) {
        console.log("Valid Mobile Number found:", answer);
        leadContactNo = answer;
      }
    });

    const searchStrings = [
      "name",
      "your name",
      "customer name",
      "full name",
      "first name",
      "आपका नाम",
      "नाम",
      "पूरा नाम",
      "ग्राहक का नाम",
      "शुभ नाम",
    ];

    let customerName = "";

    newManualLead.leads_data.forEach((item) => {
      const isMatch = searchStrings.some((str) =>
        item.que.toLowerCase().includes(str.toLowerCase())
      );
      if (isMatch) {
        customerName = item.ans;
      }
    });

    if (customerName) {
      console.log("Matched customerName:", customerName);
    } else {
      customerName = "Sir/Madam";
      console.log("Un-Matched then customerName:", customerName);
    }

    console.log(leadContactNo);

    const wellcomeTemp = await templateModel.findOne({
      cid: user.cid,
      num: 4,
    });
    let wellcomeTempImagePath, wellcomeTempPdfPath;
    if (wellcomeTemp.image !== "") {
      // img for user
      wellcomeTempImagePath = path.join(
        __dirname,
        "../template/images/uploads/whatsapp/",
        wellcomeTemp.image
      );
    }
    if (wellcomeTemp.pdf !== "") {
      // pdf for user
      wellcomeTempPdfPath = path.join(
        __dirname,
        "../template/images/uploads/whatsapp/",
        wellcomeTemp.pdf
      );
    }

    setTimeout(() => {
      console.log("/manual/lead/");

      let msg = wellcomeTemp.text;
      let companyName =
        Admin.organizationName !== null || Admin.organizationName !== undefined
          ? Admin.organizationName
          : "360FollowUps";

      const personalizedMessage = msg
        .replace("[customer name]", customerName)
        .replace("[company]", companyName)
        .replace("[company]", companyName);

      console.log(
        "wellcome message log",
        connStatus,
        leadContactNo,
        wellcomeTemp.text,
        personalizedMessage,
        wellcomeTempImagePath,
        wellcomeTempPdfPath
      );

      sendMessageToLead(
        connStatus,
        leadContactNo,
        personalizedMessage,
        wellcomeTempImagePath,
        wellcomeTempPdfPath
      ); // reminder temp for user
    }, 4500);

    // leadContactNo = "9755313770";
    const remarkDateTime = new Date(`${remarkDate}T${remarkTime}`);
    const currentTime = new Date();

    let timeDifference = remarkDateTime - currentTime;
    timeDifference -= 1000 * 60 * 30;
    console.log(remarkDate, remarkTime);
    console.log(timeDifference);

    //todo  reminder message for team member
    const reminderTemplateForMember = await templateModel.findOne({
      cid: user.cid,
      num: 2,
    });

    console.log(
      "reminderTemplate document----",
      reminderTemplateForMember,
      "------reminderTemplate document"
    );

    if (timeDifference > 0) {
      // let reminderTempImagePath,reminderTempPdfPath;
      setTimeout(() => {
        // if (reminderTemplateForMember.image !== "") {
        //   // img for user
        //   reminderTempImagePath = path.join(
        //     __dirname,
        //     "../template/images/uploads/whatsapp/",
        //     reminderTemplateForMember.image
        //   );
        // }
        // if (reminderTemplateForMember.pdf !== "") {
        //   // pdf for user
        //   reminderTempPdfPath = path.join(
        //     __dirname,
        //     "../template/images/uploads/whatsapp/",
        //     reminderTemplateForMember.pdf
        //   );
        // }
        // if (thnakyouLeadTemplate.image !== "") {
        //   // img for lead
        //  .join(
        //     __dirname,
        //     "../template/images/uploads/whatsapp/",
        //     thnakyouLeadTemplate.image
        //   );
        // }
        // if (thnakyouLeadTemplate.pdf !== "") {
        //   // pdf for lead
        //   LeadTempPdfPath = path.join(
        //     __dirname,
        //     "../template/images/uploads/whatsapp/",
        //     thnakyouLeadTemplate.pdf
        //   );
        // }

        // console.log(reminderTempImagePath);
        // console.log(reminderTempPdfPath);
        // console.log(LeadTempImagePath);
        // console.log(LeadTempPdfPath);

        console.log("/remark/add/:id");
        console.log(leadContactNo);

        let msg = reminderTemplateForMember.text;

        let companyName =
          Admin.organizationName !== null ||
          Admin.organizationName !== undefined
            ? Admin.organizationName
            : "360FollowUps";

        const personalizedMessage = msg
          .replace("[team member name]", user.name)
          .replace(
            "[customer name]",
            customerName + " Mobile no. " + leadContactNo
          )
          .replace("[date]", remarkDate)
          .replace("[time]", remarkTime)
          .replace("[company]", companyName);

        sendMessageToLead(
          connStatus,
          userContact,
          personalizedMessage
          // reminderTempImagePath,
          // reminderTempPdfPath
        ); // after temp msg sending to lead
      }, timeDifference);
    }

    //todo  reminder message for customer
    const reminderTemplateForCustomer = await templateModel.findOne({
      cid: user.cid,
      num: 1,
    });

    console.log(
      "reminder for customer template document----",
      reminderTemplateForCustomer,
      "------reminder for customer template document"
    );

    if (timeDifference > 0) {
      // let reminderForCustomerTempImagePath,reminderForCusromerTempPdfPath;
      setTimeout(() => {
        //   if (reminderTemplateForCustomer.image !== "") {
        //     // img for user
        //     reminderForCustomerTempImagePath = path.join(
        //       __dirname,
        //       "../template/images/uploads/whatsapp/",
        //       reminderTemplateForCustomer.image
        //     );
        //   }
        //   if (reminderTemplateForCustomer.pdf !== "") {
        //     // pdf for user
        //     reminderForCusromerTempPdfPath = path.join(
        //       __dirname,
        //       "../template/images/uploads/whatsapp/",
        //       reminderTemplateForCustomer.pdf
        //     );
        //   }
        // if (thnakyouLeadTemplate.image !== "") {
        //   // img for lead
        //   LeadTempImagePath = path.join(
        //     __dirname,
        //     "../template/images/uploads/whatsapp/",
        //     thnakyouLeadTemplate.image
        //   );
        // }
        // if (thnakyouLeadTemplate.pdf !== "") {
        //   // pdf for lead
        //   LeadTempPdfPath = path.join(
        //     __dirname,
        //     "../template/images/uploads/whatsapp/",
        //     thnakyouLeadTemplate.pdf
        //   );
        // }

        // console.log(reminderForCustomerTempImagePath);
        // console.log(reminderForCusromerTempPdfPath);
        // console.log(LeadTempImagePath);
        // console.log(LeadTempPdfPath);

        console.log("/remark/add/:id");
        console.log(leadContactNo);

        let msg = reminderTemplateForCustomer.text;
        let companyName =
          Admin.organizationName !== null ||
          Admin.organizationName !== undefined
            ? Admin.organizationName
            : "360FollowUps";

        const personalizedMessage = msg
          .replace("[customer name]", customerName)
          .replace("[company]", companyName)
          .replace("[date]", remarkDate)
          .replace("[time]", remarkTime);

        sendMessageToLead(
          connStatus,
          leadContactNo,
          personalizedMessage
          // reminderForCustomerTempImagePath,
          // reminderForCusromerTempPdfPath
        ); // after temp msg sending to lead
      }, timeDifference);
    }

    // todo thankyou message to lead or customer
    const thnakyouLeadTemplate = await templateModel.findOne({
      cid: user.cid,
      num: 5,
    });

    console.log(
      "after call template document----",
      thnakyouLeadTemplate,
      "------after call template document"
    );

    setTimeout(() => {
      console.log("/remark/add/:id");

      let msg = thnakyouLeadTemplate.text;
      let companyName =
        Admin.organizationName !== null || Admin.organizationName !== undefined
          ? Admin.organizationName
          : "360FollowUps";
      const personalizedMessage = msg
        .replace("[customer name]", customerName)
        .replace("[company]", companyName);

      console.log(
        "thankyu message log",
        connStatus,
        leadContactNo,
        thnakyouLeadTemplate.text,
        personalizedMessage
        // LeadTempImagePath,
        // LeadTempPdfPath
      );

      sendMessageToLead(
        connStatus,
        leadContactNo,
        personalizedMessage
        // LeadTempImagePath,
        // LeadTempPdfPath
      ); // reminder temp for user
    }, 5000);

    res.redirect("/leads");
  } catch (err) {
    console.log("Error in /user/manual/lead :- ", err);
  }
});

//logout facebook
app.get("/logoutfacebook", isAdminLoggedIn, async (req, res) => {
  try {
   
    await logIncollection.findByIdAndUpdate(req.user.id, { facebookToken: null });
    req.session.successMSG = "Facebook account disconnected.";
    res.redirect("/user/dashboard");
  } catch (err) {
    console.error("Error clearing Facebook token:", err);
    res.status(500).send("Error clearing Facebook token.");
  }
});

app.post("/remark/add/:id", isAdminLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { text, time, date } = req.body;
  let user;

  if (req.user.role === "admin") {
    user = await logIncollection.findById(req.user.id);
  } else user = await memberModel.findById(user._id);

  let connStatus = await WaModel.findOne({ cid: user.cid });
  let Admin = await logIncollection.findOne({ cid: user.cid });

  let userContact = user.mobile;
  console.log(req.body, "====", userContact);
  let lead = await leadsModel.findById(id);

  let remark = new remarkModel({
    uid: user._id,
    cid: user.cid,
    lead_id: lead._id,
    text,
    time,
    date,
  });
  await remark.save();

  lead.remarks.push(remark._id);
  await lead.save();
  // console.log(lead);

  const mobileRegex = /^[6-9]\d{9}$/;
  let leadContactNo;
  lead.leads_data.forEach((item) => {
    const answer = item.ans.trim();

    if (mobileRegex.test(answer)) {
      console.log("Valid Mobile Number found:", answer);
      return (leadContactNo = answer);
    }
  });

  const searchStrings = [
    "name",
    "your name",
    "customer name",
    "full name",
    "first name",
    "आपका नाम",
    "नाम",
    "पूरा नाम",
    "ग्राहक का नाम",
    "शुभ नाम",
  ];

  let customerName = "";

  lead.leads_data.forEach((item) => {
    const isMatch = searchStrings.some((str) =>
      item.que.toLowerCase().includes(str.toLowerCase())
    );
    if (isMatch) {
      customerName = item.ans;
    }
  });

  if (customerName) {
    console.log("Matched customerName:", customerName);
  } else {
    customerName = "Sir/Madam";
    console.log("Un-Matched then customerName:", customerName);
  }

  console.log(leadContactNo);
  // leadContactNo = "9755313770";
  const remarkDateTime = new Date(`${date}T${time}:00`);
  const currentTime = new Date();

  let timeDifference = remarkDateTime - currentTime;
  timeDifference -= 1000 * 60 * 30;

  const reminderTemplateForMember = await templateModel.findOne({
    cid: req.user.cid,
    num: 2,
  });

  console.log(
    "reminderTemplate document----",
    reminderTemplateForMember,
    "------reminderTemplate document"
  );

  console.log(timeDifference);

  //todo  reminder message for team member
  if (timeDifference > 0) {
    // let reminderTempImagePath,reminderTempPdfPath;
    setTimeout(() => {
      // if (reminderTemplateForMember.image !== "") {
      //   // img for user
      //   reminderTempImagePath = path.join(
      //     __dirname,
      //     "../template/images/uploads/whatsapp/",
      //     reminderTemplateForMember.image
      //   );
      // }
      // if (reminderTemplateForMember.pdf !== "") {
      //   // pdf for user
      //   reminderTempPdfPath = path.join(
      //     __dirname,
      //     "../template/images/uploads/whatsapp/",
      //     reminderTemplateForMember.pdf
      //   );
      // }
      // if (thnakyouLeadTemplate.image !== "") {
      //   // img for lead
      //  .join(
      //     __dirname,
      //     "../template/images/uploads/whatsapp/",
      //     thnakyouLeadTemplate.image
      //   );
      // }
      // if (thnakyouLeadTemplate.pdf !== "") {
      //   // pdf for lead
      //   LeadTempPdfPath = path.join(
      //     __dirname,
      //     "../template/images/uploads/whatsapp/",
      //     thnakyouLeadTemplate.pdf
      //   );
      // }

      // console.log(reminderTempImagePath);
      // console.log(reminderTempPdfPath);
      // console.log(LeadTempImagePath);
      // console.log(LeadTempPdfPath);

      console.log("/remark/add/:id");
      console.log(leadContactNo);

      let msg = reminderTemplateForMember.text;
      let companyName =
        Admin.organizationName !== null || Admin.organizationName !== undefined
          ? Admin.organizationName
          : "360FollowUps";
      const personalizedMessage = msg
        .replace("[team member name]", user.name)
        .replace(
          "[customer name]",
          customerName + " Mobile no. " + leadContactNo
        )
        .replace("[date]", date)
        .replace("[time]", time)
        .replace("[company]", companyName);

      sendMessageToLead(
        connStatus,
        userContact,
        personalizedMessage
        // reminderTempImagePath,
        // reminderTempPdfPath
      ); // after temp msg sending to lead
    }, timeDifference);
  }

  //todo  reminder message for customer
  const reminderTemplateForCustomer = await templateModel.findOne({
    cid: req.user.cid,
    num: 1,
  });
  console.log(
    "reminder for customer template document----",
    reminderTemplateForCustomer,
    "------reminder for customer template document"
  );
  if (timeDifference > 0) {
    // let reminderForCustomerTempImagePath,reminderForCusromerTempPdfPath;
    setTimeout(() => {
      //   if (reminderTemplateForCustomer.image !== "") {
      //     // img for user
      //     reminderForCustomerTempImagePath = path.join(
      //       __dirname,
      //       "../template/images/uploads/whatsapp/",
      //       reminderTemplateForCustomer.image
      //     );
      //   }
      //   if (reminderTemplateForCustomer.pdf !== "") {
      //     // pdf for user
      //     reminderForCusromerTempPdfPath = path.join(
      //       __dirname,
      //       "../template/images/uploads/whatsapp/",
      //       reminderTemplateForCustomer.pdf
      //     );
      //   }
      // if (thnakyouLeadTemplate.image !== "") {
      //   // img for lead
      //   LeadTempImagePath = path.join(
      //     __dirname,
      //     "../template/images/uploads/whatsapp/",
      //     thnakyouLeadTemplate.image
      //   );
      // }
      // if (thnakyouLeadTemplate.pdf !== "") {
      //   // pdf for lead
      //   LeadTempPdfPath = path.join(
      //     __dirname,
      //     "../template/images/uploads/whatsapp/",
      //     thnakyouLeadTemplate.pdf
      //   );
      // }

      // console.log(reminderForCustomerTempImagePath);
      // console.log(reminderForCusromerTempPdfPath);
      // console.log(LeadTempImagePath);
      // console.log(LeadTempPdfPath);

      console.log("/remark/add/:id");
      console.log(leadContactNo);

      let msg = reminderTemplateForCustomer.text;
      let companyName =
        Admin.organizationName !== null || Admin.organizationName !== undefined
          ? Admin.organizationName
          : "360FollowUps";
      const personalizedMessage = msg
        .replace("[customer name]", customerName)
        .replace("[company]", companyName)
        .replace("[date]", date)
        .replace("[time]", time)
        .replace("[company]", companyName);

      sendMessageToLead(
        connStatus,
        leadContactNo,
        personalizedMessage
        // reminderForCustomerTempImagePath,
        // reminderForCusromerTempPdfPath
      ); // after temp msg sending to lead
    }, timeDifference);
  }

  // todo thankyou message to lead or customer
  const thnakyouLeadTemplate = await templateModel.findOne({
    cid: req.user.cid,
    num: 5,
  });

  console.log(
    "after call template document----",
    thnakyouLeadTemplate,
    "------after call template document"
  );

  setTimeout(() => {
    console.log("/remark/add/:id");

    let msg = thnakyouLeadTemplate.text;
    let companyName =
      Admin.organizationName !== null || Admin.organizationName !== undefined
        ? Admin.organizationName
        : "360FollowUps";
    const personalizedMessage = msg
      .replace("[customer name]", customerName)
      .replace("[company]", companyName);

    console.log(
      "thankyu message log",
      connStatus,
      leadContactNo,
      thnakyouLeadTemplate.text,
      personalizedMessage
      // LeadTempImagePath,
      // LeadTempPdfPath
    );

    sendMessageToLead(
      connStatus,
      leadContactNo,
      personalizedMessage
      // LeadTempImagePath,
      // LeadTempPdfPath
    ); // reminder temp for user
  }, 5000);

  return res.json(remark);
});

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

async function findNewLead(accessToken, user) {
  let admin = await logIncollection.findById(user.id);
  let connStatus = await WaModel.findOne({ cid: admin.cid });
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

      const mobileRegex = /^[6-9]\d{9}$/;
      let leadContactNo;
      newLead.leads_data.forEach((item) => {
        const answer = item.ans.trim();

        if (mobileRegex.test(answer)) {
          console.log("Valid Mobile Number found:", answer);
          leadContactNo = answer;
        }
      });

      console.log(leadContactNo);
      // leadContactNo = "9755313770";

      const searchStrings = [
        "name",
        "your name",
        "customer name",
        "full name",
        "first name",
        "आपका नाम",
        "नाम",
        "पूरा नाम",
        "ग्राहक का नाम",
        "शुभ नाम",
      ];

      let customerName = "";

      newLead.leads_data.forEach((item) => {
        const isMatch = searchStrings.some((str) =>
          item.que.toLowerCase().includes(str.toLowerCase())
        );
        if (isMatch) {
          customerName = item.ans;
        }
      });

      if (customerName) {
        console.log("Matched customerName:", customerName);
      } else {
        customerName = "Sir/Madam";
        console.log("Un-Matched then customerName:", customerName);
      }

      const wellcomeTemp = await templateModel.findOne({
        cid: admin.cid,
        num: 4,
      });

      // todo COUSTOMER Whatsapp Message
      setTimeout(() => {
        let imagePath, pdfPath;
        if (wellcomeTemp.image !== "") {
          imagePath = path.join(
            __dirname,
            "../template/images/uploads/whatsapp/",
            wellcomeTemp.image
          );
        }
        if (wellcomeTemp.pdf !== "") {
          pdfPath = path.join(
            __dirname,
            "../template/images/uploads/whatsapp/",
            wellcomeTemp.pdf
          );
        }
        console.log("find new lead function auto call");

        let msg = wellcomeTemp.text;

        let companyName =
          admin.organizationName !== null ||
          admin.organizationName !== undefined
            ? admin.organizationName
            : "360FollowUps";

        const personalizedMessage = msg
          .replace("[customer name]", customerName)
          .replace("[company]", companyName)
          .replace("[company]", companyName);

        console.log(
          connStatus,
          leadContactNo,
          personalizedMessage,
          imagePath,
          pdfPath
        );

        sendMessageToLead(
          connStatus,
          leadContactNo,
          personalizedMessage,
          imagePath,
          pdfPath
        );
      }, 5000);

      // todo COUSTOMER Whatsapp Message
      const notificationTemp = await templateModel.findOne({
        cid: admin.cid,
        num: 3,
      });
      setTimeout(async () => {
        let msg = notificationTemp.text;

        let companyName =
          admin.organizationName !== null ||
          admin.organizationName !== undefined
            ? admin.organizationName
            : "360FollowUps";
        const today = new Date();

        const day = String(today.getDate()).padStart(2, "0"); // Din (2 digits)
        const month = String(today.getMonth() + 1).padStart(2, "0"); // Month (0-based index, isliye +1)
        const year = today.getFullYear(); // Year

        const formattedDate = `${day}-${month}-${year}`;

        // todo new lead found msg to Admin
        const personalizedMessage = msg
          .replace("[team member name]", admin.name)
          .replace("[customer name]", customerName)
          .replace("[customer contact number]", customerName)
          .replace("[date]", formattedDate)
          .replace("[lead source]", "facebook")
          .replace("[company]", companyName);

        sendMessageToLead(connStatus, admin.mobile, personalizedMessage);

        // todo new lead found msg to all Members
        let users = await memberModel.find({cid: admin.cid})
        for (let i = 0; i < users.length; i++) {
          setTimeout(() => {
            const personalizedMessage = msg
              .replace("[team member name]", users[i].name)
              .replace("[customer name]", customerName)
              .replace("[customer contact number]", customerName)
              .replace("[date]", formattedDate)
              .replace("[lead source]", "facebook")
              .replace("[company]", companyName);

            sendMessageToLead(connStatus, users[i].mobile, personalizedMessage);
          }, 2000);
        }
      }, 2500);

      allNewLeads.push(newLead);

      // console.log(leads_datas);

      // Send WhatsApp message to admin and members
      // const adminNumber = user.user.phoneNumber;
      // const adminName = user.user.name;
      // const message = `A new lead has been added:\n\nLead ID: ${lead.lead_id}\nIncome Time: ${lead.income_time}\nApp: ${lead.app}`;
      // sendMessageToLead('919755313770@c.us', `${adminName}, ${message}`);
      // sendMessageToLead(adminNumber, `${adminName}, ${message}`);

      // Get members of the admin
      // const members = await memberModel.find({ cid: user.user.cid });
      // members.forEach((member) => {
      //   const memberNumber = member.phoneNumber;
      // sendMessageToLead(memberNumber, `${adminName} added a new lead: ${lead.lead_id}`);
      // sendMessageToLead(memberNumber, `added a new lead:`);

      // });

      // console.log(leads_datas);
    }
  });

  return allLeads;
}

let chalteRahoId;
function chalteRaho(token, user) {
  let i = 0;

  chalteRahoId = setInterval(() => {
    findNewLead(token, user);
    console.log("step", i++);
  }, 60000);
}

function ensureQRCodeEvent() {
  // Avoid attaching multiple QR listeners by checking if it's already attached
  if (!client.listenerCount("qr")) {
    client.on("qr", (qrCode) => {
      try {
        const qrImage = qr.imageSync(qrCode, { type: "png" });
        qrCodeData = `data:image/png;base64,${qrImage.toString("base64")}`;
        // console.log("QR code generated and stored.");
      } catch (error) {
        console.error("Error generating QR Code:", error);
      }
    });
  }
}

// Cleanup Session Files with Retry Logic
async function cleanupSessionFiles() {
  const sessionPath = path.join(__dirname, ".wwebjs_auth/session");
  for (let retries = 5; retries > 0; retries--) {
    try {
      if (fs.existsSync(sessionPath)) {
        fs.rmSync(sessionPath, { recursive: true, force: true });
        // console.log("Session files deleted successfully.");
      }
      break; // Exit loop if deletion is successful
    } catch (error) {
      console.error("Failed to delete session files:", error.message);
      if (retries > 1) {
        console.warn(`Retrying cleanup... (${retries - 1} attempts left)`);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait before retrying
      }
    }
  }
}

function initializeWhatsAppClient() {
  // Remove all existing listeners to avoid duplication
  if (client) {
    client.removeAllListeners();
  }

  // Recreate the client to ensure fresh state
  client = new Client({
    puppeteer: { headless: true, args: [ '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-accelerated-2d-canvas', '--no-first-run', '--no-zygote', '--single-process',  '--disable-gpu', ], },
    authStrategy: new LocalAuth(),
  });

  // Re-attach necessary event listeners
  ensureQRCodeEvent();

  client.on("ready", async () => {
    console.log("WhatsApp client is ready!");
    whatsappClientReady = true;
    isConnected = true;
    connectedPhoneNumber = client.info.wid.user;
    console.log("Connected WhatsApp Number:", connectedPhoneNumber);
  });

  client.on("disconnected", async (reason) => {
    console.log("WhatsApp client has been disconnected due to:", reason);
    whatsappClientReady = false;
    isConnected = false;
    qrCodeData = ""; // Reset QR code data on disconnect
    await cleanupSessionFiles();
    initializeWhatsAppClient(); // Re-initialize to ensure fresh QR code generation
  });

  client.on("auth_failure", async (message) => {
    console.error("Authentication failure:", message);
    whatsappClientReady = false;
    isConnected = false;
    qrCodeData = ""; // Reset QR code data on authentication failure
    await cleanupSessionFiles();
    initializeWhatsAppClient(); // Re-initialize to re-trigger QR code generation
  });

  whatsappClientReady = false; // Reset ready status
  client
    .initialize()
    .then(() => {
      console.log("Client re-initialized");
    })
    .catch((error) => {
      console.error("Error re-initializing client:", error);
    });
}

initializeWhatsAppClient();

const readJsonFile = () => {
  const filePath = "./src/generated_data.json";
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data); // Return the parsed JSON data
};

async function sendMessageToLead(
  adminWA,
  phoneNumber,
  message,
  imagePath = null,
  pdfPath = null
) {
  console.log(
    "Trying to send message. Client ready status:",
    adminWA.isConnected
  );
  // Check if WhatsApp client is ready
  if (!adminWA.isConnected) {
    console.log("WhatsApp client is not ready. Queuing message.");
    return;
  }

  try {
    // If imagePath and captionText are provided, send image with caption
    if (imagePath && pdfPath) {
      const imageMedia = MessageMedia.fromFilePath(imagePath);
      const pdfMedia = MessageMedia.fromFilePath(pdfPath);

      await client.sendMessage(`91${phoneNumber}@c.us`, imageMedia, {
        caption: message,
      });

      await client.sendMessage(`91${phoneNumber}@c.us`, pdfMedia);
    } else if ((imagePath && !pdfPath) || pdfPath == "") {
      // send Only a image with text message
      const imageMedia = MessageMedia.fromFilePath(imagePath);
      await client.sendMessage(`91${phoneNumber}@c.us`, imageMedia, {
        caption: message,
      });
    } else if ((pdfPath && !imagePath) || imagePath == "") {
      // send Only a pdf with text message
      const pdfMedia = MessageMedia.fromFilePath(pdfPath);
      await client.sendMessage(`91${phoneNumber}@c.us`, pdfMedia, {
        caption: message,
      });
    } else {
      await client.sendMessage(`91${phoneNumber}@c.us`, message);
      console.log("Text message sent successfully!");
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
}
