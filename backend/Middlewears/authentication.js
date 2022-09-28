const express = require("express");
const app = express();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const authentication = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).json({
        success: false,
        message: `Forbidden`,
      });
    }

    const token = req.headers.authorization.split(" ").pop();
console.log(token)
    jwt.verify(token, SECRET, (err, result) => {
      if (err) {
        res.status(403).json({
          success: false,
          message: `The token is invalid or expired`,
        });
      } else {
        req.token = result;
        next();
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: err.message,
    });
  }
};

module.exports = authentication;
