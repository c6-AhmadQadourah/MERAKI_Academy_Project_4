const express = require("express");

const {createNewUser , getAllUsers , deleteUser,updateUser } = require("../Controllers/userController")

const  userRouter = express.Router()


userRouter.post("/", createNewUser);
userRouter.get("/", getAllUsers);
userRouter.delete("/:id", deleteUser);
userRouter.put("/:id", updateUser);


module.exports = userRouter;

