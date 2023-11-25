const express = require("express");
const { handleSignin, handleSignup } = require("../Controllers/user");

const router = express.Router();

router.post("/signup", handleSignup);

router.post("/signIn", handleSignin);

module.exports = router;
