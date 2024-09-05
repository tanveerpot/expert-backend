const Dealer = require("../models/dealer");
const Admin = require("../models/admin");
const Customer = require("../models/customer");
const auth = require("../firebaseAdmin");
exports.addDealer = async (req, res) => {
  try {
    const exist = await Admin.findOne({ email: "admin@admin.com" });
    console.log(req);
    if (exist) {
      const dealer = new Dealer({
        name: req.body.name,
        email: req.body.email,
        password: "123456",
      });
      console.log("Saving");
      await dealer.save();
      try {
        const userRecord = await auth.createUser({
          name: dealer.name,
          email: dealer.email,
          password: dealer.password,
          emailVerified: false,
          disabled: false,
        });

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
    const dealer = await Dealer.find();
    const names = dealer.map((dealer) => ({
      name: dealer.name,
      email: dealer.email,
    }));

    console.log(names);
    res.json(names);
  } catch (err) {
    res.json(err);
  }
};
exports.updateDealer = async (req, res) => {
  try {
    const email = req.body.email;
    console.log("Email: ", email);
    const result = await Dealer.updateOne(
      { email: email },
      { $set: { name: req.body.newName } }
    );

    if (result.modifiedCount > 0) {
      console.log("Dealer updated successfully");
    } else {
      console.log("No dealer found or no changes made");
    }
    res.json("Updated");
  } catch (error) {
    res.json("Can't Update");
  }
};
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

exports.deleteDealer = async (req, res) => {
  try {
    const email = req.body.email;
    console.log(req);
    console.log("Dealer email:", email);

    await Dealer.deleteOne({ email: email });

    const customers = await Customer.find({ createdBy: email });
    const emails = customers.map((customer) => customer.email);
    emails.push(email);

    const validEmails = emails.filter(isValidEmail);

    if (validEmails.length === 0) {
      return res.json("No valid emails to delete");
    }

    try {
      for (const validEmail of validEmails) {
        try {
          const user = await auth.getUserByEmail(validEmail);
          await auth.deleteUser(user.uid);
          await Customer.deleteOne({ email: validEmail });
          console.log(`Successfully deleted user with email: ${validEmail}`);
        } catch (error) {
          console.log(
            `Error deleting user with email ${validEmail}: ${error.message}`
          );
        }
      }
    } catch (error) {
      console.log(`Error processing users: ${error.message}`);
      return res
        .status(500)
        .json({ message: `Error processing users: ${error.message}` });
    }

    res.json("Deleted");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).json({ message: "Error deleting dealer" });
  }
};
