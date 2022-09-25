const express = require("express");

//------------------import roles controller---------------------//

const { createNewRole } = require("../Controllers/roleController");


//-------------------Create roles router-----------------------//
const rolesRouter = express.Router();


rolesRouter.post("/", createNewRole);

module.exports = rolesRouter;