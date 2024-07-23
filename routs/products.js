/* eslint-disable no-unused-vars */
const express = require("express")
const router = express.Router()
const productService = require('../services/products');
const redisClient = require('../config/redisConnect.js')

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

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 5;
  try {
    const products = await redisClient.get('products');
    if (products) {
      return res.send(JSON.parse(products));
    }

    const result = await productService.getAllProducts(page, limit);
    await redisClient.setEx('products', 3600, JSON.stringify(result));

    return res.send(result);

  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).send("Something went wrong!");
  }
});

router.get("/:id", async (req, res) => {
  const params = req.params;
  try {
    const result = await productService.getProductById(params.id);
    if (result === null) {
      res.send("Out of range!")
    }
    else {
      res.send(result);
    }
  } catch (error) {
    res.send("Something went wrong!")
  }
})


router.post('/', async (req, res) => {
  if (await req.user.role !== "admin") {
    res.send("You are not admin!")
  }

  const { name, amount, weight_in_kg } = req.body;
  const values = { name: name, amount: amount, weight_in_kg: weight_in_kg }

  if(!dataValidation(values)){
    res.send("Invalid data type!")
  }

  try {
    productService.createProduct(values);
    res.send("Added!")
  } catch (err) {
    res.send("Error adding")
  }
});


router.put('/:id', async (req, res) => {
  if (await req.user.role !== "admin") {
    res.send("You are not admin!")
  }

  const params = req.params;
  const { name, amount, weight_in_kg } = req.body
  const values = [name, amount, weight_in_kg];
  try {
    const result = productService.updateProduct(params.id, values)
    res.send(result)
  } catch (error) {
    res.send("Something went wrong!")
  }
});


router.delete("/:id", async (req, res) => {

  if (await req.user.role !== "admin") {
    res.send("You are not admin!")
  }

  const id = req.params
  productService.deleteProduct(id.id)

  res.send(`Product with id:${id.id} was successfully deleted!`)
})

module.exports = router;