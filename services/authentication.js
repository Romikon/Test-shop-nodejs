/* eslint-disable no-undef */
const UserRepository = require('../repositories/authentication.js');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

async function generateToken(email) {
    return jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10h" })
}

class UserService {
    async addUser(user) {
        const userEmail = await UserRepository.findUser(user.email)
        if (userEmail) {
            return true
        }
        else {
            UserRepository.createUser(user)
            return false
        }
    }

    async loginUser(email, password) {
        const userEmail = await UserRepository.findUser(email)
        if (!userEmail) {
            return false
        }
        return new Promise((resolve) => {
            bcrypt.compare(password, userEmail.password, async (err, result) => {
                if (err) {
                    return false;
                }

                if (result) {
                    console.log("Same");
                    const accessToken = await generateToken(email)
                    //console.log(accessToken)
                    return resolve(accessToken);
                } else {
                    return false;
                }
            })
        })
    }

    async createPassword(password) {
        return bcrypt.hashSync(password, 7)
    }
}

module.exports = new UserService();