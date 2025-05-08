const express = require('express');
const router = express.Router();
const User = require('../models/User');
// const { getUserCart } = require('../controllers/cart.controller');
const isAuth = require('../middleware/isAuth');
const { addToCart, getCart, updateCartItem, removeFromCart } = require('../controllers/cart.controller');

// GET /api/cart - get user's cart
// router.get('/', getUserCart);
//test pour verifier que la route fonctionne
// router.get('/test', (req,res)=>{
//   res.send('bonjour on est vendredi!')
// })

// POST /api/cart - add item

router.post('/addToCart', isAuth, addToCart)
router.get('/getCart', isAuth, getCart)
router.put('/:productId', isAuth, updateCartItem)
router.delete('/:productId', isAuth, removeFromCart)

// DELETE /api/cart/:productId - remove item
// router.delete('/:productId', async (req, res) => {
//   const user = await User.findById(req.user._id);
//   user.cart = user.cart.filter(i => i.productId.toString() !== req.params.productId);
//   await user.save();
//   res.json(user.cart);
// });

module.exports = router;
