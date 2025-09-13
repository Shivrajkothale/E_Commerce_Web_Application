// backend/seed/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');

dotenv.config();
connectDB();

const seed = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();

    const adminPass = await bcrypt.hash('admin123', 10);
    const admin = await User.create({ name: 'Admin', email: 'admin@example.com', password: adminPass, role: 'admin' });

    const cat1 = await Category.create({ name: 'Electronics', description: 'Gadgets' });
    const cat2 = await Category.create({ name: 'Clothing', description: 'Apparel' });

    await Product.create([
  {
    name: 'iPhone 14 Pro',
    price: 120000,
    category: cat1._id,
    description: 'Latest Apple flagship smartphone.',
    imageUrl: 'https://images.unsplash.com/photo-1677144646095-ecd95d06cd71?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'Samsung Galaxy S23',
    price: 90000,
    category: cat1._id,
    description: 'Premium Android smartphone.',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: "Men's T-Shirt",
    price: 1200,
    category: cat2._id,
    description: 'Comfortable cotton t-shirt.',
    imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Apple MacBook Air M2',
    price: 105000,
    category: cat1._id,
    description: 'Supercharged by the Apple M2 chip.',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: "Women's Dress",
    price: 2500,
    category: cat2._id,
    description: 'Elegant summer dress.',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: "Men's Jeans",
    price: 2200,
    category: cat2._id,
    description: 'Classic blue denim jeans.',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1674828600712-7d0caab39109?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWVuJTIwamVhbnN8ZW58MHx8MHx8fDA%3D'
  },
  {
    name: "Women's Handbag",
    price: 3500,
    category: cat2._id,
    description: 'Stylish leather handbag.',
    imageUrl: 'https://images.unsplash.com/photo-1751522937993-46b83342398b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW5zJTIwaGFuZGJhZ3N8ZW58MHx8MHx8fDA%3D'
  }
]);

    console.log('Seed done');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
