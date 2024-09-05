const Dealer = require("../models/dealer");
const Customer = require("../models/customer");
const auth = require("../firebaseAdmin");
exports.addCustomer = async (req, res) => {
  try {
    const exist = await Dealer.findOne({ email: req.body.dealer });
    // console.log(req);
    if (exist) {
      const customer = new Customer({
        name: req.body.name,
        email: req.body.email,
        password: "123456",
        createdBy: exist.email,
      });
      console.log("Saving");
      await customer.save();
      try {
        // Create a new user with email and password
        const userRecord = await auth.createUser({
          name: customer.name,
          email: customer.email,
          password: customer.password,
          createdBy: exist.email,
          emailVerified: false,
          disabled: false,
        });

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
// FUNCTION TO GET CUSTOMER
exports.getCustomer = async (req, res) => {
  try {
    const customer = await Customer.find();
    console.log(customer);
    const names = customer.map((dealer) => dealer.name);

    console.log(names); // Output: ['Dealer1', 'Dealer2']
    res.json(names);
  } catch (err) {
    res.json(err);
  }
};
// FUNCTION TO GET CUSTOMER OF SPECIFIC DEALER
exports.getCustomerofDealer = async (req, res) => {
  try {
    const dealerEmail = req.body.dealer;
    console.log("Email:", dealerEmail);
    // const dealer = await Dealer.findOne({ email: dealerEmail });
    const customer = await Customer.find({ createdBy: dealerEmail });
    const names = customer.map((dealer) => ({
      name: dealer.name,
      email: dealer.email,
    }));

    console.log(names); // Output: ['Dealer1', 'Dealer2']
    res.json(names);
  } catch (err) {
    res.json(err);
  }
};
exports.updateCustomer = async (req, res) => {
  try {
    const email = req.body.email;
    const result = await Customer.updateOne(
      { email: email },
      { $set: { name: req.body.newName } }
    );

    if (result.modifiedCount > 0) {
      console.log("Customer updated successfully");
    } else {
      console.log("No customer found or no changes made");
    }
  } catch (error) {
    res.json("Can't Update");
  }
};
exports.deleteCustomer = async (req, res) => {
  try {
    const email = req.body.email;
    const customer = await Customer.deleteOne({ email: email });
    try {
      const user = await auth.getUserByEmail(email);
      await auth.deleteUser(user.uid);
      console.log(`Successfully deleted user with email: ${email}`);
    } catch (error) {
      console.log(`Error deleting user: ${error}`);
    }
    res.json("Deleted");
  } catch (error) {
    res.json("Error");
  }
};
// FUNCTION TO EDIT CUSTOMER OF SPECIFIC DEALER
// exports.editCustomer = async (req, res) => {
//   try{

//   }
// }
