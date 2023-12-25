const jwt = require("jsonwebtoken");
const User = require("../Models/usersModel");
require("dotenv").config();

const authenticate = async (req, res, next) => {
  // let token = req.cookies.token;
  let header = req.headers.authorization;
  let token = header.slice(7);
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "authorization failed", success: false });
    }
  } else {
    console.log("Unauthorized token");
  }
};

module.exports = { authenticate };
