/* eslint-disable no-undef */
const UserRepository = require('../repositories/users.js');
const bcrypt = require('bcrypt');

class UserService {
    async addUser(user) {
        return UserRepository.createUser(user)
    }

    async createPassword(password) {
        return bcrypt.hashSync(password, 7)
    }

    async getAllUsers(){
        return UserRepository.getAllUsers()
    }

    async findUserById(id){
        return UserRepository.findUserById(id)
    }

    async updateUser(userId, user){
        return UserRepository.updateUser(userId, user)
    }

    async deleteUser(userId){
        return UserRepository.deleteUser(userId)
    }
}

module.exports = new UserService();