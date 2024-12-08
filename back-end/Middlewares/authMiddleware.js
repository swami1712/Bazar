const jwt = require("jsonwebtoken");
const User = require("../Models/usersModel");
const response = require("../Utils/response");
require("dotenv").config();

const authenticate = async (req, res, next) => {
  // let token = req.cookies.token;
  let token = req.headers.token;
  if (!token) {
    return response.createError(res, "token not provided");
  } else if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.user = await User.findById(decoded.id);
      next();
    } catch (error) {
      return response.createSuccess(res, "Token verified succesfully");
    }
  } else {
    console.log("Unauthorized token");
  }
};

module.exports = { authenticate };
