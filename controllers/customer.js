const User = require("../models/user");
const auth = require("../firebaseAdmin");
exports.addCustomer = async (req, res) => {
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
          userType: "customer",
          uid: userRecord.uid,
          createdBy: req.body.creator,
        });
        await dealer.save();
        res.status(201).json({
          message: "Customer created successfully",
          uid: userRecord.uid,
        });
      } catch (error) {
        console.error("Error in Customer Creation:", error);
        res.status(500).json({
          error: error.message,
        });
      }
    } else {
      res.json("Error In Customer Creation");
    }
  } catch (err) {
    res.json(err);
  }
};

exports.getCustomerofDealer = async (req, res) => {
  try {
    const dealerEmail = req.email;
    const customer = await User.find({
      userType: "customer",
      createdBy: dealerEmail,
    });
    const names = customer.map((dealer) => ({
      name: dealer.name,
      email: dealer.email,
    }));
    res.json(names);
  } catch (err) {
    res.json(err);
  }
};
exports.updateCustomer = async (req, res) => {
  try {
    const email = req.body.oldEmail;
    const validDealer = await User.findOne({ email: email });
    if (validDealer.createdBy === req.email) {
      const result = await User.updateOne(
        { email: email },
        { $set: { name: req.body.newName, email: req.body.email } }
      );
      const findUser = await User.findOne({ email: req.body.email });
      await auth.updateUser(findUser.uid, {
        email: req.body.email,
      });
      if (result.modifiedCount > 0) {
        res.json("Updated");
      } else {
        res.json("Error Update");
      }
    } else {
      res.json("Invalid Dealer");
    }
  } catch (error) {
    res.json("Can't Update");
  }
};
exports.deleteCustomer = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.createdBy === req.email) {
      await User.deleteOne({ email: email });

      try {
        await auth.deleteUser(user.uid);
        return res.json({ message: "Deleted" });
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Error in Deleting Customer from Firebase" });
      }
    } else {
      return res.status(500).json({ message: "Invalid Dealer" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error in Deleting Customer" });
  }
};
