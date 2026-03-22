const express = require('express');
const path = require('path');
const rent_utilitiesRouter = require('./rent_routes/rent_utilities');
const rent_utilitiesService = require('./rent_services/rent_utilitiesService');

const app = express();
const PORT = 3000;

// Определяем путь к файлу данных
const RENT_DATA_FILE_PATH = path.join(__dirname, 'rent_data/rent_utilities.json');

// Инициализируем сервис с путем к файлу данных
rent_utilitiesService.rent_init(RENT_DATA_FILE_PATH);

// 1. Встроенный middleware для парсинга JSON
app.use(express.json());

// 2. Логирующий middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// 3. Подключение маршрутов
app.use('/rent_utilities', rent_utilitiesRouter);

// 4. Глобальная обработка 404
app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

// error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

// Настройка форматирования JSON ответов
app.set('json spaces', 2);

// 5. Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});
