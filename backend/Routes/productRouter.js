const express = require("express");

const  {addNewProduct , getAllProducts , deleteProductById ,updateProduct} = require("../Controllers/productController")

const {createNewComment} = require("../Controllers/commentController")

const productRouter = express.Router()

productRouter.post("/", addNewProduct);
productRouter.get("/", getAllProducts);
productRouter.delete("/:id", deleteProductById);
productRouter.put("/:id", updateProduct);
productRouter.post("/:id/comments", createNewComment);



module.exports = productRouter