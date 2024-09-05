const mongoose = require("mongoose");
const DealerSchemea = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isLogedIn: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Dealer", DealerSchemea);
