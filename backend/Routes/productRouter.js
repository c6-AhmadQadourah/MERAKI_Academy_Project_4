const express = require("express");

const  {addNewProduct , getAllProducts , deleteProductById ,updateProduct , getProductRegex , getProductByID ,getProductByCategory} = require("../Controllers/productController")

const {createNewComment} = require("../Controllers/commentController")
const {createCategory ,getAllCategories} = require("../Controllers/categoryController")

const authentication = require("../Middlewears/authentication");
const authorization = require("../Middlewears/authorization");

const productRouter = express.Router()

productRouter.post("/",authentication,authorization("CREATE_PRODUCT"), addNewProduct);
productRouter.get("/",authentication,authorization("BROWSE"), getAllProducts);
productRouter.delete("/:id",authentication ,authorization("CREATE_PRODUCT"), deleteProductById);
productRouter.put("/:id",authentication,authorization("BROWSE"), updateProduct);
productRouter.post("/:id/comments",authentication, createNewComment);
productRouter.post("/category",authentication, createCategory);
productRouter.get("/category",authentication, getAllCategories);
productRouter.get("/search", getProductRegex);
productRouter.get("/:id", getProductByID);
productRouter.get("/category/:category", getProductByCategory);





module.exports = productRouter