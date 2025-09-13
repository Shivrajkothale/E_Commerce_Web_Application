// backend/controllers/productController.js
const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const Category = require('../models/Category');

// @desc Get products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().populate('category', 'name');
  res.json(products);
});

// @desc Get single product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category', 'name');
  if (product) res.json(product);
  else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc Create product (admin)
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock, categoryId, imageUrl } = req.body;
  const product = new Product({
    name, description, price, stock, category: categoryId, imageUrl
  });
  const created = await product.save();
  res.status(201).json(created);
});

// @desc Update product (admin)
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock, categoryId, imageUrl } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.stock = stock ?? product.stock;
    product.category = categoryId ?? product.category;
    product.imageUrl = imageUrl ?? product.imageUrl;
    const updated = await product.save();
    res.json(updated);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc Delete product (admin)
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
