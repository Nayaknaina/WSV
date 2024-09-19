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
const memberRoute = require("./routes/members.route.js");
const userRoute = require("./routes/users.route.js");
const Route = require("./routes/index.route.js");
const { log } = require("console");

//Whatsapp-----------------------------------------

const { Client, LocalAuth } = require("whatsapp-web.js");
const qr = require("qr-image");

// Initialize variables
let qrCodeData = "";
let whatsappClientReady = false;
let isConnected = false;
let connectedPhoneNumber = "";

// Initialize the WhatsApp Client with Local Authentication
let client = new Client({
  authStrategy: new LocalAuth(),
});

// Ensure QR Code Event Attachment

//-------------------------------------------

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

app.use("/", Route);
app.use("/member", memberRoute);
app.use("/user", userRoute);

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
  if (isConnected) {
    req.session.successMSG = `Connected WhatsApp Number: ${connectedPhoneNumber}`;
  }
  if (qrCodeData) {
    console.log("Qr genrated");
  }
  res.render("qr", {
    user,
    qrCodeData,
    isConnected,
  });
});

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
  }
);

// profile update

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
    const cid = uuidv4();
    user.cid = cid;
    user.role = "admin";
    await user.save();

    const pipelines = [
      { title: "win", color: "#28A745" },
      { title: "loss", color: "#DC3545" },
      { title: "held", color: "#007BFF" },
      { title: "pending", color: "#FFC107" },
    ].map(
      (pipelineData) =>
        new pipelineModel({
          uid: user._id,
          color: pipelineData.color,
          title: pipelineData.title,
          cid: user.cid,
        })
    );

    // Save all pipelines in parallel
    await Promise.all(pipelines.map((pipeline) => pipeline.save()));

    const templates = [
      {
        title: "welcome",
        text: "hello dear ! 👋\r\n\r\nWelcome to 360followups! thank you for reaching out to us and showing interest in our services. we're excited to connect with you! our team will be in touch with you shortly to assist you with your needs and provide the best solutions tailored just for you.",
        client: true,
        team: false,
        num: 1,
      },

      {
        title: "after call",
        text: "hello 👋\n\nthank you for taking the time to speak with us today. we truly appreciate your interest in 360followups and are excited to help you achieve your goals.\nif you have any further questions or need assistance, feel free to reach out. we’re here for you!",
        client: true,
        team: false,
        num: 2,
      },

      {
        title: "before call",
        text: "",
        client: false,
        team: false,
        num: 3,
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
    await Promise.all(templates.map((temp) => temp.save()));

    const token = await generateToken(user);

    res.cookie("360Followers", token, {
      httpOnly: true,
      maxAge: 2 * 30 * 24 * 60 * 60 * 1000,
    });
    res.redirect("/user/dashboard");
  }
);

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

    if (chalteRahoId) clearInterval(chalteRahoId);
    chalteRaho(accessToken, req);
    req.session.successMSG = "Connected to facebook account.";
    res.redirect("/leads");
  } catch (error) {
    console.error("Error fetching access token:", error);
    res.status(500).send("Error logging in with Facebook.");
  }
});

