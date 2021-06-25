const jwt = require("jsonwebtoken");

const userModel = require("../Middleware/Auth");

const Auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    console.log(verifyUser);
    next();
    res.status(200).send("welcome ");
  } catch (error) {
    res.status(401).send("user not Authenticate");
  }
};

module.exports = Auth;
