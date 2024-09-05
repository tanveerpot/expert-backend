const mongoose = require("mongoose");
require("dotenv/config");
const dburl = process.env.MONGODB_URI;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(dburl, connectionParams)
  .then(() => {
    console.log("Connected To Database");
  })
  .catch((e) => {
    console.log("Error In Connecting To DataBase: ", e);
  });
