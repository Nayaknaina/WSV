const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cron = require("node-cron");
// const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qr = require("qr-image");
const fs = require("fs");
const path = require("path");
// const { MongoStore } = require("wwebjs-mongo");
const logIncollection = require("../models/admin.model");
const waModel = require("../models/wA.model");
const jwt = require("jsonwebtoken");
const { default: axios } = require("axios");
const leadsModel = require("../models/leads.model");
const pipelineModel = require("../models/pipeline.model");
const remarkModel = require("../models/remark.model");
const templateModel = require("../models/temlate.model");
const memberModel = require("../models/member.model");

const {
  findMobileNumber,
  capitalizeText,
  checkSubscription,
  isAdminLoggedIn,
} = require("../middilware/middilware");

global.sessions = {};
// const logIncollection = require("../models/admin.model");
// const JWT_SECRET = "your_secret_key";

router.get("/connection-status", authenticateToken, async (req, res) => {
  console.warn("in /connection-status");

  try {
    if (global.sessions[req.user.id]) {
      return res.json({ isConnected: true });
    } else return res.json({ isConnected: false });
  } catch (error) {
    console.log(error);
  }
});

router.get("/scan", authenticateToken, async (req, res) => {
  console.warn("render qr page only with qr null");
  res.render("qr", { qrCodeData: null });
});

router.get("/check", authenticateToken, async (req, res) => {
  // res.render("qr", { qrCodeData: null });
  //   let userId = req.user.id;
  try {
    if (global.sessions[req.user.id]) {
      res.status(200).json({ msg: "connected" });
    } else {
      res.status(200).json({ msg: "not-connected" });
    }
  } catch (error) {}
});

router.get("/qr", authenticateToken, async (req, res) => {
  console.log("req to QR in /qr ");

  try {
    // const user = await logIncollection.findById();
    let userId = req.user.id;
    //   const wa = await waModel.findOne({ cid: userId });

    try {
      // Create a new WhatsApp client with RemoteAuth and MongoStore
      const client = new Client({
        authStrategy: new LocalAuth({
          clientId: userId, // Unique identifier for the client
          dataPath: "./sessions",
          backupSyncIntervalMs: 60000,
        }),
      });

      client.on("qr", (qrCode) => {
        console.log(`QR Code for user ${userId}:`, qr);
        const qrImage = qr.imageSync(qrCode, { type: "png" });
        let qrCodeData = `data:image/png;base64,${qrImage.toString("base64")}`;
        console.log("qrCodeData genrated here");
        console.log(qrCodeData);
        global.sessions[userId] = {
          IS_CONNECTED: false,
          CONNECTED_PHONE: null,
          QR_CODE_DATA: qrCodeData,
          client: client,
        };
      });

      client.on("ready", () => {
        console.log(`Client for user ${userId} is ready`);
        READY = true;
        global.sessions[userId].IS_CONNECTED = true;
        global.sessions[userId].IS_CONNECTED = client.info.wid.user;
      });

      client.on("auth_failure", (msg) => {
        console.error(`Authentication failed for user ${userId}:`, msg);
        if (global.sessions[userId]) {
          delete global.sessions[userId];
        }
      });

      client.on("authenticated", (sessionData) => {
        console.log(`Authenticated for user ${userId}`);
      });

      client.on("disconnected", async (reason) => {
        try {
          console.warn(
            `Client disconnected for user ${userId}. Reason: ${reason}`
          );

          if (global.sessions[userId]) {
            delete global.sessions[userId];
          }

          // Logout and clean up session
          if (reason === "LOGOUT") {
            const sessionPath = `C:\\Users\\karan\\Downloads\\WSV-main\\WSV-main\\sessions\\session-${userId}`;
            try {
              // Perform cleanup manually
              await fs.promises.rm(sessionPath, {
                recursive: true,
                force: true,
              });
              console.log(`Session files for ${userId} deleted successfully.`);
            } catch (cleanupError) {
              console.error(
                `Failed to delete session files for ${userId}: ${cleanupError.message}`
              );
            }
          }
        } catch (error) {
          console.error(`Error handling disconnect for user ${userId}:`, error);
        }
      });

      if (global.sessions[userId]) {
        await global.sessions[userId].client.initialize();
      }
      await client.initialize();
      return res.json({ msg: "ok" });
    } catch (error) {
      console.error(`Error initializing client for user ${userId}:`, error);
      throw error;
    }
    return res.json({ msg: "ok" });
    // Ensure global.clients exists and store the client for this user
  } catch (error) {
    console.log(error);
  }
});

