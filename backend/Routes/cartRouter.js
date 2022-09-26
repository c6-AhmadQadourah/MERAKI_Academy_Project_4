const express = require("express");
const { model } = require("mongoose");

const {addNewProduct , getAllItemsInCart ,deleteItemByIdInCart , deleteItemByProductInCart , updateCart} = require("../Controllers/cartController")

const cartRouter = express.Router()

cartRouter.post("/" , addNewProduct)
cartRouter.get("/" , getAllItemsInCart)
cartRouter.delete("/:id" , deleteItemByIdInCart)
cartRouter.delete("/product/:id" , deleteItemByProductInCart)
cartRouter.put("/:id" , updateCart)



module.exports = cartRouter