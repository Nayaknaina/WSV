const express = require("express");
const router = express.Router();
const cron = require("node-cron");
const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qr = require("qr-image");
const fs = require("fs");
const path = require("path");
const logIncollection = require("../models/admin.model");
const waModel = require("../models/wA.model");
const jwt = require("jsonwebtoken");
const { default: axios } = require("axios");
const leadsModel = require("../models/leads.model");
const pipelineModel = require("../models/pipeline.model");
const remarkModel = require("../models/remark.model");
const templateModel = require("../models/temlate.model");
// const Agenda = require('agenda');

const {
  findMobileNumber,
  capitalizeText,
  checkSubscription,
  isAdminLoggedIn,
} = require("../middilware/middilware");
const memberModel = require("../models/member.model");
const { sendMail } = require("../service/mailSender");
const {
  startKeepAlive,
} = require("../middilware/whatsapp");
const { isAsyncFunction } = require("util/types");

// const logIncollection = require("../models/admin.model");

global.clients = {};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function removeSession(userId) {
  // Define the path to the session directory for the given userId
  const sessionPath = path.join(__dirname, "sessions", `session-${userId}`);

  // Check if the session directory exists
  if (fs.existsSync(sessionPath)) {
    try {
      // Remove the session directory recursively
      fs.rmSync(sessionPath, { recursive: true, force: true });
      console.log(`Session for user ${userId} removed successfully.`);
    } catch (err) {
      console.error(`Error removing session for user ${userId}:`, err);
    }
  } else {
    console.log(`No session found for user ${userId}.`);
  }
}
function removeClientFromGlobalObj(userId) {
  if (global.clients[userId]) {
    console.log(`Client for user ${userId} already exists. Removing it...`);
    delete global.clients[userId];
  }
}
function createClient(userId) {
  const sessionPath = path.join(__dirname, "sessions", `session-${userId}`);
  console.log("Attempting to create client for:", sessionPath);
  // todo remove session from dir if exist
  removeSession(userId);
  //todo remove client from globle obj if exist
  removeClientFromGlobalObj(userId);

  // todo create new client and session file
  const client = new Client({
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
    authStrategy: new LocalAuth({
      clientId: userId,
      dataPath: path.join(__dirname, "sessions"),
    }),
  });
  //todo client store in global obj
  try {
    
    global.clients[userId] = {
      IS_CONNECTED: false, // Whether the client is connected
      CONNECTED_PHONE: null, // Mobile number of the client
      QR_CODE_DATA: null, // QR code string or image data
      client: client, // Client object (could be a user or client instance)
    };
  } catch (error) {
    console.log("ERROR in create client when client created and initia")
  }
  return client;
}

// Endpoint to initialize a WhatsApp session for a user
router.get("/qr", authenticateToken, async (req, res) => {
  console.log("req to QR in /qr ");
  try {
    const user = await logIncollection.findById(req.user.id);
    const wa = await waModel.findOne({ cid: user.cid });
    if (wa) {
      global.clients[user._id].IS_CONNECTED = true;
      return res.json({ msg: "success" });
      // removeSession(user._id)
    } else {
      try {
        removeSession(user._id.toString());
        const client = createClient(user._id.toString());
        setupClientEvents(client, user._id);
        client.initialize();
        global.clients = global.clients || {};
        global.clients[user._id.toString()].client = client;
        res.json({ msg: "success" });
      } catch (err) {
        console.log("Error in qr genrating ", err);
      }
    }
    // Ensure global.clients exists and store the client for this user
  } catch (error) {
    console.log(err);
  }
});

router.get("/ready", isAdminLoggedIn, async (req, res) => {
  console.warn("try to ready client when scan qr");
  try {
    console.log(global.clients[req.user.id].IS_CONNECTED);
    if (global.clients[req.user.id].IS_CONNECTED) {
      let WA = await waModel.findOne({ cid: req.user.cid });
      if (!WA) {
        let wa = new waModel({
          whatsappClientReady: true,
          isConnected: true,
          connectedPhoneNumber: global.clients[req.user.id].CONNECTED_PHONE,
          cid: req.user.cid,
        });
        await wa.save();
      }
      console.warn("is connected true send whatsapp connected ");
      res.json({ isConnected: global.clients[req.user.id].IS_CONNECTED });
    } else {
      console.warn("is connected false send whatsapp not connected ");
      res.json({ isConnected: false });
    }
  } catch (err) {
    console.log("error in /ready", err);
  }
});

