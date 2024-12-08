const User = require("../Models/usersModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = require("../Utils/generateToken.js");
const response = require("../Utils/response.js");
require("dotenv").config;

const handleSignin = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return response.createError(res, "All fields are required");
  }
  const checkUserName = await User.findOne({ userName });
  if (!checkUserName) {
    return response.createError(res, "Invalid Credentials");
  }
  try {
    const passwordValidity = await bcrypt.compare(
      password,
      checkUserName.password
    );
    if (!passwordValidity) {
      return response.createError(res, "Invalid Credentials");
    }
    generateToken(res, checkUserName);
  } catch (error) {
    console.error(error);
    return response.createError(res, "Error signing in");
  }
};

const handleSignup = async (req, res) => {
  const { name, userName, password } = req.body;

  const existingUser = await User.findOne({ userName });

  if (existingUser) {
    return response.createError(res, "User already exists");
  }
  if (!name || !userName || !password) {
    return response.createError(res, "Kindly, Enter all details");
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

        return response.createSuccess(res, "Registration successful...");
      });
    });
  } catch (error) {
    return response.createError(res, "Error registering user...");
  }
};

const userprofile = async (req, res) => {
  try {
    const userId = req.params.id;
    const userDetails = await User.findById(userId);
    response.createSuccess(
      res,
      "User profile fetched succesfully",
      userDetails
    );
  } catch (error) {
    console.log("could not fetch user details due to an error " + error);
  }
};

module.exports = { handleSignin, handleSignup, userprofile };
