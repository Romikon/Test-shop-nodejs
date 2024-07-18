/* eslint-disable no-unused-vars */
'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await sequelize.sync();
    await queryInterface.createTable("users", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING(1024)
      },
      sex: {
        type: DataTypes.STRING(10)
      },
      age: {
        type: DataTypes.INTEGER
      },
      password: {
        type: DataTypes.STRING
      },
      role: {
        type: DataTypes.STRING,
        default: "user"
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