router.get("/scan", isAdminLoggedIn, async (req, res) => {
  console.warn("render qr page only with qr null");
  res.render("qr", { qrCodeData: null });
});

router.get("/again", isAdminLoggedIn, async (req, res) => {
  try {
    
  
  console.warn("req for QR in /again in time interval");
  if(global.clients[req.user.id]){
  console.log(global.clients[req.user.id].QR_CODE_DATA);
  try {
    if (global.clients[req.user.id].QR_CODE_DATA) {
      console.warn("req accept for QR in /again & QR sent");
      res.json({ qrCodeData: global.clients[req.user.id].QR_CODE_DATA });
    } 
  } catch (err) {
    
    console.log("error in /again when check the value of QR_CODE_DATA in global obj")
    console.log(err)
  }
}
  else {
    console.warn("qr not genrate in /again");
    res.json({ qrCodeData: null });
  }
} catch (error) {
    console.log(error)
}
});

router.get("/send-message", authenticateToken, async (req, res) => {
  message = `hyy from 360followups`;
  const user = await logIncollection.findById(req.user.id);
  console.log(user);
  let client;
  if(global.clients[user._id.toString()]){
    client = global.clients[user._id.toString()].client;
  }
  if (client) {
    console.log("client availiable");
  }
  if (!client) return res.status(400).send("User session not initialized");

  try {
    await client.sendMessage(`${919755313770}@c.us`, message);
    console.error("message send on whats num - 919755313770");
    res.redirect("/user/dashboard");
  } catch (error) {
    console.log(error);
  }
});

router.get("/connection-status", authenticateToken, async (req, res) => {
  console.warn("in /connection-status");

  let user;
  if (req.user.role === "admin") {
    user = await logIncollection.findById(req.user.id);
  } else {
    user = await memberModel.findById(req.user.id);
  }

  let admin = await logIncollection.findOne({ cid: req.user.cid });
  let client;
  if (global.clients[admin._id]) {
    client = global.clients[admin._id].client;
  }
  if (client) {
    // console.warn(global.clients[admin._id].IS_CONNECTED)
    // console.warn(global.clients[admin._id].CONNECTED_PHONE)
    // console.warn(global.clients[admin._id].QR_CODE_DATA)
    // handleDisconnection(client, admin._id);
  }
  let userWA = await waModel.findOne({ cid: user.cid });

  // isConnected = false;
  if (userWA) {
    console.log(userWA.isConnected, user.name, "check connection//");

    return res.json({ isConnected: userWA.isConnected });
  } else {
    return res.json({ isConnected: false });
  }
});

// Endpoint to logout a specific user's session
router.get("/logoutWA", authenticateToken, async (req, res) => {
  let userId = req.user.id;
  const client = global.clients[userId].client;
  if (!client)
    return res.status(200).json({ errorMsg: "User session not initialized" });
  console.warn("try to go in logout try and client is availiable");

  try {
    console.log("we dont have any idea is client ready or not");
    try {
      await client.logout();
    } catch (er) {
      console.log("error in /logoutWA when i logout client", er);
    }
    console.log(`client logout ${req.user.name}`);
    let delWA = await waModel.findOneAndDelete({ cid: req.user.cid });
    if (delWA) {
      console.warn("user Whatsapp document deleted");
    }
    // todo global client removing
    if (global.clients[userId]) {
      delete global.clients[userId];
      console.log(`Client removed from global clients: ${userId}`);
      console.log(`remain clients ${Object.keys(global.clients).length}`);
    }
    console.warn("session folder automatically deleted ");
    removeSession(userId);

    client.on("disconnected", () => {
      console.warn("whatsapp logout in clint on disconnected");
    });

    await delay(5000);
    res.redirect("/user/dashboard");
  } catch (error) {
    res.status(500).send("Failed to logout");
  }
});

module.exports = { sendMessageToLead };
module.exports = router;

