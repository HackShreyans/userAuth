const { Router } = require("express");
const express = require("express");
const {
  Adduser,
  loginUser,
  getUser,
  deleteUser,
  updateUser
} = require("../Controllers/userController");
const Auth = require("../Middleware/Auth");

const route = express.Router();

route.post("/user", Adduser);

//for getting the token  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
route.post("/api/login", loginUser);

// after got token you should need to verify token >>>>>>>>>>>>>>>>>>>>>>>>>>>>
route.post("/login", Auth, loginUser);

route.get("/getUser", Auth, getUser);

route.delete("/delete/:id", Auth, deleteUser);

route.put("/update/:id", Auth, updateUser);
module.exports = route;
