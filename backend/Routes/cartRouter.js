const express = require("express");
const { model } = require("mongoose");

const {addNewProduct} = require("../Controllers/cartController")

const cartRouter = express.Router()

cartRouter.post("/" , addNewProduct)


module.exports = cartRouter