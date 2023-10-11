const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

dotenv.config();

const PORT = process.env.PORT || 3001;

const connect = require("./database/mongo.database");

const adminData = require("./routes/admin");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminData.routes);

app.use((req, res, next) => {
  res.status(404).send("<h1>File Not Found</h1>");
});

app.listen(PORT, async () => {
  await connect();
  console.log(`🚀 Server started of port ${PORT}!`);
});

module.exports = app;
