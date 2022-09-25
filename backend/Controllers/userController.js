const express = require("express")

const UserModel = require("../models/userSchema")

const createNewUser = (req ,res)=>{
 const {firstName,lastName,country,email,password , role} =req.body

 const newUser = new UserModel({ firstName,lastName,country,email,password , role})
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
    
}

module.exports = { createNewUser };
