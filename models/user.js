const mongoose = require("mongoose");
const UserSchemea = mongoose.Schema({
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
  uid: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: false,
  },
  userType: {
    type: String,
    enum: ["admin", "dealer", "customer"],
  },
});

module.exports = mongoose.model("User", UserSchemea);
