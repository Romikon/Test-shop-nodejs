/* eslint-disable no-undef */
const User = require('../models/authentication.js');


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

    async getAllUsers(){
        //console.log(User.findAll())
        return User.findAll()
    }

    async findUserById(id){
        return User.findOne({where: {id: id}})
    }

    async updateUser(userId, user){
        const userToUpdate = await this.findUserById(userId)
        return userToUpdate.update({
            email: user.email,
            sex: user.sex,
            age: user.age,
            password: user.password
        })
    }

    async deleteUser(userId){
        const userToDelete = await this.findUserById(userId)
        return userToDelete.destroy();
    }
}

module.exports = new UserRepository();