async function sendMessageToLead(
  adminWA,
  phoneNumber,
  message,
  imagePath = null,
  pdfPath = null
) {
  if (adminWA === null || adminWA === undefined || adminWA === "") {
    console.warn("WhatsApp client is not ready. please connect mobile number");
    return;
  }
  console.log("Phone number", phoneNumber);

  // Check if WhatsApp client is ready
  if (adminWA && !adminWA.isConnected) {
    console.warn(
      "WhatsApp client is not ready. please re-connect mobile number isConnected in DB=",
      adminWA.isConnected
    );
    return;
  }
  console.log(
    "Trying to send message. Client ready status:",
    adminWA.isConnected
  );
  // phoneNumber = "916267181871";

  const user = await logIncollection.findOne({ cid: adminWA.cid });
  console.log(user);
  let client 
  if( global.clients[user._id.toString()]){

    client = global.clients[user._id.toString()].client;
  }
  if (client) {
    console.log("client availiable");
  }
  if (!client) return "User session not initialized";

  try {
    // If imagePath and captionText are provided, send image with caption
    if (imagePath && pdfPath) {
      const imageMedia = MessageMedia.fromFilePath(imagePath);
      const pdfMedia = MessageMedia.fromFilePath(pdfPath);

      await client.sendMessage(`${phoneNumber}@c.us`, imageMedia, {
        caption: message,
      });

      await client.sendMessage(`${phoneNumber}@c.us`, pdfMedia);
    } else if ((imagePath && !pdfPath) || pdfPath == "") {
      // send Only a image with text message
      const imageMedia = MessageMedia.fromFilePath(imagePath);
      await client.sendMessage(`${phoneNumber}@c.us`, imageMedia, {
        caption: message,
      });
    } else if ((pdfPath && !imagePath) || imagePath == "") {
      // send Only a pdf with text message
      const pdfMedia = MessageMedia.fromFilePath(pdfPath);
      await client.sendMessage(`${phoneNumber}@c.us`, pdfMedia, {
        caption: message,
      });
    } else {
      await client.sendMessage(`${phoneNumber}@c.us`, message);
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
  let pagesResponse = null;
  try {
    pagesResponse = await axios.get(
      `https://graph.facebook.com/v20.0/me/accounts`,
      {
        params: {
          access_token: accessToken,
          fields: "id,name,access_token",
        },
      }
    );
  } catch (error) {
    console.log("Error from FB in Page Response",error.response.status)
  }
  console.log(pagesResponse)
  if(pagesResponse == null) return


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
  // todo all lead foreach start here
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

      let defPipe = await pipelineModel.findOne({
        defaultVal: true,
        cid: user.cid,
      });
      let status = null;
      if (defPipe) {
        status = defPipe._id;
      }
      const newLead = new leadsModel({
        lead_id: lead.id,
        income_time: lead.created_time,
        page_id: lead.page_id,
        page_name: lead.page_name,
        form_id: lead.form_id,
        form_name: lead.form_name,
        cid: admin.cid,
        leads_data: leads_datas,
        status,
        app: "facebook",
      });
      await newLead.save();

      const mobileRegex = /^\+?\d{1,3}?[-.\s]?\(?\d+\)?[-.\s]?\d+[-.\s]?\d+$/;
      let leadContactNo = null;
      // newLead.leads_data.forEach((item) => {
      //   const answer = item.ans.trim();

      //   if (mobileRegex.test(answer)) {
      //     console.log("Valid Mobile Number found: try 1", answer);
      //     return (leadContactNo = answer);
      //   }
      // });
      for (let i = 0; i < newLead.leads_data.length; i++) {
        const answer = newLead.leads_data[i].ans.trim();

        if (mobileRegex.test(answer)) {
          console.log("Valid Mobile Number found: try 1", answer);
          leadContactNo = answer;
          break;
        }
      }

      if (leadContactNo == null) {
        const mobileRegex = /^\+?\d{1,3}\d{10}$/;

        for (let i = 0; i < newLead.leads_data.length; i++) {
          const answer = newLead.leads_data[i].ans.trim();

          if (mobileRegex.test(answer)) {
            console.log("Valid Mobile Number found: try 2", answer);
            leadContactNo = answer;
            break;
          }
        }
      }

      if (leadContactNo == null) {
        const mobileRegex = /^\d{10}$/;

        for (let i = 0; i < newLead.leads_data.length; i++) {
          const answer = newLead.leads_data[i].ans.trim();

          if (mobileRegex.test(answer)) {
            console.log("Valid Mobile Number found: try 3", answer);
            leadContactNo = answer;
            break;
          }
        }
      }
      if (leadContactNo !== null) {
        leadContactNo = `${admin.countryCode}${leadContactNo}`;
        console.log("10 dig number found");
      }

      console.warn("new lead found and just store in DB", leadContactNo);
      // leadContactNo = "9755313770";
      // console.warn(leadContactNo)
      const searchStrings = [
        "name",
        "Name",
        "NAME",
        "your name",
        "your_name",
        "Your_Name",
        "Your_name",
        "YOUR_NAME",
        "YOUR NAME",
        "YoyrName",
        "YOURNAME",
        "customerName",
        "CustomerName",
        "customer name",
        "Customer Name",
        "Customer_Name",
        "customer_name",
        "full name",
        "full_name",
        "Full_Name",
        "FullName",
        "FULL_NAME",
        "first name",
        "first_name",
        "First_Name",
        "आपका नाम",
        "आपका_नाम",
        "आपका_नाम:",
        "पूरा नाम",
        "पूरा_नाम",
        "ग्राहक का नाम",
        "ग्राहक_का_नाम",
        "शुभ नाम",
        "शुभ_नाम",
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
      console.warn(
        "we just found lead and store and find costomer name ",
        customerName
      );
      const wellcomeTemp = await templateModel.findOne({
        cid: admin.cid,
        num: 4,
      });

      // todo COUSTOMER Whatsapp Message
      setTimeout(async () => {
        // const lead
        let connStatus;
        try {
          connStatus = await waModel.findOne({ cid: admin.cid });
        } catch (err) {
          console.error("Error fetching connStatus: ", err);
        }

        let imagePath, pdfPath;
        if (wellcomeTemp.image !== "") {
          imagePath = path.join(
            __dirname,
            "../../template/images/uploads/whatsapp/",
            wellcomeTemp.image
          );
        }
        if (wellcomeTemp.pdf !== "") {
          pdfPath = path.join(
            __dirname,
            "../../template/images/uploads/whatsapp/",
            wellcomeTemp.pdf
          );
        }
        console.log("find new lead welcome msg sending on whatsapp ");

        let msg = wellcomeTemp.text;
        let companyName = admin.organizationName || "360FollowUps";

        let personalizedMessage = msg
          .replace("[customer name]", `*${customerName}*`)
          .replace("[company name]", `*${companyName}*`)
          .replace("[company name]", `*${companyName}*`);

        // console.log(
        //   connStatus,
        //   leadContactNo,
        //   personalizedMessage,
        //   imagePath,
        //   pdfPath
        // );
        console.log(
          "Welcome to lead new lead found and send whatsapp msg",
          leadContactNo
        );

        personalizedMessage = capitalizeText(personalizedMessage);

        console.warn(`in timeout`, leadContactNo);
        console.warn(
          `message sending for customer Wellcome template`,
          leadContactNo
        );
        // sendMessageToLead(
        //   connStatus,
        //   leadContactNo,
        //   personalizedMessage,
        //   imagePath,
        //   pdfPath
        // );
      }, 100);

      // todo new lead Whatsapp Message for members and admin
      const notificationTemp = await templateModel.findOne({
        cid: admin.cid,
        num: 3,
      });
      setTimeout(async () => {
        try {
          connStatus = await waModel.findOne({ cid: admin.cid });
        } catch (err) {
          console.error("Error fetching connStatus: ", err);
        }
        let msg = notificationTemp.text;

        let companyName = admin.organizationName || "360FollowUps";
        const today = new Date();

        const day = String(today.getDate()).padStart(2, "0"); // Din (2 digits)
        const month = String(today.getMonth() + 1).padStart(2, "0"); // Month (0-based index, isliye +1)
        const year = today.getFullYear(); // Year

        const formattedDate = `${day}-${month}-${year}`;

        // todo new lead found msg to Admin
        let personalizedMessage = msg
          .replace("[team member name]", `*${admin.name}*`)
          .replace("[customer name]", `*${customerName}*`)
          .replace("[customer contact number]", `*${leadContactNo}*`)
          .replace("[date]", `*${formattedDate}*`)
          .replace("[lead source]", "*facebook*")
          .replace("[company name]", `*${companyName}*`);
        console.log("notificaton to admin new lead found ", admin.mobile);

        personalizedMessage = capitalizeText(personalizedMessage);

        sendMessageToLead(
          connStatus,
          `${admin.countryCode}${admin.mobile}`,
          personalizedMessage
        );

        // todo new lead found msg to all Members
        let users = await memberModel.find({ cid: admin.cid });
        for (let i = 0; i < users.length; i++) {
          setTimeout(() => {
            let personalizedMessage = msg
              .replace("[team member name]", `*${users[i].name}*`)
              .replace("[customer name]", `*${customerName}*`)
              .replace("[customer contact number]", `*${leadContactNo}*`)
              .replace("[date]", `*${formattedDate}*`)
              .replace("[lead source]", "*facebook*")
              .replace("[company name]", `*${companyName}*`);
            console.log(
              "notification to members new lead found",
              users[i].mobile
            );
            personalizedMessage = capitalizeText(personalizedMessage);
            sendMessageToLead(
              connStatus,
              `${users[i].countryCode}${users[i].mobile}`,
              personalizedMessage
            );
          }, 2000);
        }
      }, 2500);

      allNewLeads.push(newLead);
    }
  });

  // todo all lead foreach end here
  return allLeads;
}

