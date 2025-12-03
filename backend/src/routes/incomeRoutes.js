const express = require('express');
const router = express.Router();
const controller = require('../controllers/incomeController');

router.get('/', controller.readIncome);
router.post('/', controller.createIncome);
router.patch('/', controller.updateIncome)
router.delete('/', controller.deleteIncome);

module.exports = router;
