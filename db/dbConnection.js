const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/myimageflix";
const databaseConnection = async () => {
  await mongoose
    .connect(URI)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = { databaseConnection };
