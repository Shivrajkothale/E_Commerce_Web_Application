// backend/controllers/orderController.js
const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc Create new order
// @route POST /api/orders
// @access Private
const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress, paymentMethod } = req.body;
  if (!items || items.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  // compute prices (simple)
  const itemsPrice = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const shippingPrice = itemsPrice > 500 ? 0 : 50;
  const taxPrice = +(itemsPrice * 0.1).toFixed(2);
  const totalPrice = +(itemsPrice + shippingPrice + taxPrice).toFixed(2);

  // create order
  const order = new Order({
    user: req.user._id,
    items,
    shippingAddress,
    paymentMethod,
    itemsPrice, shippingPrice, taxPrice, totalPrice
  });

  // reduce stock
  for (const it of items) {
    const prod = await Product.findById(it.product);
    if (prod) {
      prod.stock = Math.max(0, prod.stock - it.quantity);
      await prod.save();
    }
  }

  const created = await order.save();
  res.status(201).json(created);
});

// @desc Get order by id
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (order) res.json(order);
  else {
    res.status(404);
    throw new Error('Order not found');
  }
});

module.exports = { createOrder, getOrderById };
