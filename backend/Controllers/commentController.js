const express = require("express")

const CommentModel = require("../models/commentSchema")

const createNewComment = (req, res) => {
    const { comment , commenter } = req.body;

    const newComment = new CommentModel({ comment , commenter });
    newComment
      .save()
      .then((result) => {
        res.status(201).json({
          success: true,
          message: `Comment created`,
          Comment: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: `Server Error`,
          err: err.message,
        });
      });
  };
  
  module.exports = { createNewComment };
