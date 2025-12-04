const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

// Import Middleware
const { protect } = require('../middleware/authMiddleware');

// --- Public Routes (No Token Needed) ---
router.post('/register', controller.createUser);
router.post('/login', controller.loginUser);

// --- Protected Routes (Token Required) ---
// All these routes refer to the "current" user (me) based on the token
router.get('/self', protect, controller.getUser);           // Get my info
router.put('/self', protect, controller.updateUser); // Update my username
router.delete('/self', protect, controller.deleteUser); // Delete my account

module.exports = router;