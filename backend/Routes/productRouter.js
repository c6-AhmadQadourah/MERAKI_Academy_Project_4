const express = require("express");

const  {addNewProduct , getAllProducts , deleteProductById ,updateProduct} = require("../Controllers/productController")

const productRouter = express.Router()

productRouter.post("/", addNewProduct);
productRouter.get("/", getAllProducts);
productRouter.delete("/:id", deleteProductById);
productRouter.put("/:id", updateProduct);



module.exports = productRouter