/* eslint-disable no-undef */
require('dotenv').config();

const config = {
  development: {
    username: process.env.DB_USERNAME || "admin",
    password: process.env.DB_PASSWORD || "123123",
    database: process.env.DB_NAME || "shop",
    host: process.env.DB_HOST || "localhost",
    dialect: 'postgres'
  },
  test: {
    username: process.env.DB_USERNAME || "admin",
    password: process.env.DB_PASSWORD || "123123",
    database: process.env.DB_NAME || "shop_test",
    host: process.env.DB_HOST || "localhost",
    dialect: 'postgres'
  },
  production: {
    username: process.env.DB_USERNAME || "admin",
    password: process.env.DB_PASSWORD || "123123",
    database: process.env.DB_NAME || "shop_production",
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres"
  }
};

console.log(config);

module.exports = config;
