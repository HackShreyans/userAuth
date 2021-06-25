const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

require("dotenv").config();

const app = express();
app.use(cookieParser());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("get the api");
});
mongoose
  .connect(process.env.urlmngo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("connected with db"))
  .catch(e => console.log("Error in db connect", e));
app.use(require("./Views/userRoute"));

//listen post

app.listen(process.env.PORT, () => {
  console.log(`app is listening port: http://localhost:${process.env.PORT}`);
});
