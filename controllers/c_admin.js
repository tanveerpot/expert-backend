const Admin = require("../models/admin");
const auth = require("../firebaseAdmin");

exports.addAdmin = async (req, res) => {
  try {
    const userRecord = await auth.createUser({
      email: "admin@admin.com",
      password: "123456",
      emailVerified: false,
      disabled: false,
    });

    res.status(201).json({
      message: "Admin created successfully",
      uid: userRecord.uid,
    });
  } catch (error) {
    console.error("Admin Already Exists:", error);
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getAdmin = async (req, res) => {
  try {
    const user = await auth.getUserByEmail("admin@admin.com");

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
};
