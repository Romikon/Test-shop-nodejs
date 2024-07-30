const orderRepository = require('../repositories/orders');
const productService = require('../services/products');

class OrderService {
    async createOrder(data, userId) {
        const amount = data.amount
        const product = await productService.findProduct(data)
        if (!product) {
            return false
        }
        if (product.amount < amount) {
            return false
        }
        else {
            await orderRepository.createOrder(product, amount, userId)
            await productService.updatePrice(data.name, amount)
            return true
        }
    }

    async getAllOrders(){
        orderRepository.getAllOrders()
    }

    async updateOrder(order_id, newParams){
        const orderToUpdate = await orderRepository.findOrder(order_id);
        return orderRepository.updateOrder(orderToUpdate, newParams)
    }

    async deleteOrder(orderId){
        return orderRepository.deleteOrder(orderId)
    }
}

module.exports = new OrderService();