/* eslint-disable no-undef */
const User = require('../models/authentication');

class UserRepository {
    async createUser(user) {
        return User.create({
            email: user.email,
            sex: user.sex,
            age: user.age,
            password: user.password
        });
    }

    async findUser(userEmail) {
        return User.findOne({ where: { email: userEmail } })
    }

}

module.exports = new UserRepository();