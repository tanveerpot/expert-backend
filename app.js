const express = require("express");
const app = express();
require("./database.js");
const auth = require("./firebaseAdmin");
const Dealer = require("./models/dealer");
const Admin = require("./models/admin");
const Customer = require("./models/customer.js");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Replace '*' with your app's domain or whitelist specific domains
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  ); // Include the allowed HTTP methods
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, authtoken"
  ); // Include the allowed headers
  next();
});
const AdminRoute = require("./routes/admin.js");
app.use("/api/admin", AdminRoute);
const DealerRoute = require("./routes/dealer.js");
app.use("/api/dealer", DealerRoute);
const CustomerRoute = require("./routes/customer.js");
app.use("/api/customer", CustomerRoute);
app.post("/api/login", async (req, res) => {
  try {
    // Sign in using Firebase Admin SDK
    const user = await auth.getUserByEmail(req.body.email);

    // For authentication, you need to use Firebase Client SDK on the client-side
    // Here, you'll typically send the ID token from the client for validation
    // Instead, you can verify ID token on the server-side

    res.status(200).json({
      message: "User signed in successfully",
      uid: user.uid,
    });
  } catch (error) {
    console.error("Error signing in user:", error);
    res.status(500).json({
      error: error.message,
    });
  }
});
const start = (async) => {
  try {
    app.listen(PORT, () => {
      console.log(`${PORT} connected`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
