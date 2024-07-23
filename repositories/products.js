const Product = require('../models/products');
const { Op } = require('sequelize');

class ProductRepository {
    async createProduct(data) {
        console.log(data)
        return Product.create({
            name: data.name,
            amount: data.amount,
            weight_in_kg: data.weight_in_kg
        });
    }

    async getProductById(id) {
        return Product.findByPk(id);
    }

    async findProduct(data) {
        return Product.findOne({ where: { name: data.name } })
    }

    async findProductByName(productName, orderAmount) {
        const product = Product.findOne({ where: { name: productName } })
        const newAmount = product.amount - orderAmount
        return product.update({ amount: newAmount })
    }

    async getAllProducts(page, limit) {
        return Product.findAll({
            where: {
                id: {
                    [Op.gt]: page * 5,
                    [Op.lte]: (page * 5) + limit
                }
            }
        })
    }

    async updateProduct(id, data) {
        const product = await Product.findByPk(id);
        return product.update({ name: data.name, amount: data.amount, weight_in_kg: data.weight_in_kg })
    }

    async deleteProduct(id) {
        const product = await Product.findByPk(id); 2
        console.log(product)
        if (!product) {
            throw new Error('User not found');
        }
        return product.destroy();
    }
}

module.exports = new ProductRepository();
