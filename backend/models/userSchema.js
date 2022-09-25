const express =require("express")
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
firstName : {type : String , required :true},
lastName : {type : String , required :true},
country :  {type : String },
country :  {type : String },
email :  {type : String , required :true},
password :  {type : password , required :true},
role : {type : mongoose.Schema.Types.ObjectId , ref : "roles"},
products : []
})

module.exports = mongoose.model("User" , userSchema)