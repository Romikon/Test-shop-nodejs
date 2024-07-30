/* eslint-disable no-undef */
const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const middleware = require('./middleware/validateToken.js');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

const port = process.env.PORT || 3001;


app.use('/products', middleware.check, require('./routs/products'))
   .use('/users', middleware.check, require('./routs/users.js'))
   .use('/order',middleware.check, require("./routs/orders.js"))
   .use('/', require("./routs/authentication.js"))

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
  })
