const express =require("express")
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const googleSchema = new mongoose.Schema({
givenName : {type : String , required :true},
familyName : {type : String , required :true},
email :  {type : String , required :true , unique: true},
password :  {type : String , required :true},
role : {type : mongoose.Schema.Types.ObjectId , ref : "role"},
image: {type :String},
products : [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
name: {type :String}

})

googleSchema.pre("save" , async function (){
    this.email= this.email.toLowerCase()
    this.password = await bcrypt.hash(this.password ,10 )
})

module.exports = mongoose.model("Google" , googleSchema)