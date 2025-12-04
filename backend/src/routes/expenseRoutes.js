const express = require('express');
const router = express.Router();
const controller = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, controller.readExpense);
router.post('/', protect, controller.createExpense);
router.patch('/', protect, controller.updateExpense)
router.delete('/', protect, controller.deleteExpense);

module.exports = router;
