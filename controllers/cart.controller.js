const Cart = require("../models/Cart");
const Product = require('../models/Product')


// // Add item to cart
// exports.addToCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { productId, quantity } = req.body;

//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       cart = new Cart({ userId, items: [] });
//     }

//     const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

//     if (itemIndex > -1) {
//       cart.items[itemIndex].quantity += quantity;
//     } else {
//       cart.items.push({ productId, quantity });
//     }

//     await cart.save();
//     res.status(200).json({ success: [{ message: "Item added to cart" }], cart });
//   } catch (error) {
//     res.status(400).json({ errors: [{ message: "Could not add to cart" }] });
//   }
// };

// -----------------------------------------------------------------------------------------
// ajouter au panier
exports.addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// voir mon panier
exports.getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId })
      // .populate('items.productId') // ✅ récupère les infos complètes du produit
      // .exec();

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//mise a jour du panier


exports.updateCartItem = async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.productId;
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // console.log('--- DEBUG ---');
    // console.log('Requested productId:', productId);
    // console.log('Cart items:', cart.items);

    cart.items.forEach(item => {
      const current = item.productId._id ? item.productId._id.toString() : item.productId.toString();
      console.log(`Comparing: ${current} === ${productId}`);
    });

    const item = cart.items.find(item => {
      const current = item.productId._id ? item.productId._id.toString() : item.productId.toString();
      return current === productId;
    });

    if (!item) {
      return res.status(404).json({ message: 'Product not in cart' });
    }

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({ message: 'Cart updated successfully', cart });
  } catch (err) {
    console.error('Error updating cart:', err);
    res.status(500).json({ error: err.message });
  }
};


//supp le panier


exports.removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.productId;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Avant suppression, vérifions que le produit existe
    const itemExists = cart.items.some(item => {
      const id = item.productId._id ? item.productId._id.toString() : item.productId.toString();
      return id === productId;
    });

    if (!itemExists) {
      return res.status(404).json({ message: 'Product not in cart' });
    }

    // Filtrage : on garde tous les items sauf celui à supprimer
    cart.items = cart.items.filter(item => {
      const id = item.productId._id ? item.productId._id.toString() : item.productId.toString();
      return id !== productId;
    });

    await cart.save();

    res.status(200).json({ message: 'Product removed from cart', cart });
  } catch (err) {
    console.error('Remove from cart error:', err);
    res.status(500).json({ error: err.message });
  }
};
