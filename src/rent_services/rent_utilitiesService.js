const rent_fileService = require('./rent_fileService');

// Переменная для хранения пути к файлу данных
let rent_dataFilePath;

// Функция инициализации сервиса с путем к файлу данных
const rent_init = (filePath) => {
    rent_dataFilePath = filePath;
};

const rent_findAll = (title) => {
    const utilities = rent_fileService.rent_readData(rent_dataFilePath);
    if (title) {
        return utilities.filter(utility => 
            utility.title.toLowerCase().includes(title.toLowerCase())
        );
    }
    return utilities;
};

const rent_findOne = (id) => {
    const utilities = rent_fileService.rent_readData(rent_dataFilePath);
    return utilities.find(utility => utility.id === id);
};

const rent_create = (utilityData) => {
    const utilities = rent_fileService.rent_readData(rent_dataFilePath);
    
    // Генерация ID: берем максимальный ID + 1
    const newId = utilities.length > 0 
        ? Math.max(...utilities.map(u => u.id)) + 1 
        : 1;
        
    const newUtility = { id: newId, ...utilityData };
    utilities.push(newUtility);
    rent_fileService.rent_writeData(rent_dataFilePath, utilities);
    
    return newUtility;
};

const rent_update = (id, utilityData) => {
    const utilities = rent_fileService.rent_readData(rent_dataFilePath);
    const index = utilities.findIndex(u => u.id === id);
    
    if (index === -1) return null;
    
    utilities[index] = { ...utilities[index], ...utilityData };
    rent_fileService.rent_writeData(rent_dataFilePath, utilities);
    
    return utilities[index];
};

const rent_remove = (id) => {
    const utilities = rent_fileService.rent_readData(rent_dataFilePath);
    const filteredUtilities = utilities.filter(u => u.id !== id);
    
    if (filteredUtilities.length === utilities.length) {
        return false; // Ничего не удалили
    }
    
    rent_fileService.rent_writeData(rent_dataFilePath, filteredUtilities);
    return true;
};

module.exports = { rent_init, rent_findAll, rent_findOne, rent_create, rent_update, rent_remove };