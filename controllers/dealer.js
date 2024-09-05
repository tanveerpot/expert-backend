const User = require("../models/user");
const auth = require("../firebaseAdmin");
exports.addDealer = async (req, res) => {
  try {
    const exist = await User.findOne({ email: req.body.creator });
    if (exist) {
      try {
        const userRecord = await auth.createUser({
          name: req.body.name,
          email: req.body.email,
          password: "123456",
          emailVerified: false,
          disabled: false,
        });
        const dealer = new User({
          name: req.body.name,
          email: req.body.email,
          password: "123456",
          userType: "dealer",
          uid: userRecord.uid,
        });
        await dealer.save();
        res.status(201).json({
          message: "Dealer created successfully",
          uid: userRecord.uid,
        });
      } catch (error) {
        console.error("Error in Dealer Creation:", error);
        res.status(500).json({
          error: error.message,
        });
      }
    } else {
      res.json("Error In Dealer Creation");
    }
  } catch (err) {
    res.json(err);
  }
};

exports.getDealer = async (req, res) => {
  try {
    const dealer = await User.find({ userType: "dealer" });
    const names = dealer.map((dealer) => ({
      name: dealer.name,
      email: dealer.email,
    }));
    res.json(names);
  } catch (err) {
    res.json(err);
  }
};
exports.updateDealer = async (req, res) => {
  try {
    const email = req.body.oldEmail;
    const findUser = await User.findOne({ email: email });
    const result = await User.updateOne(
      { email: email },
      { $set: { name: req.body.newName, email: req.body.email } }
    );
    await auth.updateUser(findUser.uid, {
      email: req.body.email,
    });
    if (result.modifiedCount > 0) {
      res.json("Updated");
    } else {
      res.json("Nothing to Update");
    }
  } catch (error) {
    res.json("Can't Update");
  }
};

exports.deleteDealer = async (req, res) => {
  try {
    const email = req.body.email;
    const customers = await User.find({ createdBy: email });
    const emails = customers.map((customer) => customer.email);
    emails.push(email);
    for (const validEmail of emails) {
      const user = await User.findOne({ email: validEmail });
      await auth.deleteUser(user.uid);
      await User.deleteOne({ email: validEmail });
    }
    return res.status(200).json({ message: "Deleted dealer" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting dealer" });
  }
};
