const utility_fileService = require('./utility_fileService');

// Переменная для хранения пути к файлу данных
let utility_dataFilePath;

// Функция инициализации сервиса с путем к файлу данных
const utility_init = (filePath) => {
    utility_dataFilePath = filePath;
};

const utility_findAll = (title) => {
    const utilities = utility_fileService.utility_readData(utility_dataFilePath);
    if (title) {
        return utilities.filter(utility => 
            utility.title.toLowerCase().includes(title.toLowerCase())
        );
    }
    return utilities;
};

const utility_findOne = (id) => {
    const utilities = utility_fileService.utility_readData(utility_dataFilePath);
    return utilities.find(utility => utility.id === id);
};

const utility_create = (utilityData) => {
    const utilities = utility_fileService.utility_readData(utility_dataFilePath);
    
    // Генерация ID: берем максимальный ID + 1
    const newId = utilities.length > 0 
        ? Math.max(...utilities.map(u => u.id)) + 1 
        : 1;
        
    const newUtility = { id: newId, ...utilityData };
    utilities.push(newUtility);
    utility_fileService.utility_writeData(utility_dataFilePath, utilities);
    
    return newUtility;
};

const utility_update = (id, utilityData) => {
    const utilities = utility_fileService.utility_readData(utility_dataFilePath);
    const index = utilities.findIndex(u => u.id === id);
    
    if (index === -1) return null;
    
    utilities[index] = { ...utilities[index], ...utilityData };
    utility_fileService.utility_writeData(utility_dataFilePath, utilities);
    
    return utilities[index];
};

const utility_remove = (id) => {
    const utilities = utility_fileService.utility_readData(utility_dataFilePath);
    const filteredUtilities = utilities.filter(u => u.id !== id);
    
    if (filteredUtilities.length === utilities.length) {
        return false; // Ничего не удалили
    }
    
    utility_fileService.utility_writeData(utility_dataFilePath, filteredUtilities);
    return true;
};

module.exports = { utility_init, utility_findAll, utility_findOne, utility_create, utility_update, utility_remove };