// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUserProfile, forgotPassword } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);
router.post('/forgot-password', forgotPassword);

module.exports = router;
