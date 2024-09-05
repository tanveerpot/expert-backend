const express = require("express");
const app = express();
require("./database.js");
const bodyParser = require("body-parser");
const ApiRoutes = require("./routes/index.js");
const cors = require("cors");
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, authtoken"
  );
  next();
});
app.use("/api", ApiRoutes);
const start = () => {
  try {
    app.listen(PORT, () => {
      console.log(`${PORT} connected`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
