const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // assuming your product model is registered as 'product'
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // referencing your user model
    required: true,
    unique: true,
  },
  items: [cartItemSchema],
}, { timestamps: true });

const Cart = mongoose.model('cart', cartSchema);
module.exports = Cart;
