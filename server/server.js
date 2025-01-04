const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDB = require("./config/database");
// const cors = require("cors");

process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");
});

dotenv.config({ path: "server/config/config.env" });
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`server connected to PORT ${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.stack}`);
  console.log("Shutting down the server due to unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