function authenticateToken(req, res, next) {
  const token = req.cookies["360Followers"];

  if (!token || token === undefined) {
    return res.redirect("/login");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("token not decoded");

      return res.redirect("/login");
    }

    req.user = decoded;
    // console.log(req.user);
    return next();
  });
}

// module.exports = sendMessageToLead
// function deleteSessionDirectory(userId) {
//   const userSessionPath = path.join(__dirname, "sessions", `session-${userId}`);

//   if (fs.existsSync(userSessionPath)) {
//       fs.rmSync(userSessionPath, { recursive: true, force: true });
//       console.log(`Session directory for user ${userId} deleted.`);
//   } else {
//       console.log(`No session directory found for user ${userId}.`);
//   }
// }

// !  node crone work
cron.schedule('* * * * *', async () => {
  try {
    let allUsers = await logIncollection.find();
    allUsers.forEach(async (user) => {
      console.log("Username:- ", user.name);

      if (user.facebookToken) {
        console.log("User FB token :- ", user.facebookToken);

        await findNewLead(user.facebookToken, user);
      } else console.log("FB token not availiable");

      // await sendMail('websoftvalley@gmail.com',`last crone time ${new Date()}`)
    });

  } catch (err) {
    console.log(err);
  }

});

// todo  to delete un-used whtasapp session file in 5 hours interval using crone

