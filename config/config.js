/* eslint-disable no-undef */
require('dotenv').config();
console.log("username:" +  process.env.DB_USERNAME)
console.log("password:" +  process.env.DB_PASSWORD)
console.log("database:" +  process.env.DB_NAME)
console.log("host:" +  process.env.DB_HOST)
console.log("use_env_variable:" +  process.env.DEV_DATABASE_URL)
module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: "postgres",
        use_env_variable: process.env.DEV_DATABASE_URL
    },
    test: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: "postgres",
        use_env_variable: process.env.DEV_DATABASE_URL
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: "postgres",
        use_env_variable: process.env.DEV_DATABASE_URL
    }
};
