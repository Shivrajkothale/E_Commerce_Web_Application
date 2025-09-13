// backend/controllers/cartController.js
const asyncHandler = require('express-async-handler');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc Get user cart
// @route GET /api/cart
// @access Private
const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  res.json(cart || { user: req.user._id, items: [] });
});

// @desc Add or update cart item
// @route POST /api/cart
// @access Private
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ user: req.user._id });
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  if (!cart) {
    cart = new Cart({ user: req.user._id, items: [{ product: productId, quantity }] });
  } else {
    const idx = cart.items.findIndex(item => item.product.toString() === productId);
    if (idx >= 0) cart.items[idx].quantity = quantity;
    else cart.items.push({ product: productId, quantity });
  }
  await cart.save();
  const populated = await cart.populate('items.product');
  res.json(populated);
});

// @desc Remove item from cart
// @route DELETE /api/cart/:productId
// @access Private
const removeFromCart = asyncHandler(async (req, res) => {
  const productId = req.params.productId;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }
  cart.items = cart.items.filter(i => i.product.toString() !== productId);
  await cart.save();
  res.json(cart);
});

module.exports = { getCart, addToCart, removeFromCart };
