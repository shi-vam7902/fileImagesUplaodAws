const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const cors = require("cors");
app.use(cors());
const dotenv = require("dotenv");
dotenv.config();
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));
// app.use(express.static("uploads"));

const { databaseConnection } = require("../db/dbConnection");
const fileImageRoutes = require("../routes/fileImageUploadROutes");
const PORT = process.env.PORT || 3001;

app.use("/imagefiles", fileImageRoutes);

app.use("/", (req, res) => {
  res.send(`
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #282c34; color: white; font-family: Arial, sans-serif; font-size: 24px;">
      Welcome to Imageflix
    </div>
  `);
});

app.listen(3001, (error) => {
  if (error) {
    console.log(`Server is not running ${error}`);
  } else {
    console.log(`Server Running On ${PORT}`);
  }
});
databaseConnection();
