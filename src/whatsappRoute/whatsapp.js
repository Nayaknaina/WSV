const express = require("express");
const router = express.Router();
const cron = require('node-cron');
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
const {
  findMobileNumber,
  capitalizeText,
  checkSubscription,
} = require("../middilware/middilware");
const memberModel = require("../models/member.model");

// const logIncollection = require("../models/admin.model");

global.clients = {};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createClient(userId) {
  const sessionPath = path.join(__dirname, "sessions", `session-${userId}`);
  console.log("try to create client", sessionPath);
  if (fs.existsSync(sessionPath)) {
    fs.rm(sessionPath, { recursive: true, force: true }, (err) => {
      if (err) {
        console.error("Error deleting sessions folder:", err);
        return;
      } else {
        console.log("Sessions folder deleted successfully.");
      }
    });
  }

  return new Client({
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
      clientId: userId, // Each user will have a unique client ID
      dataPath: path.join(__dirname, "sessions"), // Path to store session data
    }),
  });
}

// todo backup
async function createClientOld(userId) {
  console.log("Creating client for user:", userId);

  const client = new Client({
    authStrategy: new LocalAuth({
      clientId: userId, // Unique client ID for each user
      dataPath: path.join(__dirname, "sessions"), // Session data path
    }),
  });

  client.on("ready", () => {
    console.log(`WhatsApp client is ready for user ${userId}`);
  });

  client.on("auth_failure", (msg) => {
    console.error("Authentication failure for user:", userId, msg);
  });

  client.on("disconnected", () => {
    console.log("Client disconnected for user:", userId);
    delete global.clients[userId]; // Cleanup on disconnect
  });
  client.initialize();
  console.log("before delay");

  await delay(10000);
  console.log("afterdelay");
  return client;
}
// Function to restore all clients from session directory on server startup
// todo backup

// async function createClientOld(userId) {
//   console.log("Creating client for user:", userId);

//   const client = new Client({
//     authStrategy: new LocalAuth({
//       clientId: userId, // Unique client ID for each user
//       dataPath: path.join(__dirname, "sessions"), // Session data path
//     }),
//   });

//   client.on("ready", () => {
//     console.log(`WhatsApp client is ready for user ${userId}`);
//   });

//   client.on("auth_failure", (msg) => {
//     console.error("Authentication failure for user:", userId, msg);
//   });

//   client.on("disconnected", () => {
//     console.log("Client disconnected for user:", userId);
//     delete global.clients[userId]; // Cleanup on disconnect
//   });

//   // Initialize the client
//   await client.initialize();

//   return client;
// }

// todo backup
// async function restoreClients() {
//   const sessionPath = path.join(__dirname, "sessions");
//   if (!fs.existsSync(sessionPath)) return;

//   // Read each client directory in the sessions folder
//   const userIds = fs
//     .readdirSync(sessionPath)
//     .map((userId) => userId.replace("session-", ""));

//   // for (const userId of userIds) {
//   //   try {
//   //     // Create and await client to be ready
//   //     const client = await createClientOld(userId); // Wait for client to initialize and be ready
//   //     global.clients[userId] = client; // Storing client in global object

//   //     console.warn(`before delay in loop for user ${userId}`);
//   //     await delay(10000);
//   //     console.log(`after delay in loop for user ${userId}`);
//   //     console.log(`Client restored for user ${userId}`);
//   //   } catch (error) {
//   //     console.error(`Failed to restore client for user ${userId}:`, error);
//   //   }
//   // }

//   const clientPromises = userIds.map(async (userId) => {
//     try {
//       // Create and await client to be ready
//       const client = await createClientOld(userId); // Wait for client to initialize and be ready
//       global.clients[userId] = client; // Storing client in global object
//       console.log(`Client restored for user ${userId}`);
//     } catch (error) {
//       console.error(`Failed to restore client for user ${userId}:`, error);
//     }
//   });

