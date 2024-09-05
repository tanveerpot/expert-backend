const express = require("express");
const router = express();
const dealer = require("../controllers/dealer");
const { validateUser } = require("../middleware/checkAuth");
router.post("/", validateUser, dealer.addDealer);
router.get("/", validateUser, dealer.getDealer);
router.put("/update", validateUser, dealer.updateDealer);
router.delete("/delete", validateUser, dealer.deleteDealer);
module.exports = router;
