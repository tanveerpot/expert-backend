const express = require("express");
const router = express();
const admin = require("../controllers/c_admin");

router.post("/", admin.addAdmin);

router.get("/", admin.getAdmin);
module.exports = router;
