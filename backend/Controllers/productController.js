const express = require("express")

const ProductModel = require("../models/productSchema")

const addNewProduct =(req,res)=>{
const { title , description ,   Price ,Image , Date } =req.body

const newProduct = new ProductModel({title , description ,   Price ,Image , Date })
newProduct
.save()
.then((result)=>{
    res.status(201).json({
        success: true,
        message: `Product created`,
        Product: result,
      });
})
.catch((err) => {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: err.message,
    });
  });
}





module.exports = {addNewProduct}