const admin = require("firebase-admin");
const serviceAccount = require("./expert-6c256-firebase-adminsdk-2dnng-b10b61e685.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();
module.exports = auth;
