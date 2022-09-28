const express = require("express");

const {createNewUser , getAllUsers} = require("../Controllers/userController")

const  userRouter = express.Router()


userRouter.post("/", createNewUser);
userRouter.get("/", getAllUsers);

module.exports = userRouter;

