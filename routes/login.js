const express = require("express");
const router = express();
const loginApi = require("../controllers/login");
router.post("/", loginApi.login);
router.post("/user", loginApi.findUser);
module.exports = router;
