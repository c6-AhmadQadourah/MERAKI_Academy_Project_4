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

const getAllProducts = (req,res) =>{

ProductModel.find({})
.populate("comments")
.then((result) => {
  res.status(201).json({
    success: true,
    message: `All Products`,
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


const deleteProductById= (req,res) =>{

  const _id=req.params.id

ProductModel
.findByIdAndDelete(_id)
.then((result) => {
  if (!result) {
    return res.status(404).json({
      success: false,
      message: `The Product : ${_id} is not found`,
    });
  }
  res.status(200).json({
    success: true,
    message: `Product deleted`,
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




module.exports = {addNewProduct , getAllProducts , deleteProductById}