const Product = require('../repositories/products');

class ProductService {
    createProduct(values) {
        Product.createProduct(values)
    }

    findProduct(data) {
        return Product.findProduct(data)
    }

    findProductByName(name, orderAmount){
        return Product.findProductByName(name, orderAmount)
    }

    getAllProducts(page, limit) {
        return Product.getAllProducts(page, limit)
    }

    getProductById(value) {
        return Product.getProductById(value)
    }


    updateProduct(id, data) {
        Product.updateProduct(id, data)
    }

    deleteProduct(id) {
        Product.deleteProduct(id)
    }
}

module.exports = new ProductService();