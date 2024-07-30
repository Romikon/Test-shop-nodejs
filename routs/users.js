require('dotenv').config();
const express = require("express");
const router = express.Router();
const validateData = require('../middleware/validateData')
const userService = require('../services/users.js');

router.get("/", async (req, res) => {
    if (await req.user.role !== "admin") {
        res.send("You are not admin!")
    }

    const allUsers = await userService.getAllUsers()
    if (!allUsers) {
        res.send("Something went wrong!")
    }
    res.send(allUsers)

})

router.get("/:id", async (req, res) => {
    if (await req.user.role !== "admin") {
        res.send("You are not admin!")
    }

    const userId = req.params
    const user = await userService.findUserById(userId.id)
    if (!user) {
        res.send("There is no user with that id!")
    }
    res.send(user)
})

router.post("/", validateData.validateRequest(validateData.registrationSchema), async (req, res) => {
    if (await req.user.role !== "admin") {
        res.send("You are not admin!")
    }

    const { email, sex, age, password } = req.body
    const newPass = await userService.createPassword(password)
    const userData = { email: email, sex: sex, age: age, password: newPass }
    if (!userService.addUser(userData)) {
        res.send("Something went wrong!")
    }
    res.send("User added!")
})

router.put("/:id", validateData.validateRequest(validateData.registrationSchema), async (req, res) => {
    if (await req.user.role !== "admin") {
        res.send("You are not admin!")
    }

    const userId = req.params
    const newPass = await userService.createPassword(req.body.password)

    const newData = { email: req.body.email, sex: req.body.sex, age: req.body.age, password: newPass }

    if (!userService.updateUser(userId.id, newData)) {
        res.send("Something went wrong!")
    }
    res.send(`User with id:${userId.id} was updated!`)
})

router.delete("/:id", async (req, res) => {
    if (await req.user.role !== "admin") {
        res.send("You are not admin!")
    }

    const userId = req.params
    if (!userService.deleteUser(userId.id)) {
        res.send(`User with id:${userId.id} does not exist`)
    }
    res.send(`User with id:${userId.id} was deleted!`)
})

module.exports = router