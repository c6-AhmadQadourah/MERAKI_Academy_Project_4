const express = require("express");
const { default: mongoose } = require("mongoose");
const categoryModel = require("../models/categorySchema")


const createCategory =(req,res)=>{
const {place , industry}=req.body
const newcategory = new categoryModel({
    place , industry
})

newcategory
.save()
.then((result) => {
    res.status(201).json({
      success: true,
      message: `Category created`,
      role: result,
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

module.exports = { createCategory};
