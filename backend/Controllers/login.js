const usersModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login =(req,res)=>{

    const email =  req.body.email
    const password =  req.body.password

usersModel.findOne({email})
.populate("role.role" )
.then(async (result)=>{


if (!result) {
    return res.status(404).json({
        success: false,
        message: `The email doesn't exist`,
      })
}

  try{
    const valid = await bcrypt.compare(password, result.password)
    
    if (!valid) {
        return res.status(403).json({
          success: false,
          message: `The password you have entered is incorrect`,
        });
      }

      const payload = {
        userId: result._id,
          role: result.role,
          country: result.country,
      }

const options = {expiresIn: "120m"}
const SECRET = process.env.SECRET



const token =  jwt.sign(payload ,SECRET , options)



res.status(200).json({
    success: true,
    message: `Valid login credentials`,
    token: token,

    
  });


}
catch (error) {
    throw new Error(error.message);
  }

})
.catch((err)=>{
    res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
})
}

module.exports = {login}