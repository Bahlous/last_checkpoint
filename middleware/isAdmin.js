const jwt = require("jsonwebtoken");
const User = require("../models/User");


const isAdmin = async (req, res, next) => {
  try {
    //token exists?
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(400).json({ errors: [{ msg: "Not token" }] });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    const foundUser = await User.findOne({ _id: decode.id });
    if (!foundUser) {
      return res.status(400).json({ errors: [{ msg: "User not found" }] });
    }

    if (!foundUser.isAdmin) {
      return res.status(400).json({ errors: [{ msg: "Not Admin" }] });
    }

    req.user = foundUser;
    next();
  } catch (error) {
    res.status(400).json({ errors: [{ msg: "Can't verify" }] });
  }
};


module.exports = isAdmin;