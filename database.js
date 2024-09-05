const mongoose = require("mongoose");
require("dotenv/config");
const dburl = process.env.MONGODB_URI;

//SOME PARAMETERS TO CONNECT TO THE DATABASE

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// Connect To Data Base
mongoose
  .connect(dburl, connectionParams)
  .then(() => {
    console.log("Connected To Database");
  })
  .catch((e) => {
    console.log("Error In Connecting To DataBase: ", e);
  });
