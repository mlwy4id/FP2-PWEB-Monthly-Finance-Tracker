const express = require('express');
const router = express.Router();
const controller = require('../controllers/incomeController');

router.get('/', controller.readIncome);
router.post('/', controller.createIncome);
router.patch('/:id', controller.updateIncome)
router.delete('/:id', controller.deleteIncome);

module.exports = router;
