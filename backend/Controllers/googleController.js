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

module.exports = { createNewUser}