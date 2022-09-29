const express = require("express");
const { default: mongoose } = require("mongoose");
const categoryModel = require("../models/categorySchema")


const createCategory =(req,res)=>{
const { industry}=req.body
const newcategory = new categoryModel({
     industry
})

newcategory
.save()
.then((result) => {
    res.status(201).json({
      success: true,
      message: `Category created`,
      category: result,
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

const  getAllCategories = (req,res)=>{
  categoryModel
  .find({})
  
  .then((result) => {
    res.status(201).json({
      success: true,
      message: `All Categories`,
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



module.exports = { createCategory,getAllCategories};
