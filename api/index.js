const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { databaseConnection } = require("../db/dbConnection");
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

app.listen(PORT, (success) => {
  if (success) {
    console.log(`Server is running on port ${PORT}`);
  } else {
    console.log("Server is not running");
  }
});
databaseConnection();