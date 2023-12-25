const express = require("express");
const {
  handleSignin,
  handleSignup,
  userprofile,
} = require("../Controllers/user");
const { authenticate } = require("../Middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", handleSignup);

router.post("/signIn", handleSignin);

router.get("/profile/:id", authenticate, userprofile);

module.exports = router;
