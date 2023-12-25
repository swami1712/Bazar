const User = require("../Models/usersModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = require("../Utils/generateToken.js");
require("dotenv").config;

const handleSignin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.json({ message: "All fields are required" });
    }
    const checkUserName = await User.findOne({ userName });
    if (!checkUserName) {
      return res.json({ message: "Invalid Credentials", success: false });
    }

    const passwordValidity = await bcrypt.compare(
      password,
      checkUserName.password
    );
    if (!passwordValidity) {
      return res.json({ message: "Invalid Credentials", success: false });
    }
    generateToken(res, checkUserName);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const handleSignup = async (req, res) => {
  const { name, userName, password } = req.body;

  const existingUser = await User.findOne({ userName });

  if (existingUser) {
    return res.json({ message: "user already exists", success: false });
  }
  if (!name || !userName || !password) {
    return res.json({ message: "Enter all details", success: false });
  }

  try {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        const user = new User({
          name,
          userName,
          password: hash,
        });
        await user.save();

        res
          .status(201)
          .json({ message: "registration successful", success: true });
      });
    });
  } catch (error) {
    res.status(401).json({ error: "could not register user" });
  }
};

const userprofile = async (req, res) => {
  try {
    const userId = req.params.id;
    const userDetails = await User.findById(userId);
    res.status(201).json({ success: true, data: userDetails });
  } catch (error) {
    console.log("could not fetch user details due to an error " + error);
  }
};

module.exports = { handleSignin, handleSignup, userprofile };
