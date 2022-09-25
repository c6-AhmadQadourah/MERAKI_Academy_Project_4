const express = require("express");

const  {addNewProduct} = require("../Controllers/productController")

const productRouter = express.Router()

productRouter.post("/", addNewProduct);


module.exports = productRouter