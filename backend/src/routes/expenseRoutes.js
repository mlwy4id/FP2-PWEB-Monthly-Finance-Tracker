const express = require('express');
const router = express.Router();
const controller = require('../controllers/expenseController');

router.get('/', controller.readExpense);
router.post('/', controller.createExpense);
router.patch('/:id', controller.updateExpense)
router.delete('/:id', controller.deleteExpense);

module.exports = router;
