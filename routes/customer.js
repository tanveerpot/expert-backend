const express = require("express");
const router = express();
const customer = require("../controllers/customer");
const { validateUser } = require("../middleware/checkAuth");
router.post("/", validateUser, customer.addCustomer);
router.get("/", validateUser, customer.getCustomerofDealer);
router.put("/update", validateUser, customer.updateCustomer);
router.delete("/delete", validateUser, customer.deleteCustomer);
module.exports = router;
