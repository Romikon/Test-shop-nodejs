const { DataTypes, Model } = require('sequelize');
const sequelize = require('./database');

class Order extends Model { }

Order.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    product_amount: {
        type: DataTypes.INTEGER,
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
},
    {
        sequelize,
        modelName: 'Order',
        tableName: 'orders',
        timestamps: true
    }
);


module.exports = Order;