app.post("/remark/add/:id", isAdminLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { text, time, date } = req.body;
  let user;

  if (req.user.role === "admin") {
    user = await logIncollection.findById(req.user.id);
  } else user = await memberModel.findById(req.user.id);

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
      leadContactNo = answer;
    }
  });

  console.log(leadContactNo);
  leadContactNo = "9755313770";
  const remarkDateTime = new Date(`${date}T${time}:00`);
  const currentTime = new Date();

  let timeDifference = remarkDateTime - currentTime;
  timeDifference -= 1000 * 60 * 30;
  const reminderTemplate = await templateModel.findOne({
    cid: req.user.cid,
    num: 3,
  });
  const afterCallTemp = await templateModel.findOne({
    cid: req.user.cid,
    num: 2,
  });
  console.log(timeDifference);

  let reminderTempImagePath,
    reminderTempPdfPath,
    LeadTempImagePath,
    LeadTempPdfPath;
  if (timeDifference > 0) {
    setTimeout(() => {
      if (reminderTemplate.image !== "") {
        // img for user
        reminderTempImagePath = path.join(
          __dirname,
          "../template/images/uploads/whatsapp/",
          reminderTemplate.image
        );
      }
      if (reminderTemplate.pdf !== "") {
        // pdf for user
        reminderTempPdfPath = path.join(
          __dirname,
          "../template/images/uploads/whatsapp/",
          reminderTemplate.pdf
        );
      }
      if (afterCallTemp.image !== "") {
        // img for lead
        LeadTempImagePath = path.join(
          __dirname,
          "../template/images/uploads/whatsapp/",
          afterCallTemp.image
        );
      }
      if (afterCallTemp.pdf !== "") {
        // pdf for lead
        LeadTempPdfPath = path.join(
          __dirname,
          "../template/images/uploads/whatsapp/",
          afterCallTemp.pdf
        );
      }

      sendMessageToLead(
        leadContactNo,
        afterCallTemp.text,
        reminderTempImagePath,
        reminderTempPdfPath
      ); // after temp msg sending to lead
    }, timeDifference);
  }
  setTimeout(() => {
    sendMessageToLead(
      userContact,
      reminderTemplate.text,
      LeadTempImagePath,
      LeadTempPdfPath
    ); // reminder temp for user
  }, 5000);

  return res.json(remark);
});

app.post("/save-fcm-token", isAdminLoggedIn, async (req, res) => {
  const fcmToken = req.body.token;
  console.log("Received FCM Token:", fcmToken);

  let user;
  if (req.user.role === "admin")
    user = await logIncollection.findById(req.user.id);
  else user = await memberModel.findById(req.user.id);

  user.fcmToken = fcmToken;
  await user.save();

  res.status(200).send("FCM token saved successfully.");
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

async function findNewLead(accessToken, req) {
  let admin = await logIncollection.findById(req.user.id);
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
      leadContactNo = "9755313770";

      const wellcomeTemp = await templateModel.findOne({
        cid: admin.cid,
        num: 1,
      });

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

        sendMessageToLead(leadContactNo, wellcomeTemp.text, imagePath, pdfPath);
      }, 5000);

      setTimeout(() => {
        let userContactNo = admin.countryCode + admin.mobile;
        let userWAmsg = "hii you have a new lead 🎉";
        sendMessageToLead(userContactNo, userWAmsg);
      }, 2000);

      allNewLeads.push(newLead);

      // console.log(leads_datas);

      // Send WhatsApp message to admin and members
      // const adminNumber = req.user.phoneNumber;
      // const adminName = req.user.name;
      // const message = `A new lead has been added:\n\nLead ID: ${lead.lead_id}\nIncome Time: ${lead.income_time}\nApp: ${lead.app}`;
      // sendMessageToLead('919755313770@c.us', `${adminName}, ${message}`);
      // sendMessageToLead(adminNumber, `${adminName}, ${message}`);

      // Get members of the admin
      // const members = await memberModel.find({ cid: req.user.cid });
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
function chalteRaho(token, req) {
  let i = 0;

  chalteRahoId = setInterval(() => {
    findNewLead(token, req);
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

// async function sendPushNotification(fcmToken, title, body) {
//   const msg = {
//     notification: {
//       title: title,
//       body: body,
//     },
//     token: fcmToken, // User's FCM token
//   };

//   try {
//     // Send notification via FCM
//     const res = await admin.messaging().send(msg);
//     console.log('Successfully sent message:', res);
//   } catch (err) {
//     console.error('Error sending message:', err);
//   }
// }

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

// Function to Send a WhatsApp Message
function sendMessageToLead(phoneNumber, message) {
  console.log(
    "Trying to send message. Client ready status:",
    whatsappClientReady
  );

  if (!whatsappClientReady) {
    console.log("WhatsApp client is not ready. Queuing message.");
    return;
  }

  client
    .sendMessage(`91${phoneNumber}@c.us`, message)
    .then(() => {
      console.log("Message sent successfully.");
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
}

initializeWhatsAppClient();
