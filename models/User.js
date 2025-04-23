const mongoose = require('mongoose')


// const cartItemSchema = new mongoose.Schema({
//     productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//     quantity: { type: Number, default: 1 },
//   });

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },

    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required:true,
    },
    phone: Number,
    isAdmin:{
        type: Boolean,
        default: false
    },
    // cart: [cartItemSchema],
},
       {timestamps:true}
);

const User = mongoose.model('user', userSchema);
module.exports = User;