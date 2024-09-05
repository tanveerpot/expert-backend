const express = require("express");
const router = express();
const dealer = require("../controllers/c_dealer");

router.post("/", dealer.addDealer);

router.get("/", dealer.getDealer);
router.put("/update", dealer.updateDealer);
router.delete("/delete", dealer.deleteDealer);
module.exports = router;
