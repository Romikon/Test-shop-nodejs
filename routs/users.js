require('dotenv').config();
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const userService = require('../servises/users');

router.post("/registration", async (req, res) => {
  const { email, sex, age, password } = req.body

  const hashPass = bcrypt.hashSync(password, 7)
  const userData = { email: email, sex: sex, age: age, password: hashPass }

  const inBase = await userService.addUser(userData)
  console.log(inBase)
  if (inBase) {
    res.send("User with that email is already exist!")
  }
  else {
    res.send("User added!")
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body
  const user = { email: email, password: password }

  const token = await userService.loginUser(user)
  console.log(token)

  if (!token) {
    res.send("Wrong email or password!")
  }
  res.send(token)
});

module.exports = router;