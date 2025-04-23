const User = require("../models/User");
var bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
try {
    const {name , email, password, phone} = req.body;
    console.log(req.body);
const foundUser = await User.findOne({email});
if(foundUser) {
    return  res.status(400).json({errors:[{message:"Email should be unique!"}]});
}
// const newUser = new User({...req.body});
const saltRound = 10;
const hashPassword = await bcrypt.hash(password, saltRound)
const newUser = new User({name, email, password:hashPassword, phone})
await newUser.save();
const token = jwt.sign(
    {id: newUser._id},
process.env.SECRET_KEY,{
expiresIn: '1h'
});
res.status(200).json({success: [{message:"Registered successfully!!"}], user:newUser, token});
} catch (error) {
    res.status(400).json({errors:[{message:"Can't register!"}]});
}
};

exports.login = async(req, res)=>{
    try {
        const {email, password} = req.body;
        const foundUser = await User.findOne({email});
        if(!foundUser){
            return res.status(400).json({errors:[{message: "Bad Credentials"}]});
        }
        const checkPassword = await bcrypt.compare(password, foundUser.password) 
        if(!checkPassword){
            return res.status(400).json({errors:[{message: "Bad Credentials2"}]});
        }
        const token = jwt.sign({id: foundUser._id},
            process.env.SECRET_KEY,
            {expiresIn:"2h"}
        );
        res.status(200).json({success:[{message: "login successfully"}], user:foundUser, token})
    } catch (error) {
        res.status(400).json({errors:[{message:"Can't login!"}]});
    }
    
}