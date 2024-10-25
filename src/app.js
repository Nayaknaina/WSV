require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8000;

const hbs = require("hbs");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const MongoStore = require("connect-mongo");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const moment = require("moment");

const querystring = require("querystring");
const passport = require("passport");
const fs = require("fs");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const templatepath = path.join(__dirname, "../template");

const { v4: uuidv4 } = require("uuid");
const { sendMail } = require("./service/mailSender.js");
const { upload } = require("./service/multer.js");
const { generateToken } = require("../utils/auth.js");

const logIncollection = require("./models/admin.model.js");
const pipelineModel = require("./models/pipeline.model.js");
const memberModel = require("./models/member.model.js");
const remarkModel = require("./models/remark.model.js");
const leadsModel = require("./models/leads.model.js");
const templateModel = require("./models/temlate.model.js");
const WaModel = require("./models/wA.model.js");

const paymentRoute = require("./routes/payment.route.js");
const memberRoute = require("./routes/members.route.js");
const userRoute = require("./routes/users.route.js");
const Route = require("./routes/index.route.js");
const externalRoute = require("./routes/external.route.js");
const { log } = require("console");

const { checkSubscription } = require("./middilware/middilware.js");


// todo Whatsapp integrations-----------------------------------------
const { startKeepAlive } = require("./middilware/whatsapp.js");
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
    args: [
      "--ignore-certificate-errors",
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--single-process",
      "--disable-gpu",
    ],
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

//todo register partials
hbs.registerPartials(path.join(__dirname, "../template/partials"));
require("./middilware/hbsRegister.js");

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("template"));

// todo Passport.js Google Strategy
app.use(passport.initialize());
app.use(passport.session());

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
    const user = await logIncollection.findById(id);

    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

app.use("/", Route);
app.use("/member", memberRoute);
app.use("/user", userRoute);
app.use("/payment", paymentRoute);
app.use("/external", externalRoute);

// todo wtsapp Handle root request

app.get("/connection-status", isAdminLoggedIn, async (req, res) => {
  let user;
  if (req.user.role === "admin") {
    user = await logIncollection.findById(req.user.id)
  }
  else {
    user = await memberModel.findById(req.user.id);
  }

  let userWA = await WaModel.findOne({ cid: user.cid });

  console.log(isConnected, user.name, "check connection//");
  console.log("debug again", isConnected);

  if (userWA) {
    // Update shared variable for frontend use
    // shared.connectedPhoneNumber = userWA.connectedPhoneNumber || "";
    return res.json({ isConnected: userWA.isConnected});
  } else {
    return res.json({ isConnected: false });
  }

});
// app.get("/connection-status", isAdminLoggedIn, async (req, res) => {
//   let user;
//   if (req.user.role === "admin") {
//       user = await logIncollection.findById(req.user.id);
//   } else {
//       user = await memberModel.findById(req.user.id);
//   }


//   const phoneNumber = shared.connectedPhoneNumber || null;

//   if (phoneNumber) {
//       return res.json({
//           isConnected: true,
//           phoneNumber: phoneNumber 
//       });
//   } else {
//       return res.json({
//           isConnected: false,
//           phoneNumber: null 
//       });
//   }
// });



