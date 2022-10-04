const express = require("express");

const {createNewUser , getAllUsers , deleteUser} = require("../Controllers/userController")

const  userRouter = express.Router()


userRouter.post("/", createNewUser);
userRouter.get("/", getAllUsers);
userRouter.delete("/:id", deleteUser);


module.exports = userRouter;

