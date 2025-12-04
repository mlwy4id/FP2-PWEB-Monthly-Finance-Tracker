const express = require('express');
const router = express.Router();
const controller = require('../controllers/incomeController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, controller.readIncome);
router.post('/', protect, controller.createIncome);
router.patch('/', protect, controller.updateIncome)
router.delete('/', protect, controller.deleteIncome);

module.exports = router;
