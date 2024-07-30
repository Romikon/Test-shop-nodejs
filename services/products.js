const Product = require('../repositories/products');

class ProductService {
    async createProduct(values) {
        await Product.createProduct(values)
    }

    async findProduct(data) {
        return Product.findProduct(data)
    }

    async updatePrice(name, orderAmount){
        return Product.updatePrice(name, orderAmount)
    }

    async getAllProducts(page, limit) {
        return Product.getAllProducts(page, limit)
    }

    async getProductById(value) {
        return Product.getProductById(value)
    }


    async updateProduct(id, data) {
        return Product.updateProduct(id, data)
    }

    async deleteProduct(id) {
        Product.deleteProduct(id)
    }
}

module.exports = new ProductService();