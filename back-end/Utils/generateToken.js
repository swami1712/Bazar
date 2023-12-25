const jwt = require("jsonwebtoken");

const generateToken = (res, checkUserName) => {
  const maxAge = 24 * 60 * 60;

  const token = jwt.sign(
    { id: checkUserName._id, name: checkUserName.name },
    process.env.JWT_SECRET,
    {
      expiresIn: maxAge,
    }
  );
  res.cookie("token", token, {
    maxAge: maxAge,
    secure: "development",
    sameSite: "strict",
    httpOnly: true,
  });
  res.json({
    token,
    userId: checkUserName._id,
    name: checkUserName.name,
    userName: checkUserName.userName,
    success: true,
  });
};

module.exports = generateToken;
