const express = require("express");

const {createNewUser} = require("../Controllers/userController")

const  userRouter = express.Router()


userRouter.post("/", createNewUser);

module.exports = userRouter;

