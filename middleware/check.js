/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/users');

const check = (req, res, next) => {
    const authHeader = req.get('Authorization');

    const token = authHeader.split(' ')[1];
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(403);
        }
    }
    const user_copy = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);
    const user = UserRepository.findUser(user_copy)
    req.user = user;
    next();
}

module.exports = {
    check
};