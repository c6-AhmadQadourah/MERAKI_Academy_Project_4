const express =require("express")
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment : { type : String },
    commenter : { type : String }
})

module.exports = mongoose.model("Comment" , commentSchema)