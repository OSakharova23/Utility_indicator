const rent_utilitiesService = require('../rent_services/rent_utilitiesService');

const rent_getAllUtilities = (req, res) => {
    const { title } = req.query;
    const utilities = rent_utilitiesService.rent_findAll(title);
    res.json(utilities);
};

const rent_getUtilityById = (req, res) => {
    const id = parseInt(req.params.id);
    const utility = rent_utilitiesService.rent_findOne(id);
    
    if (!utility) {
        return res.status(404).json({ error: 'Тариф не найден' });
    }
    
    res.json(utility);
};

const rent_createUtility = (req, res) => {
    const { title, src, tariff, description } = req.body;
    
    // Валидация
    if (!title || !src || !tariff || !description) {
        return res.status(400).json({ 
            error: 'Не все поля заполнены',
            required: ['title', 'src', 'tariff', 'description']
        });
    }
    
    const newUtility = rent_utilitiesService.rent_create({ 
        title, 
        src, 
        tariff, 
        description 
    });
    res.status(201).json(newUtility);
};

const rent_updateUtility = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedUtility = rent_utilitiesService.rent_update(id, req.body);
    
    if (!updatedUtility) {
        return res.status(404).json({ error: 'Тариф не найден' });
    }
    
    res.json(updatedUtility);
};

const rent_deleteUtility = (req, res) => {
    const id = parseInt(req.params.id);
    const success = rent_utilitiesService.rent_remove(id);
    
    if (!success) {
        return res.status(404).json({ error: 'Тариф не найден' });
    }
    
    res.status(204).send(); // 204 No Content
};

module.exports = {
    rent_getAllUtilities,
    rent_getUtilityById,
    rent_createUtility,
    rent_updateUtility,
    rent_deleteUtility
};