require('dotenv').config();
const express = require("express");
const router = express.Router();
const { validateRequest, registrationSchema} = require('../middleware/validateData')
const authenticationService = require('../services/authentication');


router.post("/registration", validateRequest(registrationSchema), async (req, res) => {
  const { email, sex, age, password } = req.body
  
  const userData = { email: email, sex: sex, age: age, password: await authenticationService.createPassword(password) }

  if (!await authenticationService.addUser(userData)) {
    res.send("User added!")
  }
  res.send("User with that email is already exist!")
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body
  const token = await authenticationService.loginUser(email, password)

  if (!token) {
    res.send("Wrong email or password!")
  }
  res.send(token)
});

module.exports = router;