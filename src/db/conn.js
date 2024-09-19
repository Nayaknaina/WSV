const mongoose = require("mongoose");
// const mongoUri = "mongodb+srv://nainanayak288:Dkccg5NaZMANqu7F@wsvconnect.bpxfx.mongodb.net/";
const mongoUri = `mongodb+srv://nainanayak288:01QKzxY3dSOcP1nN@wsvconnect.bpxfx.mongodb.net/`
// const mongoUri = "mongodb://localhost:27017/WSV";

mongoose.connect(mongoUri, {
  connectTimeoutMS: 30000
}).then(() => {
  console.log(`Connection Successful:)`);
}).catch((e) => {
  console.log(`No connection`);
});

