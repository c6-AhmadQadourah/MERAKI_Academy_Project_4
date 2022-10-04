const express = require("express");

const GoogleModel = require("../models/googleSchema");

const createNewUser = (req, res) => {
  const {  givenName ,
    familyName,
    email,
    password ,
    role,
    image,
    name, } = req.body;

  const newUser = new GoogleModel({
    givenName ,
    familyName,
    email,
    password ,
    role,
    image,
    name,
  });
  
  newUser
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `User created`,
        User: result,
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

const getAllUsers = (req,res)=>{
  GoogleModel
  .find({})
  .populate([
    {
      path: "role",
      model: "Role",
    },
  ])
  .then((result) => {
    res.status(201).json({
      success: true,
      message: `All Users`,
      Users: result,
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
  
  const deleteUser =(req,res)=>{
  
    const _id =req.params.id
    GoogleModel
    .findByIdAndDelete({_id})
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The User: ${_id} is not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `User deleted`,
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
  
  const updateUser = (req, res) => {
    const _id = req.params.id;
    GoogleModel.findByIdAndUpdate(_id, req.body, { new: true })
      .then((result) => {
        if (!result) {
          return res.status(404).json({
            success: false,
            message: `The User: ${_id} is not found`,
          });
        }
        res.status(200).json({
          success: true,
          message: `User Updated`,
          result: result
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
module.exports = { createNewUser ,updateUser , deleteUser , getAllUsers}