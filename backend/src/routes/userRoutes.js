const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

router.post('/register', controller.createUser);
router.post('/login', controller.loginUser);

router.get('/self', protect, controller.getUser);           
router.put('/self', protect, controller.updateUser); 
router.delete('/self', protect, controller.deleteUser); 

module.exports = router;