const express =require("express")
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
      industry : { type : String }
})

module.exports = mongoose.model("Category" , categorySchema)