// async function removeSessionDirectoriesTimeToTime() {
//   try {
//     const admins = await logIncollection.find();
//     const waDocuments = await waModel.find();

//     admins.forEach(admin => {
//       const adminCid = admin.cid;
//       let hasMatchingCid = false;

//       waDocuments.forEach(doc => {
//         if (doc.cid === adminCid) {
//           hasMatchingCid = true;
//         }
//       });

//       if (!hasMatchingCid) {
//         const userSessionPath = path.join(__dirname, "sessions", `session-${admin._id}`);

//         if (fs.existsSync(userSessionPath)) {
//           fs.rmSync(userSessionPath, { recursive: true, force: true });
//           console.log(`Session directory for admin ${admin.name} deleted.`);
//         } else {
//           console.log(`No session directory found for admin ${admin._id}.`);
//         }
//       } else {
//         console.log(`Admin ${admin.name} has a matching CID in waModel. No directory removed.`);
//       }
//     });
//   } catch (error) {
//     console.error('Error while removing session directories:', error);
//   }
// }

// cron.schedule('*/2 * * * *', async () => {
//   try {
//     console.warn('try to delete un-used whtasapp session file')
//     await removeSessionDirectoriesTimeToTime();
//     console.warn('try to delete un-used whtasapp session file success next calling 5 hour later')
//   } catch (err) {
//     console.log(err);
//   }
// });
// todo  to delete un-used whtasapp session file in 5 hours interval using crone

