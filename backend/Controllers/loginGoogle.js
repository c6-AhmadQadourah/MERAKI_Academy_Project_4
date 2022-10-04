const googleModel = require("../models/googleSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginGoogle = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const secret = req.body.secret

  googleModel
    .findOne({ email })
    .populate([
      {
        path: "role",
        model: "Role",
      },
    ])
    .then(async (result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The email doesn't exist`,
          
        });
      }

      try {
        
        const valid = await bcrypt.compare(password, result.password);

        if (!valid) {
          return res.status(403).json({
            success: false,
            message: `The password you have entered is incorrect`,
          });
        }

        if (secret){
          const secretvalid = await secret == "AbCd"
          if(!secretvalid){
            return res.status(403).json({
              success: false,
              message: ` Incorrect Secret Word`,

            });
          }
        }

        const payload = {
          userId: result._id,
          role: result.role,
         
        };

        const options = { expiresIn: "120m" };
        const SECRET = process.env.SECRET;

        const token = jwt.sign(payload, SECRET, options);

        res.status(200).json({
          success: true,
          message: `Valid login credentials`,
          token: token,
          result: result,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

module.exports = { loginGoogle };
