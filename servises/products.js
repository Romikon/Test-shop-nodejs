const Product = require('../repositories/products');

function dataValidation(values) {
    if (typeof (values.name) !== "string") {
        console.log("Invalid name!");
        return false;
    }
    else if (typeof (values.amount) !== "number") {
        console.log("Invalid amount!");
        return false;
    }
    else if (typeof (values.weight_in_kg) !== "number") {
        console.log("Invalid weight!");
        return false;
    }
    else {
        return true;
    }
}

class ProductCheck {
    createProduct(values) {
        if (dataValidation(values)) {
            Product.createProduct(values)
        }
    }

    findProduct(data) {
        return Product.findProduct(data)
    }

    getAllProducts(page, limit) {
        return Product.getAllProducts(page, limit);
    }

    getProductById(value) {
        return Product.getProductById(value);
    }

    updateProduct(id, data) {
        Product.updateProduct(id, data)
    }

    deleteProduct(id) {
        Product.deleteProduct(id);
    }
}

module.exports = new ProductCheck();