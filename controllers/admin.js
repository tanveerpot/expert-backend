const User = require("../models/user");
const auth = require("../firebaseAdmin");

exports.addAdmin = async (req, res) => {
  try {
    const admin = await User.findOne({ userType: "admin" });
    if (admin) {
      res.json("Admin Already Created");
    }
    const userRecord = await auth.createUser({
      email: "admin@admin.com",
      password: "123456",
      emailVerified: false,
      disabled: false,
    });
    if (userRecord.uid) {
      const admin = await new User({
        name: "admin",
        email: "admin@admin.com",
        password: "123456",
        uid: userRecord.uid,
        userType: "admin",
      });
      try {
        await admin.save();
        res.status(201).json({
          message: "Admin created successfully",
          uid: userRecord.uid,
        });
      } catch (error) {
        res.json({ error: error });
      }
    }
  } catch (error) {
    console.error("Admin Already Exists:", error);
    res.status(500).json({
      error: error.message,
    });
  }
};
