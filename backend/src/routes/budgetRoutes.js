const express = require('express');
const router = express.Router();
const controller = require('../controllers/budgetController');

router.get('/', controller.readBudget);
router.post('/', controller.createBudget);
router.patch('/:id', controller.updateBudget)
router.delete('/:id', controller.deleteBudget);

module.exports = router;
