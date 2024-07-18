/* eslint-disable no-undef */
const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

const middleware = require('./middleware/check');

app.use(bodyParser.json());

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
  })

const productsRoute = require("./routs/products.js")
const usersRoute = require("./routs/users.js")
const orderRoute = require("./routs/orders.js")
app.use('/products', middleware.check, productsRoute)
app.use('/users', usersRoute)
app.use('/buy',middleware.check, orderRoute)