const express =require("express")
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment : { type : string },
    commenter : { type : string }
})

module.exports = mongoose.model("Comment" , commentSchema)