// todo remove all whatsapp session files from dir and delete docs from db fun
async function removeSessionDirectoriesOnRestartServer() {
  try {
    console.warn(
      " remove all whatsapp session files from dir and delete docs from db fun"
    );
    const sessionPath = path.join(__dirname, "sessions");
    if (!fs.existsSync(sessionPath)) return;

    // Read each client directory in the sessions folder
    const userIds = fs
      .readdirSync(sessionPath)
      .map((userId) => userId.replace("session-", ""));
    console.log(...userIds);

    userIds.forEach(async (user) => {
      let admin = await logIncollection.findById(user);
      await waModel.findOneAndDelete({ cid: admin.cid });
    });

    userIds.forEach((userid) => {
      const userSessionPath = path.join(
        __dirname,
        "sessions",
        `session-${userid}`
      );
      if (fs.existsSync(userSessionPath)) {
        fs.rmSync(userSessionPath, { recursive: true, force: true });
        console.log(`Session directory for admin ${userid} deleted.`);
      } else {
        console.log(`No session directory found for admin ${userid}.`);
      }
    });
  } catch (error) {
    console.error("Error while removing session directories:", error);
  }
}

removeSessionDirectoriesOnRestartServer();
// todo remove all whatsapp session files from dir and delete docs from db fun

// todo light weight activitys using client
cron.schedule("* * * * *", async () => {
  try {
    const sessionPath = path.join(__dirname, "sessions");
    if (!fs.existsSync(sessionPath)) return;

    // Read each client directory in the sessions folder
    const userIds = fs
      .readdirSync(sessionPath)
      .map((userId) => userId.replace("session-", ""));
    console.log("allusers for start keaap alive functions ", userIds);

    userIds.forEach(async (user_id) => {
      let admin = await logIncollection.findById(user_id);
      let WA = await waModel.findOne({ cid: admin.cid });
      console.log(WA);
      if (WA) {
        console.log("WA is availiable");

        const client = global.clients[user_id].client;
        if (client) {
          console.log("try to start keepAliveFun");
          console.log(global.clients[user_id].IS_CONNECTED);
          startKeepAlive(client);
        } else {
          console.log("client not availiable");

          try {
            removeSession(user_id);
          } catch (error) {
            console.log(
              "error in start keep alive crone function when i remove session folder",
              error
            );
          }
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
});

function setupClientEvents(client, userId) {
  client.on("qr", (qrCode) => {
    console.log(`QR code generated for user ${userId}`);
    // Generate QR code image
    try {
    const qrImage = qr.imageSync(qrCode, { type: "png" });
    let qrCodeData = `data:image/png;base64,${qrImage.toString("base64")}`;
    console.log("qrCodeData genrated here");
    global.clients[userId].QR_CODE_DATA = qrCodeData;
  } catch (error) {
      console.log("error in client.on-QR when qr storing in QR_CODE_DATA ",error)
  }
  });

  client.on("ready", () => {
    console.log(`Client ready for user ${userId}`);
    try {
      
      global.clients[userId].CONNECTED_PHONE = client.info.wid.user;
      global.clients[userId].IS_CONNECTED = true;
    } catch (error) {
      console.log("ERROR in client.on-ready when mobile num and isConnected store in global obj",error)
    }
  });
  
  client.on("auth_failure", (msg) => {
    console.error(`Auth failure for user ${userId}:`, msg);
  });
  try {
    
    client.on("disconnected", (reason) => {
      console.log(`WhatsApp disconnected for user ${userId}:`, reason);
      try {
        if (global.clients[userId]) delete global.clients[userId];
        removeSession(userId);
        
      } catch (error) {
      console.log("ERROR in client.on-disconnected when delete global obj",error)
      
    }
    console.log(`Session cleared for user ${userId}`);
  });

} catch (error) {
    console.log(error)
}
}

// !  node crone work from sir
cron.schedule("* * * * *", async () => {
  try {
    let allUsers = await logIncollection.find();
    allUsers.forEach(async (user) => {
      console.log("Username:- ", user.name);

      if (user.facebookToken) {
        try{
        console.log("User FB token :- ", user.facebookToken);

        await findNewLead(user.facebookToken, user);
        }catch(err){
          console.log("crone find new lead",err);
          
        }
      } else console.log("FB token not availiable");

      // await sendMail('websoftvalley@gmail.com',`last crone time ${new Date()}`)
    });
  } catch (err) {
    console.log(err);
  }
});
