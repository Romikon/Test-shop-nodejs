const express = require("express")
const router = express.Router()
const orderService = require('../services/orders');

router.post("/", async (req, res) => {
    const userId = req.user
    const product = { name: req.body.name, amount: req.body.amount }

    if (! await orderService.createOrder(product, userId.id)) {
        res.send("Order not added!")
    }
    res.send("Order added!")
})

router.get("/", async (req, res) => {
    try {
        res.send(orderService.getAllOrders())
    } catch (error) {
        res.send(error)
    }

})

router.put("/:id", async (req, res) => {
    const order_id = req.params
    const product = { user_id: req.body.user_id, product_id: req.body.product_id, product_amount: req.body.product_amount }

    if (!await orderService.updateOrder(order_id, product)) {
        res.send("Something went wrong")
    }
    res.send("Updated!")
})

router.delete("/:id", async (req, res) => {
    const orderId = req.params
    
    if(!await orderService.deleteOrder(orderId)){
        res.send("Something went wrong")
    }
    res.send("Deleted!")
})

module.exports = router;