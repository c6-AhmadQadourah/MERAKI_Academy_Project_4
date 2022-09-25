const express = require("express")
const { default: mongoose } = require("mongoose")

const CartModel = require("../models/cartSchema")

const  addNewProduct= (req,res)=>{

    const {product,user}= req.body

  const  addProductToCart = new CartModel({product ,user})

    addProductToCart
    .save()
    .then((result) => {
      
        res.status(201).json({
          success: true,
          message: `Product added to cart Sucssfully`,
          Comment: result,
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