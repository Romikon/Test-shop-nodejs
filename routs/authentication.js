require('dotenv').config();
const express = require("express");
const router = express.Router();
const userService = require('../services/authentication');

function dataValidation(values) {
  if (typeof (values.email) !== "string") {
    console.log("Invalid email!");
    return false;
  }
  else if (typeof (values.sex) !== "string") {
    console.log("Invalid sex!");
    return false;
  }
  else if (typeof (values.age) !== "number") {
    console.log("Invalid role!");
    return false;
  }
  else if (typeof (values.password) !== "string") {
    console.log("Invalid password!");
    return false;
  }
  else {
    return true;
  }
}

router.post("/registration", async (req, res) => {
  const { email, sex, age, password } = req.body

  
  const userData = { email: email, sex: sex, age: age, password: await userService.createPassword(password) }

  if (!dataValidation(userData)) {
    res.send("Invalid data types!")
  }

  const inBase = await userService.addUser(userData)
  if (inBase) {
    res.send("User with that email is already exist!")
  }
  else {
    res.send("User added!")
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body
  const token = await userService.loginUser(email, password)
  //console.log(token)

  if (!token) {
    res.send("Wrong email or password!")
  }
  res.send(token)
});

module.exports = router;