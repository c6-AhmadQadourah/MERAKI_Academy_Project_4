const express = require("express");
const { model } = require("mongoose");

const {login} = require("../Controllers/login")

const loginRouter = express.Router()

loginRouter.post("/" , login)

module.exports= loginRouter