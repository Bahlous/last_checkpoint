const jwt = require("jsonwebtoken");
const User= require("../models/User");


const isAuth = async(req, res, next)=>{
    try {
        //token exists?
const token = req.headers["authorization"];
if(!token){
  return  res.status(400).json({errors:[{message:"No token"}]});
}

const decode = jwt.verify(token, process.env.SECRET_KEY);
const foundUser = await User.findOne({_id: decode.id})
if(!foundUser){
    return res.status(400).json({errors:[{message:"User not found"}]});
}


req.user = foundUser;
next()
    } catch (error) {
        res.status(400).json({errors:[{message:"Can't verify"}]});
    }
}


module.exports = isAuth;