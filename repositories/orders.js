const Order = require('../models/orders');

class OrderRepository {
    async createOrder(product, amount, userId) {
        return Order.create({
            user_id: userId,
            product_id: product.id,
            product_amount: amount
        })
    }
}

module.exports = new OrderRepository();