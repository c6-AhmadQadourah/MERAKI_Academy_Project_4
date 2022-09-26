const express =require("express")
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    place : { type : String },
    industry : { type : String }
})

module.exports = mongoose.model("Category" , categorySchema)