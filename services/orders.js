const orderRepository = require('../repositories/orders');
const productService = require('../services/products');

class OrderService {
    async checkOrder(data, userId) {
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
            return true
        }
    }

    async getAllOrders(){
        orderRepository.getAllOrders()
    }

    async updateProduct(order_id, newParams){
        const productToUpdate = await orderRepository.findOrder(order_id);
        return orderRepository.updateProduct(productToUpdate, newParams)
    }

    async deleteOrder(orderId){
        return orderRepository.deleteOrder(orderId)
    }
}

module.exports = new OrderService();