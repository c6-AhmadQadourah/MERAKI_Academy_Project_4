const express = require("express");

const {createNewUser ,updateUser , deleteUser , getAllUsers} = require("../Controllers/googleController")


const  googleRouter = express.Router()

googleRouter.post("/", createNewUser);
googleRouter.get("/", getAllUsers);
googleRouter.delete("/:id", deleteUser);
googleRouter.put("/:id", updateUser);

module.exports = googleRouter;

