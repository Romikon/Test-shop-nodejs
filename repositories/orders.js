const Order = require('../models/orders');

class OrderRepository {
    async createOrder(product, amount, userId) {
        return Order.create({
            user_id: userId,
            product_id: product.id,
            product_amount: amount
        })
    }
    async getAllOrders(){
        return Order.findAll()
    }

    async updateOrder(orderToUpdate, newParams){
        return orderToUpdate.update({ user_id: newParams.user_id, product_id: newParams.product_id, product_amount: newParams.product_amount})
    }

    async findOrder(order_id){
        return Order.findOne({where: { id: order_id}})
    }

    async deleteOrder(orderId){
        return Order.destroy({where: {id: orderId}})
    }
}

module.exports = new OrderRepository();