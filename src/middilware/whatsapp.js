
// Keep-Alive Ping Function with Random Activity
 function startKeepAlive(client) {
  console.log("Starting keep-alive mechanism...");

  const activities = [
    async () => {
      const contacts = await client.getContacts();
      console.log("Keep-alive ping: Fetched contacts -", contacts.length);
    },

    async () => {
      const status = await client.getState();
      console.log("Keep-alive ping: WhatsApp state -", status);
    },
    // async () => {
    //   const selfNumber = client.info.wid._serialized;
    //   await client.sendMessage(selfNumber, "Ping to keep session alive!");
    //   console.log("Keep-alive ping: Sent ping message to self.");
    // },
    async () => {
      const chats = await client.getChats();
      console.log("Keep-alive ping: Fetched chat list -", chats.length);
    },
    async () => {
      const groups = await client
        .getChats()
        .then((chats) => chats.filter((chat) => chat.isGroup));
      console.log("Keep-alive ping: Fetched groups -", groups.length);
    },
  ];

  // Perform a random action every 1 minute
  setInterval(async () => {
    try {
      // Select a random activity from the list
      if (client.pupPage && client.pupPage.isClosed()) {
        console.log("Puppeteer session is closed. Trying to reconnect...");
        await client.initialize();
      } else {
        const randomActivity =
          activities[Math.floor(Math.random() * activities.length)];

        // Execute the selected activity
        await randomActivity();
      }
    } catch (error) {
      console.error("Error in keep-alive ping:", error);
    }
  }, 60000); // 1 minute interval
}



module.exports = {
  startKeepAlive,
 
};
