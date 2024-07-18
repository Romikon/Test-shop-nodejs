const { DataTypes, Model } = require('sequelize');
const sequelize = require('./database');

class Product extends Model { }

Product.init({

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    weight_in_kg:
    {
        type: DataTypes.DOUBLE,
        allowNull: false
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
}, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: true
});

module.exports = Product;