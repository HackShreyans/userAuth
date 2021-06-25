const express = require("express");
const userModel = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");

exports.Adduser = async (req, res) => {
  try {
    var password = req.body.password;
    var cpassword = req.body.confirmpassword;

    if (password !== cpassword) {
      return res.send("password not match");
    } else {
      const {
        firstname,
        lastname,
        email,
        gender,
        phone,
        age,
        password,
        confirmpassword
      } = req.body;

      const User = new userModel({
        firstname,
        lastname,
        email,
        gender,
        phone,
        age,
        password,
        confirmpassword
      });

      const token = await User.generateAuthToken();
      console.log(`the token part ${token}`);

      console.log(User);
      await User.save()
        .then(() => {
          return res.status(201).json({
            message: "created...."
          });
        })
        .catch(e => {
          return res.status(400).json({
            mesaage: e
          });
        });
    }
  } catch (error) {
    result: error;
  }
};
exports.loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userMail = await userModel.findOne({ email: email });
    // console.log(userMail);
    const isMatch = await bcrypt.compare(password, userMail.password);
    console.log(` password matched ${isMatch}`);
    const token = await userMail.generateAuthToken();

    console.log(`the token part ${token}`);

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 6000000),
      httpOnly: true
    });

    if (isMatch === true) {
      res.status(201).send(" welcome to the secret page");
    } else {
      res.send("ivalid password details");
    }
  } catch (error) {
    result: error;
  }
};
exports.getUser = async (req, res) => {
  try {
    const userFind = await userModel.find({});
    res.status(200).send(`all users data>>>>>>> ${userFind}`);
  } catch (error) {
    res.status(404).send("user not found!!");
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const userid = mongoose.Types.ObjectId(req.params.id);
    const user = await userModel.findByIdAndDelete({ _id: userid });
    res.status(200).send(`deleted user >>>>>>>>>>>>>${user}`);
  } catch (error) {
    res.status(404).send("not found");
  }
};
exports.updateUser = async (req, res) => {
  try {
    const Userid = new mongoose.Types.ObjectId(req.params.id);
    const {
      firstname,
      lastname,
      email,
      gender,
      phone,
      age,
      password,
      confirmpassword
    } = req.body;
    const user = await userModel.findByIdAndUpdate(
      { _id: Userid },
      {
        firstname,
        lastname,
        email,
        gender,
        phone,
        age,
        password,
        confirmpassword
      }
    );
    res.status(201).send(`this user updated ${user}`);
  } catch (error) {
    res.status(400).send(error);
  }
};
