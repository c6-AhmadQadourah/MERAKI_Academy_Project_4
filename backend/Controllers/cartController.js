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
  
const getAllItemsInCart = (req,res)=>{
 CartModel
 .find({})
 .populate("user" ,"product")
 .then((result) => {
      
  res.status(201).json({
    success: true,
    message: `All Products in cart`,
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


const deleteItemByIdInCart = (req,res)=>{
  const _id = req.params.id;
CartModel
.findByIdAndDelete(_id)
.then((result) => {
  if (!result) {
    return res.status(404).json({
      success: false,
      message: `The Item : ${_id} is not found`,
    });
  }
  res.status(200).json({
    success: true,
    message: `Item deleted`,
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


const deleteItemByProductInCart = (req,res)=>{
  const product = req.params.id;
CartModel
.findOneAndDelete(product)
.then((result) => {
  if (!result) {
    return res.status(404).json({
      success: false,
      message: `The Product: ${_id} is not found`,
    });
  }
  res.status(200).json({
    success: true,
    message: `Item deleted`,
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


const updateCart = (req,res)=>{
  const _id = req.params.id
  CartModel
  .findByIdAndUpdate(_id , req.body , {new :true})
  .then((result) => {
    if (!result) {
      return res.status(404).json({
        success: false,
        message: `The Product: ${_id} is not found`,
      });
    }
    res.status(200).json({
      success: true,
      message: `Item Updated`,
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


module.exports = {addNewProduct , getAllItemsInCart , deleteItemByIdInCart , deleteItemByProductInCart,updateCart}