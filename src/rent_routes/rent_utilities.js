const express = require('express');
const router = express.Router();
const rent_utilitiesController = require('../rent_controllers/rent_utilitiesController');

// Определение маршрутов
router.get('/', rent_utilitiesController.rent_getAllUtilities);
router.get('/:id', rent_utilitiesController.rent_getUtilityById);
router.post('/', rent_utilitiesController.rent_createUtility);
router.patch('/:id', rent_utilitiesController.rent_updateUtility);
router.delete('/:id', rent_utilitiesController.rent_deleteUtility);

module.exports = router;