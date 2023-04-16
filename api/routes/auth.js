//Router method is used for routing
const router = require("express").Router();
const User = require("../models/User");
//bcrypt is used to encrypt the data, here we are using it to encrypt password
const bcrypt = require("bcrypt");


//REGISTER 
//for creating we use post
//for updating existing model we use PUT
// This processes take time, so we use async
router.post("/register", async (req, res) => {
    //Here try catch block is always use bcz these process can fail
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    
    //here save method is for mongoose to save data to mongodb
    const user = await newUser.save();
    //status 200 for succesful creation of user and .json for converting current data to json file
    res.status(200).json(user);
  } catch (err) {
    //err something wrong with mongodb
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    //findone : bcz user is unique
    const user = await User.findOne({ username: req.body.username });
    //if no user, then responnse 400 as wrong credentials
    !user && res.status(400).json("Wrong credentials!");
     //if there is user, then its password wil be validated by automatically converting bcypt to convert encrypted file using compare method
    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong credentials!");
//user._doc using this, the password from the users doc was given different values
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
