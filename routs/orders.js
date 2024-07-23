const express = require("express")
const router = express.Router()
const findProduct = require('../services/products');
const orderService = require('../services/orders');

router.post("/", async (req, res) => {
    const userId = await req.user
    const { name, amount } = req.body
    const product = { name: name, amount: amount }

    const inBase = await orderService.checkOrder(product, userId.id)

    findProduct.findProductByName(name, amount)

    if (inBase) {
        res.send("Product added!")
    }
    else {
        res.send("Product not added!")
    }
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
    const { user_id, product_id, product_amount } = req.body
    const product = { user_id: user_id, product_id: product_id, product_amount: product_amount }

    const updatedProduct = await orderService.updateProduct(order_id, product)

    if (updatedProduct) {
        res.send("Updated!")
    }
    else {
        res.send("Something went wrong")
    }
})

router.delete("/:id", async (req, res) => {
    const orderId = req.params
    const orderToDelete = await orderService.deleteOrder(orderId)
    
    if(orderToDelete){
        res.send("Deleted!")
    }
    else{
        res.send("Something went wrong")
    }
})



module.exports = router;