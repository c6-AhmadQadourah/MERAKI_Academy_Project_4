const express = require("express");

const ProductModel = require("../models/productSchema");

const addNewProduct = (req, res) => {
  const { title, description, price, image, date } = req.body;

  const newProduct = new ProductModel({
    title,
    description,
    price,
    image,
    date,
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

module.exports = { addNewProduct, getAllProducts, deleteProductById ,updateProduct };
