const express = require("express");
const { model } = require("mongoose");

const {
  addNewItem,
  getAllItemsInCart,
  deleteItemByIdInCart,
  deleteItemByProductInCart,
  updateCart,
} = require("../Controllers/cartController");

const authentication = require("../Middlewears/authentication");
const authorization = require("../Middlewears/authorization");
const cartRouter = express.Router();

cartRouter.post(
  "/",
  authentication,
  authorization("CREATE_PRODUCT"),
  addNewItem
);
cartRouter.get("/", authentication, authorization("BROWSE"), getAllItemsInCart);
cartRouter.delete("/:id",authentication, deleteItemByIdInCart);
cartRouter.delete("/product/:id",authentication, deleteItemByProductInCart);
cartRouter.put("/:id",authentication, updateCart);

module.exports = cartRouter;
