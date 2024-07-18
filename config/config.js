/* eslint-disable no-undef */
require('dotenv').config();

module.exports = {
    development: {
        
        host: process.env.DB_HOST || "localhost",
        dialect: "postgres"
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
