const express = require('express');
const router = express.Router();
const controller = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, controller.readBudget);
router.post('/', protect, controller.createBudget);
router.patch('/', protect, controller.updateBudget)
router.delete('/', protect, controller.deleteBudget);

module.exports = router;
