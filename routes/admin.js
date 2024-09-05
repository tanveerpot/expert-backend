const express = require("express");
const router = express();
const admin = require("../controllers/c_admin");
// FUNCTION TO ADD EMPLOYEE
router.post("/", admin.addAdmin);
// FUNCTION TO VIEW EMPLOYEE
router.get("/", admin.getAdmin);
module.exports = router;
