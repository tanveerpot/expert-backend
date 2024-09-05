const auth = require("../firebaseAdmin");
exports.validateUser = async (req, res, next) => {
  try {
    const email = req.headers.email;
    const user = await auth.getUserByEmail(email);
    req.email = email;
    next();
  } catch (error) {
    console.error("Error Validating in user:", error);
    res.status(500).json({
      error: error.message,
    });
  }
};
