/* eslint-disable no-undef */
require('dotenv').config();
console.log("username:" +  process.env.DB_USERNAME)
console.log("password:" +  process.env.DB_PASSWORD)
console.log("database:" +  process.env.DB_NAME)
console.log("host:" +  process.env.DB_HOST)
console.log("use_env_variable:" +  process.env.DEV_DATABASE_URL)
module.exports = {
    development: {
        username: process.env.DB_USERNAME || "admin",
        password: process.env.DB_PASSWORD || 123123,
        database: process.env.DB_NAME || "shop",
        host: process.env.DB_HOST || "localhost",
        dialect: "postgres",
        use_env_variable: process.env.DEV_DATABASE_URL || "postgres://admin:123123@127.0.0.1:5433/shop"
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
