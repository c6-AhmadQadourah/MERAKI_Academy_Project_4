const express = require("express");
const { model } = require("mongoose");

const {login} = require("../Controllers/login")
const {loginGoogle} = require("../Controllers/loginGoogle")
const loginRouter = express.Router()

loginRouter.post("/" , login)
loginRouter.post("/google" , loginGoogle)

module.exports= loginRouter