const express = require('express');
const router = express.Router();
const utility_indicatorController = require('../utility_indicator_controllers/utility_indicatorController');

// Определение маршрутов
router.get('/', utility_indicatorController.utility_getAllUtilities);
router.get('/:id', utility_indicatorController.utility_getUtilityById);
router.post('/', utility_indicatorController.utility_createUtility);
router.patch('/:id', utility_indicatorController.utility_updateUtility);
router.delete('/:id', utility_indicatorController.utility_deleteUtility);

module.exports = router;