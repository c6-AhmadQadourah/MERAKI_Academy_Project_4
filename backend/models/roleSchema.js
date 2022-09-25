const express =require("express")
const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    role : { type : string , required : true},
    permissions : { type : string , required : true}
})

module.exports = mongoose.model("Role" , roleSchema)