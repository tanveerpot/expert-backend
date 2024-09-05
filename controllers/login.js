const auth = require("../firebaseAdmin");
const User = require("../models/user");
exports.login = async (req, res) => {
  try {
    const user = await auth.getUserByEmail(req.body.email);
    const userfind = await User.findOne({ email: req.body.email });
    res.status(200).json({
      message: "User signed in successfully",
      uid: user.uid,
      role: userfind.userType,
    });
  } catch (error) {
    console.error("Error signing in user:", error);
    res.status(500).json({
      error: error.message,
    });
  }
};
exports.findUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const obj = {
      role: user.userType,
      email: user.email,
    };
    res.status(200).json(obj);
  } catch (error) {
    res.json("Error");
  }
};
