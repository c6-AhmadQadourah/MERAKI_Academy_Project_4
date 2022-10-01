const express =require("express")
const mongoose = require("mongoose");


const cartSchema = new mongoose.Schema({

    product : { type :  mongoose.Schema.Types.ObjectId , ref :"Product"  },
    user : { type : mongoose.Schema.Types.ObjectId , ref :"User" },
    quantity :{type : Number}
})

module.exports = mongoose.model("Cart" ,cartSchema)