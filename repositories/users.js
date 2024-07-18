/* eslint-disable no-undef */
const User = require('../models/users');
const jwt = require('jsonwebtoken');

class UserRepository {
    async createUser(user) {
        return User.create({
            email: user.email,
            sex: user.sex,
            age: user.age,
            password: user.password
        });
    }

    async findUser(user) {
        return User.findOne({ where: { email: user.email } })
    }

    async generateToken(user) {
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10h" })
    }
}

module.exports = new UserRepository();