//   // Wait for all clients to initialize
//   await Promise.all(clientPromises); // This ensures that all clients initialize simultaneously
//   console.log("All clients have been restored successfully.");

// }

// todo backup
async function restoreClients() {
  const sessionPath = path.join(__dirname, "sessions");
  if (!fs.existsSync(sessionPath)) return;

  // Read each client directory in the sessions folder
  const userIds = fs
    .readdirSync(sessionPath)
    .map((userId) => userId.replace("session-", ""));

  const clientPromises = userIds.map(async (userId) => {
    try {
      // Create and await client to be ready
      const client = await createClientOld(userId); // Wait for client to initialize and be ready
      global.clients[userId] = client; // Storing client in global object
      console.log(`Client restored for user ${userId}`);
    } catch (error) {
      console.error(`Failed to restore client for user ${userId}:`, error);
    }
  });

  // Wait for all clients to initialize
  await Promise.all(clientPromises); // This ensures that all clients initialize simultaneously
  console.log("All clients have been restored successfully.");
}

// todo Restore clients on server startup
restoreClients();

let connectedPhoneNumber = "";
let connSt = false;

// Endpoint to initialize a WhatsApp session for a user
router.get("/qr", authenticateToken, async (req, res) => {
  const user = await logIncollection.findById(req.user.id);
  const wa = await waModel.findOne({ cid: user.cid });
  console.log(user);
  // Create a new client for the user
  if(wa) return res.render('qr',{qrCodeData: null});
  const client = createClient(user._id.toString());

  client.on("qr", async (qrCode) => {
    console.log("client created");
    console.log(qrCode);

    // Send QR code back to the client as a response
    const qrImage = qr.imageSync(qrCode, { type: "png" });
    let qrCodeData = `data:image/png;base64,${qrImage.toString("base64")}`;
    console.log(qrCodeData);

    res.render("qr", { qrCodeData });
  });

  client.on("ready", async () => {
    console.log(`WhatsApp client is ready for user ${user._id} connSt true`);
    connectedPhoneNumber = client.info.wid.user;
    connSt = true;
    if (connSt) {
      if (!wa) {
        let wa = new waModel({
          whatsappClientReady: true,
          isConnected: true,
          connectedPhoneNumber: connectedPhoneNumber,
          cid: user.cid,
        });
        await wa.save();
        console.log("wa create connSt true");
      }
    }
  });

  client.on("auth_failure", (msg) => {
    console.error("Authentication failure for user:", user._id, msg);
    res.status(500).send("Authentication failed, please try again.");
  });

  client.on("disconnected", () => {
    console.log("Client disconnected for user:", user._id);
    delete global.clients[user._id]; // Session cleanup
  });

  client.initialize();

  // Ensure global.clients exists and store the client for this user
  global.clients = global.clients || {};
  global.clients[user._id.toString()] = client;
});

