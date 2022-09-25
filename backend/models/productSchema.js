const express =require("express")
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title  : { type : String , required : true},
    description  : { type : String , required : true},
    seller : { type : mongoose.Schema.Types.ObjectId , ref : "User"},
    price : { type : Number  , required : true},
    image : { type : String  },
    date : { type : Date  },
    comments : [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
})

module.exports = mongoose.model("Product" , productSchema)