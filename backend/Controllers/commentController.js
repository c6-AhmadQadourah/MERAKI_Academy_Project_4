const express = require("express");
const { default: mongoose } = require("mongoose");

const CommentModel = require("../models/commentSchema");
const prodcutModel =require("../models/productSchema")


const createNewComment = (req, res) => {
  const { comment } = req.body;
  const _id = req.params.id;
  const commenter = req.token.userId;


  const newComment = new CommentModel({ comment, commenter });
  newComment
    .save()
    .then((result) => {
      prodcutModel
        .updateOne({ _id: _id }, { $push: { comments: result._id } })
        .then(() => {
          res.status(201).json({
            success: true,
            message: `Comment added`,
            comment: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
          });
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
