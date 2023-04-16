const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    //Because no one can create a user with same username
    username: {
      type: String,
      required: true,
      unique: true,
    },
    //every email should be unique
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
  //timestamps are shortcut to know the created timestamp
);

module.exports = mongoose.model("User", UserSchema);
