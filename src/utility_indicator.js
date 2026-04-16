const express = require('express');
const path = require('path');
const utility_indicatorRouter = require('./utility_indicator_routes/utility_indicatorRouter');
const utility_indicatorService = require('./utility_indicator_services/utility_indicatorService');

const app = express();
const PORT = 3000;

// Определяем путь к файлу данных
const UTILITY_DATA_FILE_PATH = path.join(__dirname, 'utility_indicator_data/utility_indicator.json');

// Инициализируем сервис с путем к файлу данных
utility_indicatorService.utility_init(UTILITY_DATA_FILE_PATH);

// 1. Встроенный middleware для парсинга JSON
app.use(express.json());

// 2. Логирующий middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// 3. Подключение маршрутов
app.use('/utility_indicator', utility_indicatorRouter);

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