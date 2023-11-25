const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config;

const handleSignin = async (req, res) => {
  const { userName, password } = req.body;
  try {
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
    const token = jwt.sign(
      { id: checkUserName._id, name: checkUserName.name },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    const maxEdge = 24 * 60 * 60;
    res
      .status(201)
      .cookie("token", token, { maxEdge: maxEdge, httpOnly: true })
      .json({ message: "login successfull", success: true });
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

const requireAuth = () => {};

module.exports = { handleSignin, handleSignup };
