const express = require("express");

const {createNewUser} = require("../Controllers/googleController")


const  googleRouter = express.Router()

googleRouter.post("/", createNewUser);

module.exports = googleRouter;

