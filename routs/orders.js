const express = require("express")
const router = express.Router()
const orderService = require('../servises/orders');

router.put("/", async (req, res) => {
    const userId = await req.user
    const { name, amount } = req.body
    const product = { name: name, amount: amount }

    const inBase = await orderService.checkOrder(product, userId.id)
    if (inBase) {
        res.send("Product added!")
    }
    else {
        res.send("Product not added!")
    }
})

module.exports = router;