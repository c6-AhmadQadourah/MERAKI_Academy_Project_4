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
      },
    ])

    .then((result) => {

      res.status(201).json({
        success: true,
        message: `All Products`,
        products: result,
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
      message: `Product Updated`,
      product :result
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

const getProductByID = (req,res)=>{
  const _id = req.params.id;

  ProductModel
  .findById(_id)
  .populate([
    {
      path: "category",
      model: "Category",
    },
  ])
  .populate( [{
    path: 'comments',
    model: 'Comment',
    populate:{
      path : "commenter" ,
      model : "User"
    }
}])
  .then((result) => {
    if (!result) {
      return res.status(404).json({
        success: false,
        message: `The Product: ${_id} is not found`,
      });
    }
    res.status(200).json({
      success: true,
      message: `Product Found`,
      product: result
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

const getProductByCategory = (req,res)=>{
  categoryid =req.params.category
  ProductModel
  .find({category : categoryid })
  .then((result)=>{
    if (!result) {
      return res.status(404).json({
        success: false,
        message: `The Product: ${categoryid} is not found`,
      });
    }
    res.status(200).json({
      success: true,
      message: `Product Found`,
      product: result
    });
  })
  .catch((err) => {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: err.message,
    });
  
  })

}

module.exports = { addNewProduct, getAllProducts, deleteProductById ,updateProduct , getProductRegex ,getProductByID ,getProductByCategory};
