const express = require("express");
const { model } = require("mongoose");

const {addNewItem , getAllItemsInCart ,deleteItemByIdInCart , deleteItemByProductInCart , updateCart} = require("../Controllers/cartController")


const authentication =require("../Middlewears/authentication")

const cartRouter = express.Router()

cartRouter.post("/" ,authentication, addNewItem)
cartRouter.get("/" ,authentication, getAllItemsInCart)
cartRouter.delete("/:id" , deleteItemByIdInCart)
cartRouter.delete("/product/:id" , deleteItemByProductInCart)
cartRouter.put("/:id" , updateCart)



module.exports = cartRouter