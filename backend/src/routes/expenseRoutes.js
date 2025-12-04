const express = require('express');
const router = express.Router();
const controller = require('../controllers/expenseController');

router.get('/', controller.readExpense);
router.post('/', controller.createExpense);
router.patch('/', controller.updateExpense)
router.delete('/', controller.deleteExpense);

module.exports = router;
