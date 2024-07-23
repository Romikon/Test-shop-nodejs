require('dotenv').config();
const express = require("express");
const router = express.Router();
const userService = require('../services/users.js');

router.get("/", async (req, res) => {
    if (await req.user.role !== "admin") {
        res.send("You are not admin!")
    }

    const allUsers = await userService.getAllUsers()
    if (allUsers) {
        res.send(allUsers)
    }
    else {
        res.send("Something went wrong!")
    }

})

router.get("/:id", async (req, res) => {
    if (await req.user.role !== "admin") {
        res.send("You are not admin!")
    }

    const userId = req.params
    const user = await userService.findUserById(userId.id)
    if (user) {
        res.send(user)
    }
    else {
        res.send("There is no user with that id!")
    }
})

router.post("/", async (req, res) => {
    if (await req.user.role !== "admin") {
        res.send("You are not admin!")
    }

    const { email, sex, age, password } = req.body
    const newPass = await userService.createPassword(password)
    const userData = { email: email, sex: sex, age: age, password: newPass }
    if (userService.addUser(userData)) {
        res.send("User added!")
    }
    else {
        res.send("Something went wrong!")
    }
})

router.put("/:id", async (req, res) => {
    if (await req.user.role !== "admin") {
        res.send("You are not admin!")
    }

    const userId = req.params
    const newPass = await userService.createPassword(req.body.password)

    const newData = { email: req.body.email, sex: req.body.sex, age: req.body.age, password: newPass }

    if (userService.updateUser(userId.id, newData)) {
        res.send(`User with id:${userId.id} was updated!`)
    }
    else {
        res.send("Something went wrong!")
    }
})

router.delete("/:id", async (req, res) => {
    if (await req.user.role !== "admin") {
        res.send("You are not admin!")
    }

    const userId = req.params
    if (userService.deleteUser(userId.id)) {
        res.send(`User with id:${userId.id} was deleted!`)
    }
    else {
        res.send(`User with id:${userId.id} does not exist`)
    }
})

module.exports = router