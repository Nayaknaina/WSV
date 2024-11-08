const qr = require("qr-image");
const fs = require("fs");
const path = require("path");
const { Client, LocalAuth } = require("whatsapp-web.js");


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
  async function restoreClients() {
    const sessionPath = path.join(__dirname, "sessions");
    if (!fs.existsSync(sessionPath)) return;
  
    // Read each client directory in the sessions folder
    const userIds = fs
      .readdirSync(sessionPath)
      .map((userId) => userId.replace("session-", ""));
  
    // fs.readdirSync(sessionPath).forEach(async(userId) => {
    //     userId = userId.replace("session-", "");
  
    //     const client = createClientOld(userId);
  
    //     global.clients[userId] = client; // Add client to global.clients
    //     console.log(`Client restored for user ${userId}`);
    // });
    for (const userId of userIds) {
      try {
        // Create and await client to be ready
        const client = await createClientOld(userId); // Wait for client to initialize and be ready
        global.clients[userId] = client; // Storing client in global object
  
        console.warn(`before delay in loop for user ${userId}`);
        await delay(10000);
        console.log(`after delay in loop for user ${userId}`);
        console.log(`Client restored for user ${userId}`);
      } catch (error) {
        console.error(`Failed to restore client for user ${userId}:`, error);
      }
    }
  }
  