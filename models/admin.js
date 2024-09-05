const mongoose = require("mongoose");
const AdminSchemea = mongoose.Schema({
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

module.exports = mongoose.model("Admin", AdminSchemea);
