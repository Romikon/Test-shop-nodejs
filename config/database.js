/* eslint-disable no-undef */
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: 5432,
  dialect: 'postgres'
});

module.exports = sequelize;