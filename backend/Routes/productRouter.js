const express = require("express");

const  {addNewProduct , getAllProducts , deleteProductById} = require("../Controllers/productController")

const productRouter = express.Router()

productRouter.post("/", addNewProduct);
productRouter.get("/", getAllProducts);
productRouter.delete("/:id", deleteProductById);



module.exports = productRouter