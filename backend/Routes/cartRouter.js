const express = require("express");
const { model } = require("mongoose");

const {addNewProduct , getAllProductInCart ,deleteItemByIdInCart} = require("../Controllers/cartController")

const cartRouter = express.Router()

cartRouter.post("/" , addNewProduct)
cartRouter.get("/" , getAllProductInCart)
cartRouter.delete("/:id" , deleteItemByIdInCart)


module.exports = cartRouter