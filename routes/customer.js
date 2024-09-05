const express = require("express");
const router = express();
const customer = require("../controllers/c_customer");
router.post("/", customer.addCustomer);

router.get("/", customer.getCustomer);

router.post("/specific", customer.getCustomerofDealer);
router.put("/update", customer.updateCustomer);
router.delete("/delete", customer.deleteCustomer);
module.exports = router;
