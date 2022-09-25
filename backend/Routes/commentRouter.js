const express = require("express");


const {createNewComment} = require("../Controllers/commentController")

const commentRouter = express.Router();


commentRouter.post("/", createNewComment);

module.exports = commentRouter;