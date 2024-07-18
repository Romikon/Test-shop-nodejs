const orderRepository = require('../repositories/orders');
const productService = require('../servises/products');

class OrderCheck {
    async checkOrder(data, userId) {
        const amount = data.amount
        const product = await productService.findProduct(data)
        if (!product) {
            return false
        }
        if (product.amount < amount) {
            //console.log("Wrong amount!")
            return false
        }
        else {
            await orderRepository.createOrder(product, amount, userId)
            return true
        }
    }
}

module.exports = new OrderCheck();