app.get("/qr", isAdminLoggedIn, async (req, res) => {
  // console.log("qrCodeData genrated in /qr", req.user.name);
  const user = req.user;

  if (qrCodeData) {
    console.log("Qr genrated");
  }
  console.log("debug again On First QR", isConnected);

  res.render("qr", {
    user,
    qrCodeData,
    isConnected,
  });
});
let iii = 0;
app.get("/qr/again", isAdminLoggedIn, async (req, res) => {
  // console.log("qrCodeData genrated in /qr", req.user.name);

  if (qrCodeData) {
    console.log("Qr genrated");
  }
  console.log("debug again On Second QR", iii, isConnected);
  iii++;

  if (isConnected) {
    isConnected = false;
    whatsappClientReady = false;
    let userWA = await WaModel.findOne({ cid: req.user.cid })
    if (!userWA) {
      console.log("user WA Model Not present then creant new");
      let userWA = new WaModel({
        cid: req.user.cid,
        isConnected: true,
        whatsappClientReady: true,
        connectedPhoneNumber: connectedPhoneNumber,
      });

      await userWA.save();
    } else {
      console.log("user WA Model present then update it");
      userWA.isConnected = true;
      userWA.whatsappClientReady = true;
      userWA.connectedPhoneNumber = connectedPhoneNumber;
      await userWA.save();
    }

    console.log("debug again when client connected success", isConnected);

    console.log("now we are blocking to refreshing qr page");
    return res.json({
      qrCodeData,
      isConnected: true,
     
    });
  }
  else {
    return res.json({
      qrCodeData,
      isConnected: false,
    });
  }


});
// todo logout whatsapp
app.get("/logoutWA", isAdminLoggedIn, async (req, res) => {
  let whatsapp = await WaModel.findOne({ cid: req.user.cid });
  try {
    whatsappClientReady = whatsapp.whatsappClientReady;
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

        const today = moment().startOf("day");
        let remarks = await remarkModel.find({ cid: req.user.cid });

        let futureCount = 0;
        remarks.forEach((remark) => {
          const remarkDate = moment(remark.date).startOf("day");
          const remarkTime = remark.time;

          if (
            remarkDate.isAfter(today) ||
            (remarkDate.isSame(today) && remark.time > moment().format("HH:mm"))
          ) {
            futureCount++;
          }
        });
        console.log(futureCount);

        req.session.warnMsg = `You’ve been logged out of WhatsApp. Please reconnect to send ${futureCount} pending remarks`;
      
        
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


// todo fetch leads 
app.get("/fetch/leads", isAdminLoggedIn,checkSubscription, async (req, res) => {
  try {
    let user = await logIncollection.findOne({ cid: req.user.cid });
    if(!req.session.access) {
      console.warn(`Subscription expired. Please renew to continue.`)
      req.session.errorMSG = `Subscription expired. Please renew to continue.`;
      return res.redirect('/leads')
    }
    if (!user.facebookToken) {
      let errMsg = "Please connect your facebook account. ";
      return res.json(errMsg);
    }

    let data = await findNewLead(user.facebookToken, user);
    console.log(data.length);

    res.json(data.length);
  } catch (err) {
    console.warn("Error in fetching leads manualy", err);
  }
});

//------------------------------------------------------
// todo manual lead addition
app.post("/manual/lead", isAdminLoggedIn, checkSubscription, async (req, res) => {
  try {
    let user;
    if (req.user.role === "admin") {
      user = await logIncollection.findById(req.user.id);
    } else {
      user = await memberModel.findById(req.user.id);
    }

    const Admin = await logIncollection.findOne({ cid: user.cid });
    if(!req.session.access) {
      console.warn(`Subscription expired. Please renew to continue.`)
      req.session.errorMSG = `Subscription expired. Please renew to continue.`;
      return res.redirect('/leads')
    }
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
    // console.log(req.body, "====", userContact);

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

    let defPipe = await pipelineModel.findOne({ num: 4, cid: user.cid });
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

    let isWACnn = await WaModel.findOne({cid: user.cid})
    if(!isWACnn.isConnected){
      req.session.errorMSG = 'Whatsapp is not connected Please Connect Whatsapp to Send Reamrk'
    }
    setTimeout(async () => {
      let connStatus;
      try {
        connStatus = await WaModel.findOne({ cid: req.user.cid });
      } catch (err) {
        console.error("Error fetching connStatus: ", err);
      }
      console.log("/manual/lead/");
      console.log("wellcome to lead ", leadContactNo);
      let msg = wellcomeTemp.text;
      let companyName =
        Admin.organizationName !== null &&
          Admin.organizationName !== undefined &&
          Admin.organizationName !== ""
          ? Admin.organizationName
          : "360FollowUps";
      console.log("company name", companyName);
      console.log(Admin.organizationName);


      const personalizedMessage = msg
        .replace("[customer name]", customerName)
        .replace("[company name]", companyName)
        .replace("[company name]", companyName);

      console.log("company name", companyName);

      // console.log(
      //   "wellcome message log",
      //   connStatus,
      //   leadContactNo,
      //   // wellcomeTemp.text,
      //   // personalizedMessage,
      //   // wellcomeTempImagePath,
      //   // wellcomeTempPdfPath
      // );

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

    if (timeDifference > 0) {
      // let reminderTempImagePath,reminderTempPdfPath;
      setTimeout(async () => {
        let connStatus;
        try {
          connStatus = await WaModel.findOne({ cid: req.user.cid });
        } catch (err) {
          console.error("Error fetching connStatus: ", err);
        }
        console.log("/remark/add/:id");
        console.log(leadContactNo, " lead contact number");

        let msg = reminderTemplateForMember.text;

        let companyName =
          Admin.organizationName !== null ||
            Admin.organizationName !== undefined ||
            Admin.organizationName !== ""
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
          .replace("[company name]", companyName);
        console.log("reminder to member ", userContact);
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

    if (timeDifference > 0) {
      // let reminderForCustomerTempImagePath,reminderForCusromerTempPdfPath;
      setTimeout(async () => {
        let connStatus
        try {
          connStatus = await WaModel.findOne({ cid: req.user.cid });
        } catch (err) {
          console.error("Error fetching connStatus: ", err);
        }
        console.log("/remark/add/:id");
        console.log(leadContactNo, " lead contact number");

        let msg = reminderTemplateForCustomer.text;
        let companyName =
          Admin.organizationName !== null ||
            Admin.organizationName !== undefined ||
            Admin.organizationName !== ""
            ? Admin.organizationName
            : "360FollowUps";

        const personalizedMessage = msg
          .replace("[customer name]", customerName)
          .replace("[company name]", companyName)
          .replace("[date]", remarkDate)
          .replace("[time]", remarkTime)
          .replace("[company name]", companyName);
        console.log("reminder to lead ", leadContactNo);
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

    // console.log(
    //   "after call template document----",
    //   thnakyouLeadTemplate,
    //   "------after call template document"
    // );

    setTimeout(async () => {
      let connStatus
      try {
        connStatus = await WaModel.findOne({ cid: req.user.cid });
      } catch (err) {
        console.error("Error fetching connStatus: ", err);
      }
      console.log("/remark/add/:id");
      console.log("thanks to lead ", leadContactNo);

      let msg = thnakyouLeadTemplate.text;
      let companyName =
        Admin.organizationName !== null &&
          Admin.organizationName !== undefined &&
          Admin.organizationName !== ""
          ? Admin.organizationName
          : "360FollowUps";
      const personalizedMessage = msg
        .replace("[customer name]", customerName)
        .replace("[company name]", companyName);

      // console.log(
      //   "thankyu message log",
      //   connStatus,
      //   leadContactNo,
      //   // thnakyouLeadTemplate.text,
      //   // personalizedMessage
      //   // LeadTempImagePath,
      //   // LeadTempPdfPath
      // );

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

//todo -- fetch lead from Fb when you have tocken and Subscription
app.get('/leads/pre', isAdminLoggedIn, checkSubscription, async (req, res) => {
  try {
    let user = await logIncollection.findOne({ cid: req.user.cid })

    if (!user) {
      return res.redirect('/user/login')
    };
   
    
    if(!req.session.access){
      console.warn(`Subscription expired. Please renew to continue.`)
      req.session.errorMSG = `Subscription expired. Please renew to continue.`;
      return res.redirect('/leads')
    }

    console.log(user.facebookToken, "usrer facebook token");

    if (user.facebookToken === null || user.facebookToken === undefined || user.facebookToken === '') {
      // await new Promise(resolve => setTimeout(resolve, 5000));  // 5 seconds delay
      console.log("you not have fb token");
      
      return res.redirect('/leads')
    }
    console.log("findinnngggg");

    let data = await findNewLead(user.facebookToken, user);
    console.log(data);

    return res.redirect('/leads');
  } catch (err) {
    console.warn("error in finding ne lead in /leads/pre - ", err);
  }
})

// todo remark addition
app.post("/remark/add/:id", isAdminLoggedIn,checkSubscription, async (req, res) => {
  const { id } = req.params;
  const { text, time, date } = req.body;
  let user;

  if (req.user.role === "admin") {
    user = await logIncollection.findById(req.user.id);
  } else user = await memberModel.findById(user._id);
  
  if(!req.session.access) {
    console.warn(`Subscription expired. Please renew to continue.`)
    req.session.errorMSG = `Subscription expired. Please renew to continue.`;
    return res.redirect('/leads')
  }
  let Admin = await logIncollection.findOne({ cid: user.cid });

  let userContact = user.mobile;

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

  console.log(timeDifference);

  //todo  reminder message for team member
  if (timeDifference > 0) {
    // let reminderTempImagePath,reminderTempPdfPath;
    setTimeout(async () => {
      let connStatus = await WaModel.findOne({ cid: req.user.cid });

      console.log("/remark/add/:id");
      console.log(leadContactNo);
      console.log("reminder to members ", userContact);
      let msg = reminderTemplateForMember.text;
      let companyName =
        Admin.organizationName !== null &&
          Admin.organizationName !== undefined &&
          Admin.organizationName !== ""
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
        .replace("[company name]", companyName);

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

  if (timeDifference > 0) {
    // let reminderForCustomerTempImagePath,reminderForCusromerTempPdfPath;
    setTimeout(async () => {
      let connStatus;
      try {
        connStatus = await WaModel.findOne({ cid: req.user.cid });
      } catch (err) {
        console.error("Error fetching connStatus: ", err);
      }
      console.log("/remark/add/:id");
      console.log(leadContactNo);
      console.log("reminder to lead ", leadContactNo);

      let msg = reminderTemplateForCustomer.text;
      let companyName =
        Admin.organizationName !== null &&
          Admin.organizationName !== undefined &&
          Admin.organizationName !== ""
          ? Admin.organizationName
          : "360FollowUps";
      const personalizedMessage = msg
        .replace("[customer name]", customerName)
        .replace("[company name]", companyName)
        .replace("[date]", date)
        .replace("[time]", time)
        .replace("[company name]", companyName);

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

  setTimeout(async () => {
    let connStatus;
    try {
      connStatus = await WaModel.findOne({ cid: req.user.cid });
    } catch (err) {
      console.error("Error fetching connStatus: ", err);
    }
    console.log("/remark/add/:id");
    console.log("thanks to lead ", leadContactNo);

    let msg = thnakyouLeadTemplate.text;
    let companyName =
      Admin.organizationName !== null ||
        Admin.organizationName !== undefined ||
        Admin.organizationName !== ""
        ? Admin.organizationName
        : "360FollowUps";
    const personalizedMessage = msg
      .replace("[customer name]", customerName)
      .replace("[company name]", companyName);

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

// todo Google Authentication Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  (req, res) => { }
);
// todo google callback
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
      user.signupDate = new Date();//added
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
  
  This is a friendly reminder from [Company Name]. We have a scheduled follow-up call with you on [Date] at [Time]. Our representative will be reaching out to discuss your requirements.
  
  If you have any questions or need to reschedule, please feel free to let us know.
  
  Looking forward to speaking with you!
  
  Best Regards,
  The [Company Name] Team`,
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
  The [Company Name] System`,
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
  The [Company Name] Team`,
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
  The [Company Name] System`,
          client: false,
          team: true,
          num: 3,
        },

        {
          title: "Wellcome Message To Customer",
          text: `Dear [Customer Name],
  
  Welcome to [Company Name]! We’re thrilled to have you on board. Our team will be reaching out to you shortly to understand your needs and help you find the best solutions.
  
  If you have any immediate questions, feel free to get in touch with us. We're here to support you every step of the way!
  
  Best Regards,
  The [Company Name] Team`,
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

 
    const subExp = new Date(user.subscriptionExpiry);
    const today = new Date();
    const diffTime = subExp - today;
    const daysLeft = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if(daysLeft<=0) {
      console.warn(`Subscription expired. Please renew to continue.`)
      req.session.errorMSG = `Subscription expired. Please renew to continue.`;
    }
    else {// days left success left
      req.session.successMSG = `Your free plan started. You have ${daysLeft} days remaining.`
    }

    const token = await generateToken(user);

    res.cookie("360Followers", token, {
      httpOnly: true,
      maxAge: 2 * 30 * 24 * 60 * 60 * 1000,
    });
    
    res.redirect("/user/dashboard");
  }
);

//todo  Facebook Login Route
app.get("/auth/facebook", (req, res) => {
  const facebookAuthUrl =
    `https://www.facebook.com/v20.0/dialog/oauth?` +
    querystring.stringify({
      client_id: process.env.FB_CLIENT_ID,
      redirect_uri: process.env.REDIRECT_URI,
      scope:
        "public_profile,email,leads_retrieval,pages_manage_ads,pages_read_engagement,pages_manage_metadata,pages_show_list",
      response_type: "code",
    });
  console.log("redirected from /auth/fb");

  res.redirect(facebookAuthUrl);
});

// todo Facebook Callback Route
// app.get("/auth/facebook/callback", isAdminLoggedIn, async (req, res) => {
//   const { code } = req.query;
//   console.log("Entering Facebook callback route");

//   if (!code) {
//     console.log("No authorization code provided.");
//     return res.status(400).send("Invalid authorization code");
//   }

//   try {
//     // Get access token from Facebook OAuth
//     const tokenResponse = await axios.get(
//       "https://graph.facebook.com/v20.0/oauth/access_token",
//       {
//         params: {
//           client_id: process.env.FB_CLIENT_ID,
//           redirect_uri: process.env.REDIRECT_URI,
//           client_secret: process.env.FB_CLIENT_SECRET,
//           code,
//         },
//       }
//     );

//     const accessToken = tokenResponse.data.access_token;
//     console.log("User Access token received:", accessToken);

//     // Find the admin from the database
//     let admin = await logIncollection.findById(req.user.id);
//     if (!admin) {
//       console.log("Admin not found, redirecting to login.");
//       return res.redirect("/login");
//     }

//     admin.facebookToken = accessToken;
//     await admin.save();
//     console.log("Access token saved to admin account.");

//     // Fetch pages connected to the Facebook account
//     const pagesResponse = await axios.get(
//       `https://graph.facebook.com/v20.0/me/accounts`,
//       {
//         params: { access_token: accessToken, fields: "id,name,access_token" },
//       }
//     );

//     const pages = pagesResponse.data.data;
//     console.log("Total pages fetched:", pages.length);
//     if (!pages.length) console.warn("No pages available for this account.");

//     let allLeads = [];

//     // Loop through each page to fetch its leadgen forms
//     for (const page of pages) {
//       console.log(`Processing page: ${page.name} (ID: ${page.id})`);

//       try {
//         const leadFormsResponse = await axios.get(
//           `https://graph.facebook.com/v20.0/${page.id}/leadgen_forms`,
//           {
//             params: { access_token: page.access_token, fields: "id,name" },
//           }
//         );

//         const leadForms = leadFormsResponse.data.data;
//         console.log(`Forms fetched for page ${page.name}: ${leadForms.length}`);

//         // Loop through each form to fetch leads
//         for (const form of leadForms) {
//           console.log(`Fetching leads for form: ${form.name} (ID: ${form.id})`);

//           try {
//             const leadsResponse = await axios.get(
//               `https://graph.facebook.com/v20.0/${form.id}/leads`,
//               {
//                 params: {
//                   access_token: page.access_token,
//                   fields: "id,created_time,field_data",
//                 },
//               }
//             );

//             const leads = leadsResponse.data.data;
//             console.log(
//               `Total leads fetched for form ${form.name}: ${leads.length}`
//             );

//             leads.forEach((lead) => {
//               allLeads.push({
//                 ...lead, // Include original lead data
//                 page_id: page.id,
//                 page_name: page.name,
//                 form_id: form.id,
//                 form_name: form.name,
//               });
//             });

//             if (leadsResponse.data.paging?.next) {
//               console.log(
//                 `Pagination detected. Next page URL: ${leadsResponse.data.paging.next}`
//               );
//             }
//           } catch (err) {
//             console.error(
//               `Error fetching leads for form ${form.name}:`,
//               err.message
//             );
//           }
//         }
//       } catch (err) {
//         console.error(
//           `Error fetching forms for page ${page.name}:`,
//           err.message
//         );
//       }
//     }

//     console.log("Leads fetched with page and form details:", allLeads);

//     // Save the leads to the database
//     for (const lead of allLeads) {
//       const existingLead = await leadsModel.findOne({
//         lead_id: lead.id,
//         cid: req.user.cid,
//       });

//       if (!existingLead) {
//         const leadsData = lead.field_data.map((data) => ({
//           que: data.name,
//           ans: data.values[0],
//         }));
//         // let defPipe = await pipelineModel.findOne({ num: 4, cid: user.cid });
//         const newLead = new leadsModel({
//           lead_id: lead.id,
//           income_time: lead.created_time,
//           page_id: lead.page_id,
//           page_name: lead.page_name,
//           form_id: lead.form_id,
//           form_name: lead.form_name,
//           cid: admin.cid,
//           leads_data: leadsData,
//           // status: defPipe._id,
//           app: "facebook",
//         });

//         await newLead.save();
//         console.log(
//           `Saved lead ${lead.id} from page "${lead.page_name}" and form "${lead.form_name}".`
//         );
//       } else {
//         console.log(`Lead ${lead.id} already exists in the database.`);
//       }
//     }

//     // Start background job for keeping access token alive, if necessary

//     req.session.successMSG = "Connected to Facebook account.";
//     res.redirect("/external/get/data");
//   } catch (error) {
//     console.error(
//       "Error during Facebook callback:",
//       error.response ? error.response.data : error.message
//     );
//     res.status(500).send("Error logging in with Facebook.");
//   }
// });

app.get("/auth/facebook/callback", isAdminLoggedIn,checkSubscription, async (req, res) => {
  const { code } = req.query;

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

    const accessToken = tokenResponse.data.access_token;
    const admin = await logIncollection.findById(req.user.id);

    if (!admin) {
      return res.redirect("/login");
    }

    admin.facebookToken = accessToken;
    await admin.save();
    
    req.session.successMSG = "Connected to Facebook account.";

    // todo if Subscription end i cant give you permission to fetch your leads 
    if(!req.session.access){
      req.session.errorMSG = `Subscription expired. Please renew to continue.`;
      console.warn(req.session.errorMSG);
      return res.redirect("/leads");
    }
    let allLeads = await fetchLeadsFromFacebook(accessToken);

    // Save leads to database (if needed)
    for (const lead of allLeads) {
      const existingLead = await leadsModel.findOne({ lead_id: lead.id, cid: req.user.cid });

      if (!existingLead) {
        const leadsData = lead.field_data.map((data) => ({
          que: data.name,
          ans: data.values[0],
        }));

        const newLead = new leadsModel({
          lead_id: lead.id,
          income_time: lead.created_time,
          page_id: lead.page_id,
          page_name: lead.page_name,
          form_id: lead.form_id,
          form_name: lead.form_name,
          cid: admin.cid,
          leads_data: leadsData,
          app: "facebook",
        });

        await newLead.save();
      }
    }

    res.redirect("/leads");
  } catch (error) {
    console.error(
      "Error during Facebook callback:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send("Error logging in with Facebook.");
  }
});

//todo fetch lead--on
async function fetchLeadsFromFacebook(accessToken) {
  let allLeads = [];
  const pagesResponse = await axios.get(
    `https://graph.facebook.com/v20.0/me/accounts`,
    { params: { access_token: accessToken, fields: "id,name,access_token" } }
  );

  const pages = pagesResponse.data.data;

  for (const page of pages) {
    const formsResponse = await axios.get(
      `https://graph.facebook.com/v20.0/${page.id}/leadgen_forms`,
      { params: { access_token: page.access_token, fields: "id,name" } }
    );

    const forms = formsResponse.data.data;

    for (const form of forms) {
      let nextPageUrl = `https://graph.facebook.com/v20.0/${form.id}/leads`;

      while (nextPageUrl) {
        const response = await axios.get(nextPageUrl, {
          params: {
            access_token: page.access_token,
            fields: "id,created_time,field_data",
          },
        });


        for (const lead of response.data.data) {

          lead.page_id = page.id;
          lead.page_name = page.name;
          lead.form_id = form.id;
          lead.form_name = form.name;

          allLeads.push(lead);
        }

        nextPageUrl = response.data.paging?.next || null;
      }
    }
  }
  return allLeads;
}


// todo logout facebook
app.get("/logoutfacebook", isAdminLoggedIn, async (req, res) => {
  try {
    await logIncollection.findByIdAndUpdate(req.user.id, {
      facebookToken: null,
    });
    req.session.successMSG = "Facebook account disconnected.";
    res.redirect("/user/dashboard");
  } catch (err) {
    console.error("Error clearing Facebook token:", err);
    res.status(500).send("Error clearing Facebook token.");
  }
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

//  Cleanup Session Files with Retry Logic
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
    puppeteer: {
      headless: true,
      ignoreHTTPSErrors: true,
      args: [
        "--ignore-certificate-errors",
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--single-process",
        "--disable-gpu",
      ],
    },
    authStrategy: new LocalAuth(),
  });

  // Re-attach necessary event listeners
  ensureQRCodeEvent();

  client.on("ready", async () => {
    console.log("WhatsApp client is ready!");
    whatsappClientReady = true;
    isConnected = true;
    // shared.connectedPhoneNumber = client.info.wid.user; // Store phone 
    // console.log("Connected WhatsApp Number:", shared.connectedPhoneNumber);
    connectedPhoneNumber = client.info.wid.user;
    console.log("Connected WhatsApp Number:", connectedPhoneNumber);
    // startKeepAlive(client);
  });

  client.on("disconnected", async (reason) => {
    console.log("WhatsApp client has been disconnected due to:", reason);
    whatsappClientReady = false;
    isConnected = false;
    qrCodeData = "";
    setTimeout(() => {
      client.initialize();
    }, 5000);
    await cleanupSessionFiles();
    initializeWhatsAppClient();
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


async function sendMessageToLead(
  adminWA,
  phoneNumber,
  message,
  imagePath = null,
  pdfPath = null
) {
  if (adminWA === null || adminWA === undefined || adminWA === '') {
    console.warn("WhatsApp client is not ready. please connect mobile number");
    return;
  }
  console.log();

  // Check if WhatsApp client is ready
  if (adminWA && !adminWA.isConnected) {
    console.warn("WhatsApp client is not ready. please re-connect mobile number isConnected in DB=", adminWA.isConnected);
    return;
  }
  console.log(
    "Trying to send message. Client ready status:",
    adminWA.isConnected
  );

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

let findNewLeadCount = 0;
async function findNewLead(accessToken, user) {
  console.log(findNewLeadCount, "aagyi lead");
  findNewLeadCount++;
  let admin;
  try {
    admin = await logIncollection.findOne({ cid: user.cid });
  } catch (err) {
    console.error("Error fetching admin: ", err);
    return;
  }

  if (!admin) {
    console.error("Admin not found.");
    return;
  }

  let allNewLeads = [];
  const pagesResponse = await axios.get(
    `https://graph.facebook.com/v20.0/me/accounts`,
    {
      params: {
        access_token: accessToken,
        fields: "id,name,access_token",
      },
    }
  );

  const pages = pagesResponse.data.data;
  console.log("Total pages fetched:", pages.length);
  if (!pages.length) console.warn("No pages available for this account.");

  let allLeads = [];

  for (const page of pages) {
    console.log(`Processing page: ${page.name} (ID: ${page.id})`);

    try {
      const leadFormsResponse = await axios.get(
        `https://graph.facebook.com/v20.0/${page.id}/leadgen_forms`,
        {
          params: { access_token: page.access_token, fields: "id,name" },
        }
      );

      const leadForms = leadFormsResponse.data.data;
      console.log(`Forms fetched for page ${page.name}: ${leadForms.length}`);

      // Loop through each form to fetch leads
      for (const form of leadForms) {
        console.log(`Fetching leads for form: ${form.name} (ID: ${form.id})`);

        try {
          const leadsResponse = await axios.get(
            `https://graph.facebook.com/v20.0/${form.id}/leads`,
            {
              params: {
                access_token: page.access_token,
                fields: "id,created_time,field_data",
              },
            }
          );

          const leads = leadsResponse.data.data;
          console.log(
            `Total leads fetched for form ${form.name}: ${leads.length}`
          );

          leads.forEach((lead) => {
            allLeads.push({
              ...lead, // Include original lead data
              page_id: page.id,
              page_name: page.name,
              form_id: form.id,
              form_name: form.name,
            });
          });

          if (leadsResponse.data.paging?.next) {
            console.log(
              `Pagination detected. Next page URL: ${leadsResponse.data.paging.next}`
            );
          }
        } catch (err) {
          console.error(
            `Error fetching leads for form ${form.name}:`,
            err.message
          );
        }
      }
    } catch (err) {
      console.error(`Error fetching forms for page ${page.name}:`, err.message);
    }
  }

  allLeads.forEach(async (lead) => {
    const existingLead = await leadsModel.findOne({
      lead_id: lead.id,
      cid: admin.cid,
    });

    if (!existingLead) {
      console.log("new lead found", lead);

      let leads_datas = [];

      lead.field_data.forEach((data) => {
        leads_datas.push({
          que: data.name,
          ans: data.values[0],
        });
      });

      // let defPipe = await pipelineModel.findOne({ num: 4 ,cid:user.cid});
      const newLead = new leadsModel({
        lead_id: lead.id,
        income_time: lead.created_time,
        page_id: lead.page_id,
        page_name: lead.page_name,
        form_id: lead.form_id,
        form_name: lead.form_name,
        cid: admin.cid,
        leads_data: leads_datas,
        // status: defPipe._id,
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
      setTimeout(async () => {
        let connStatus;
        try {
          connStatus = await WaModel.findOne({ cid: admin.cid });
        } catch (err) {
          console.error("Error fetching connStatus: ", err);
        }

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
            admin.organizationName !== "undefined" ||
            admin.organizationName !== ""
            ? admin.organizationName
            : "360FollowUps";

        const personalizedMessage = msg
          .replace("[customer name]", customerName)
          .replace("[company name]", companyName)
          .replace("[company name]", companyName);

        // console.log(
        //   connStatus,
        //   leadContactNo,
        //   personalizedMessage,
        //   imagePath,
        //   pdfPath
        // );
        console.log("Welcome to lead new lead found", leadContactNo);
        sendMessageToLead(
          connStatus,
          leadContactNo,
          personalizedMessage,
          imagePath,
          pdfPath
        );
      }, 5000);

      // todo COUSTOMER Whatsapp Message for members
      const notificationTemp = await templateModel.findOne({
        cid: admin.cid,
        num: 3,
      });
      setTimeout(async () => {
        try {
          connStatus = await WaModel.findOne({ cid: admin.cid });
        } catch (err) {
          console.error("Error fetching connStatus: ", err);
        }
        let msg = notificationTemp.text;

        let companyName =
          admin.organizationName !== null ||
            admin.organizationName !== "" ||
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
          .replace("[company name]", companyName);
        console.log("notificaton to admin new lead found ", admin.mobile);
        sendMessageToLead(connStatus, admin.mobile, personalizedMessage);

        // todo new lead found msg to all Members
        let users = await memberModel.find({ cid: admin.cid });
        for (let i = 0; i < users.length; i++) {
          setTimeout(() => {
            const personalizedMessage = msg
              .replace("[team member name]", users[i].name)
              .replace("[customer name]", customerName)
              .replace("[customer contact number]", customerName)
              .replace("[date]", formattedDate)
              .replace("[lead source]", "facebook")
              .replace("[company name]", companyName);
            console.log("notification to members new lead found", users[i].mobile);
            sendMessageToLead(connStatus, users[i].mobile, personalizedMessage);
          }, 2000);
        }
      }, 2500);

      allNewLeads.push(newLead);
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


module.exports = app;