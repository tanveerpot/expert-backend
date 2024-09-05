// // FUNCTION TO ADD EMPLOYEE
// router.post("/", admin.addAdmin);
// // FUNCTION TO VIEW EMPLOYEE
// router.get("/", admin.getAdmin);

const Admin = require("../models/admin");
const auth = require("../firebaseAdmin");
// FUNCTION TO ADD EMPLOYEE
exports.addAdmin = async (req, res) => {
  // try {
  //   const adminExist = await Admin.findOne({ email: "admin@admin.com" });
  //   if (adminExist) {
  //     res.json("Admin Already Created");
  //   } else {
  //     const admin = new Admin({
  //       email: "admin@admin.com",
  //       password: "12345",
  //     });
  //     await admin.save();

  //     // res.json("Admin Created Successfully");
  //   }
  // } catch (err) {
  //   res.json(err);
  // }
  try {
    // Create a new user with email and password
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
// FUNCTION TO GET EMPLOYEE
exports.getAdmin = async (req, res) => {
  try {
    // Sign in using Firebase Admin SDK
    const user = await auth.getUserByEmail("admin@admin.com");

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
  // try {
  //   const admin = await Admin.find();
  //   res.json(admin);
  // } catch (err) {
  //   res.json("Admin not created");
  // }
};
