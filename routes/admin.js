const express = require("express");
const router = express();
const admin = require("../controllers/admin");

router.post("/", admin.addAdmin);
module.exports = router;
