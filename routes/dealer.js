const express = require("express");
const router = express();
const dealer = require("../controllers/c_dealer");

// FUNCTION TO ADD DEALER
router.post("/", dealer.addDealer);
// FUNCTION TO VIEW EMPLOYEE
router.get("/", dealer.getDealer);
router.put("/update", dealer.updateDealer);
router.delete("/delete", dealer.deleteDealer);
module.exports = router;