router.get("/again", authenticateToken, async (req, res) => {
  console.warn("req for QR in /again in time interval");
  let userId = req.user.id;
  try {
    if (global.sessions[userId]) {
      return res.json({ qrCodeData: global.sessions[userId].QR_CODE_DATA });
    }

    res.json({ qrCodeData: null });
  } catch (err) {
    console.log(
      "error in /again when check the value of QR_CODE_DATA in global obj"
    );
    console.log(err);
  }
});

router.get("/ready", authenticateToken, async (req, res) => {
  console.warn("try to ready client when scan qr");
  //   let wa = await waModel.findOne({ cid: req.user.id });
  try {
    if (global.sessions[req.user.id]) {
      console.warn("is connected true send whatsapp connected ");

      return res.json({
        isConnected: global.sessions[req.user.id].IS_CONNECTED,
      });
    } else {
      console.warn("is connected false send whatsapp not connected ");
      return res.json({ isConnected: false });
    }
  } catch (err) {
    console.log("error in /ready", err);
  }
});

router.get("/send-message", authenticateToken, async (req, res) => {
  try {
    try {
      await global.sessions[req.user.id].client.sendMessage(
        `${919755313770}@c.us`,
        "message"
      );
      console.error("message send on whats num - 919755313770");
      res.redirect("/user/dashboard");
    } catch (error) {
      console.log(error);
    }
    res.redirect("/user/dashboard");
  } catch (error) {}
});

router.get("/logoutWA", authenticateToken, async (req, res) => {
  let clientId = req.user.id;
  try {
    if (global.sessions[clientId]) {
      await global.sessions[clientId].client.logout();
      delete global.sessions[clientId];
      res.json({ msg: "Logout success" });
    } else {
      res.status(403).json({ msg: "Logout failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({ msg: "Logout failed" });
  }
});

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

module.exports = { sendMessageToLead };
module.exports = router;

async function restoreClients() {
  console.log("Restore Fun");
  const sessionPath = path.join(__dirname, "../../sessions");
  if (!fs.existsSync(sessionPath)) return;

  // Read each client directory in the sessions folder
  const userIds = fs
    .readdirSync(sessionPath)
    .map((userId) => userId.replace("session-", ""));

  const clientPromises = userIds.map(async (userId) => {
    console.log("Restore Fun in loop");
    try {
      // Create and await client to be ready
      // const client = await initializeClient(userId); // Wait for client to initialize and be ready
      if (!global.sessions[userId]) {
        global.sessions[userId] = {
          IS_CONNECTED: false,
          CONNECTED_PHONE: null,
          QR_CODE_DATA: null,
          client: null,
        };
        try {
          //   console.log("Restore Fun2");
          global.sessions[userId].client = new Client({
            authStrategy: new LocalAuth({
              clientId: userId, // Unique identifier for the client
              dataPath: "./sessions",
              backupSyncIntervalMs: 60000,
            }),
          });

          // console.log("Restore Fun3");
          global.sessions[userId].client.initialize();
          await new Promise((resolve) => {
            global.sessions[userId].client.on("ready", async () => {
              global.sessions[userId].IS_CONNECTED = true;
              global.sessions[userId].CONNECTED_PHONE =
                global.sessions[userId].client.info.wid.user;
              console.error("user ready for sending msg", userId);
              resolve();
            });
          });
          // console.log("Restore Fun5");
        } catch (error) {
          console.log("RRRRRestore", error);
        }
      }
      // global.clients[userId] = client; // Storing client in global object
      console.log(`Client restored for user ${userId}`);
    } catch (error) {
      console.error(`Failed to restore client for user ${userId}:`, error);
    }
  });

  // Wait for all clients to initialize
  await Promise.all(clientPromises); // This ensures that all clients initialize simultaneously
  console.log("All clients have been restored successfully.");
}

// Restore clients on server startup
restoreClients();

async function sendMessageToLead(
  admin,
  phoneNumber,
  message,
  imagePath = null,
  pdfPath = null
) {
  console.log("Phone number", phoneNumber);

  const user = await logIncollection.findOne({ cid: admin.cid });
  console.log(user);
  let client;
  if (global.sessions[user._id.toString()]) {
    client = global.sessions[user._id.toString()].client;
    //   await client.initialize()
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

setInterval(async () => {
  try {
    restoreClients();
  } catch (err) {
    console.log(err);
  }
}, 60000 * 3);

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
    console.log("Error from FB in Page Response", error.response.status);
  }
  console.log(pagesResponse);
  if (pagesResponse == null) return;

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
        //   admin,
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
          admin,
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
              admin,
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
