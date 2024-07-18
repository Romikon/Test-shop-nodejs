const UserRepository = require('../repositories/users');
const bcrypt = require('bcrypt');

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

class UserCheck {
    async addUser(user) {
        const userEmail = await UserRepository.findUser(user)
        if (userEmail) {
            return true
        }
        else {
            if (dataValidation(user)) {
                UserRepository.createUser(user)
                return false
            }
        }
    }

    async loginUser(user) {
        const userEmail = await UserRepository.findUser(user)
        if (!userEmail) {
            return false
        }
        return new Promise((resolve) => {
            bcrypt.compare(user.password, userEmail.password, async (err, result) => {
                if (err) {
                    return false;
                }

                if (result) {
                    console.log("Same");
                    const accessToken = await UserRepository.generateToken(user)
                    console.log(accessToken)
                    return resolve(accessToken);
                } else {
                    return false;
                }
            })
        })
    }
}

module.exports = new UserCheck();