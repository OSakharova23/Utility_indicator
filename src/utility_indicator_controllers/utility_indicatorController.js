const utility_indicatorService = require('../utility_indicator_services/utility_indicatorService');

const utility_getAllUtilities = (req, res) => {
    const { title } = req.query;
    const utilities = utility_indicatorService.utility_findAll(title);
    res.json(utilities);
};

const utility_getUtilityById = (req, res) => {
    const id = parseInt(req.params.id);
    const utility = utility_indicatorService.utility_findOne(id);
    
    if (!utility) {
        return res.status(404).json({ error: 'Тариф не найден' });
    }
    
    res.json(utility);
};

const utility_createUtility = (req, res) => {
    const { title, src, tariff, description } = req.body;
    
    // Валидация
    if (!title || !src || !tariff || !description) {
        return res.status(400).json({ 
            error: 'Не все поля заполнены',
            required: ['title', 'src', 'tariff', 'description']
        });
    }
    
    const newUtility = utility_indicatorService.utility_create({ 
        title, 
        src, 
        tariff, 
        description 
    });
    res.status(201).json(newUtility);
};

const utility_updateUtility = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedUtility = utility_indicatorService.utility_update(id, req.body);
    
    if (!updatedUtility) {
        return res.status(404).json({ error: 'Тариф не найден' });
    }
    
    res.json(updatedUtility);
};

const utility_deleteUtility = (req, res) => {
    const id = parseInt(req.params.id);
    const success = utility_indicatorService.utility_remove(id);
    
    if (!success) {
        return res.status(404).json({ error: 'Тариф не найден' });
    }
    
    res.status(204).send(); // 204 No Content
};

module.exports = {
    utility_getAllUtilities,
    utility_getUtilityById,
    utility_createUtility,
    utility_updateUtility,
    utility_deleteUtility
};