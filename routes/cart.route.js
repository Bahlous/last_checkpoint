const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { getUserCart } = require('../controllers/cart.controller');
const isAuth = require('../middleware/isAuth');

// GET /api/cart - get user's cart
router.get('/', getUserCart);

// POST /api/cart - add item
router.post('/', isAuth , async (req, res) => {
  const { productId } = req.body;
  const user = await User.findById(req.user._id);
  const item = user.cart.find(i => i.productId.toString() === productId);

  if (item) {
    item.quantity += 1;
  } else {
    user.cart.push({ productId, quantity: 1 });
  }

  await user.save();
  res.json(user.cart);
});

// DELETE /api/cart/:productId - remove item
router.delete('/:productId', async (req, res) => {
  const user = await User.findById(req.user._id);
  user.cart = user.cart.filter(i => i.productId.toString() !== req.params.productId);
  await user.save();
  res.json(user.cart);
});

module.exports = router;