router.get("/send-message", authenticateToken, async (req, res) => {
  message = `hyy ajay`;
  const user = await logIncollection.findById(req.user.id);
  console.log(user);
  const client = global.clients[user._id.toString()];
  if (client) {
    console.log("client availiable");
  }
  if (!client) return res.status(400).send("User session not initialized");

  try {
    await client.sendMessage(`${916267181871}@c.us`, message);
    console.error("message send on whats num - 916267181871");
    res.redirect("/user/dashboard");
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to send message");
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

  let admin = await logIncollection.findOne({cid:req.user.cid});
  const client = global.clients[admin._id];
  if (client) {
    handleDisconnection(client,admin._id)
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
  // const { user._id } = req.body;
  let userId = req.user.id;
  const client = global.clients[userId];
  if (!client) return res.status(400).send("User session not initialized");
  console.warn("try to go in logout try ", client);

  try {
    await client.logout();
    console.log(userId);
    let delWA = await waModel.findOneAndDelete({ cid: req.user.cid });
    if (delWA) {
      console.warn("user wa deleted");
    }
    if (global.clients[userId]) {
      delete global.clients[userId];
      console.log(`Client removed from global clients: ${userId}`);
      console.log(`remain clients ${global.clients.length}`);
    }

    // Delete the session directory for the user
    const sessionDir = path.join(__dirname, "sessions", `session-${userId}`);
    if (fs.existsSync(sessionDir)) {
      console.log(`try del session file for user: ${userId}`);
      fs.rmSync(sessionDir, { recursive: true, force: true });
      console.log(`Session directory deleted for user: ${userId}`);
    }
    client.on("disconnected", () => {
      console.warn("whatsapp logout in clint on disconnected");
    });

    await delay(10000);
    res.redirect('/user/dashboard')
  } catch (error) {
    res.status(500).send("Failed to logout");
  }
});

router.get("/ready/client/:userId", async (req, res) => {
  try {
    console.warn(`/ready/client/: ${req.params.userId}`);
    const client = await createClientByRoute(req.params.userId); // Wait for client to initialize and be ready
    console.log("/ready/client/ client intialize");

    global.clients[userId] = client;
    res.status(200);
  } catch (err) {
    console.log(err);
  }
});

// router.get("/get/users", async (req, res) => {
//   try {
//     let allUsers = await logIncollection.find();
//     allUsers.forEach(async (user) => {
//       console.log("Username:- ", user.name);

//       if (user.facebookToken) {
//         console.log("User FB token :- ", user.facebookToken);

//         await findNewLead(user.facebookToken, user);
//       } else console.log("FB token not availiable");
//     });
    
//   } catch (err) {
//     console.log(err);
//   }
// });

// module.exports = global;

module.exports = {sendMessageToLead};
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
  const client = global.clients[user._id.toString()];
  if (client) {
    console.log("client availiable");
  }
  if (!client) return res.status(400).send("User session not initialized");

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

// async function tryToReadyAllClients() {
//   let i = 0;
//   const sessionPath = path.join(__dirname, "sessions");
//   if (!fs.existsSync(sessionPath)) return;

//   // Read each client directory in the sessions folder
//   const userIds = fs
//     .readdirSync(sessionPath)
//     .map((userId) => userId.replace("session-", ""));

//   // for (const userId of userIds) {
//   //   try {
//   //     // Create and await client to be ready
//   //     const client = await createClientOld(userId); // Wait for client to initialize and be ready
//   //     global.clients[userId] = client; // Storing client in global object

//   //     console.warn(`before delay in loop for user ${userId}`);
//   //     await delay(10000);
//   //     console.log(`after delay in loop for user ${userId}`);
//   //     console.log(`Client restored for user ${userId}`);
//   //   } catch (error) {
//   //     console.error(`Failed to restore client for user ${userId}:`, error);
//   //   }
//   // }
//   console.log(userIds.length)
//   for (let id = 0; id < userIds.length; id++) {
//     try {
//       console.warn(id,userIds[id])
//       let res = await axios.get(
//         `http://localhost:8000/ready/client/${userIds[id]}`
//       );
//       console.warn(res)
//     } catch (err) {
//       console.log(err.message);
//     }
//     console.log(id)
//   }
// }

// tryToReadyAllClients();

async function createClientByRoute(userId) {
  const client = new Client({
    authStrategy: new LocalAuth({
      clientId: userId,
      dataPath: path.join(__dirname, "sessions"),
    }),
  });

  // Return a promise that resolves when the client is ready
  return new Promise(async (resolve, reject) => {
    client.on("ready", () => {
      console.log(`WhatsApp client is ready for user ${userId}`);
      resolve(client); // Resolve the promise with the client instance
    });

    client.on("auth_failure", (msg) => {
      console.error("Authentication failure for user:", userId, msg);
      reject(new Error("Authentication failure")); // Reject the promise on auth failure
    });

    client.on("disconnected", () => {
      console.log("Client disconnected for user:", userId);
      delete global.clients[userId];
    });

    // Initialize the client
    client.initialize().catch((err) => {
      reject(err); // Reject if there's an error initializing
    });

    await delay(40000);
    return reject(new Error("client not initialize"));
  });
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

      let defPipe = await pipelineModel.findOne({ num: 1, cid: user.cid });
      const newLead = new leadsModel({
        lead_id: lead.id,
        income_time: lead.created_time,
        page_id: lead.page_id,
        page_name: lead.page_name,
        form_id: lead.form_id,
        form_name: lead.form_name,
        cid: admin.cid,
        leads_data: leads_datas,
        status: defPipe._id,
        app: "facebook",
      });
      await newLead.save();

      const mobileRegex = /^\+?\d{1,3}?[-.\s]?\(?\d+\)?[-.\s]?\d+[-.\s]?\d+$/  ;
      let leadContactNo =null;
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
      
    
      if (leadContactNo==null) {
        const mobileRegex = /^\+?\d{1,3}\d{10}$/  ;
    
        for (let i = 0; i < newLead.leads_data.length; i++) {
          const answer = newLead.leads_data[i].ans.trim();
        
          if (mobileRegex.test(answer)) {
            console.log("Valid Mobile Number found: try 2", answer);
            leadContactNo = answer;
            break; 
          }
        }
      }
    
      if (leadContactNo==null) {
        const mobileRegex = /^\d{10}$/  ;
    
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
        leadContactNo = `${admin.countryCode}${leadContactNo}`
        console.log("10 dig number found");
        
      }

      console.warn("new lead found and just store in DB",leadContactNo);
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
console.warn("we just found lead and store and find costomer name ",customerName )
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
      console.log("Welcome to lead new lead found and send whatsapp msg", leadContactNo);

      personalizedMessage = capitalizeText(personalizedMessage);

      console.warn(`in timeout`, leadContactNo);

      sendMessageToLead(
        connStatus,
        leadContactNo,
        personalizedMessage,
        imagePath,
        pdfPath
      );
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


// function findLeadsForEveryUsers() {
//   let i = 0;

//   setInterval(async () => {
//     let res = await axios.get("https://360followups.com/get/users");
//     console.log(res);
//     console.log(i);
//   }, 60000);
// }

async function handleDisconnection(client, userId) {
  client.on('disconnected', async (reason) => {
      console.log(`User ${userId} has been disconnected: ${reason}`);

      // Perform cleanup tasks:
      // todo 1. Update the user status in the database to reflect the disconnected status
      try {
        await waModel.findOneAndDelete({cid:userId})
      } catch (err) {
        console.error(err)
      }
      // todo 2. Remove the client instance from memory
      if (global.clients && global.clients[userId]) {
        delete global.clients[userId];
      }
      // todo 3. trying Remove the client session from memory
      deleteSessionDirectory(userId)
      // Optional: Notify the user via email, SMS, or other means
      // notifyUser(userId, "Your WhatsApp session has been disconnected.");
  });
}


// findLeadsForEveryUsers();

// module.exports = sendMessageToLead
function deleteSessionDirectory(userId) {
  const userSessionPath = path.join(__dirname, "sessions", `session-${userId}`);
  
  if (fs.existsSync(userSessionPath)) {
      fs.rmSync(userSessionPath, { recursive: true, force: true });
      console.log(`Session directory for user ${userId} deleted.`);
  } else {
      console.log(`No session directory found for user ${userId}.`);
  }
}



// ! sir node crone work 
cron.schedule('* * * * *', async () => {
  try {
    let allUsers = await logIncollection.find();
    allUsers.forEach(async (user) => {
      console.log("Username:- ", user.name);

      if (user.facebookToken) {
        console.log("User FB token :- ", user.facebookToken);
        
        await findNewLead(user.facebookToken, user);
      } else console.log("FB token not availiable");
    });
    
  } catch (err) {
    console.log(err);
  }
});

// cron.schedule('* * * * *', async () => {
//   try {
//     const response = await axios.get("https://360followups.com/get/users");
//     console.log(response.data);
//   } catch (error) {
//     console.error('Error fetching data', error);
//   }
// });