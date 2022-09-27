const express = require("express");

const ProductModel = require("../models/productSchema");

const addNewProduct = (req, res) => {
  const { title, description, price, image, date , category} = req.body;

  const newProduct = new ProductModel({
    title,
    description,
    price,
    image,
    date,
    category
  });
  newProduct
    .save()
    .then((result) => {
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
};

const getAllProducts = (req, res) => {
  ProductModel.find({})
    .populate("comments" )
    .populate([
      {
        path: "category",
        model: "Category",
        select :"industry"
      },
    ])

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
};

const deleteProductById = (req, res) => {
  const _id = req.params.id;

  ProductModel.findByIdAndDelete(_id)
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
};

const updateProduct = (req,res)=>{
  const _id = req.params.id;

  ProductModel
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


const getProductRegex = async (req,res)=>{

  const search = req.query.search
  const regex =new RegExp(search , "gi")

 try{ const Products= await  ProductModel.find({
    title : {$regex : regex}
  })
if(Products.length){
  return res.status(201).json({Products})
} else return res.status(404).json({
massage : "No products found"
})
}
catch(error){
  res.status(500).json({
    message : "Sarver Error",
    error
  })
}
}

module.exports = { addNewProduct, getAllProducts, deleteProductById ,updateProduct , getProductRegex };
