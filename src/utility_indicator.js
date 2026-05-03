const express = require('express');
const path = require('path');
const utility_indicatorRouter = require('./utility_indicator_routes/utility_indicatorRouter');
const utility_indicatorService = require('./utility_indicator_services/utility_indicatorService');

const app = express();
const PORT = 3000;

// ===== РАЗДАЧА СТАТИЧЕСКИХ ФАЙЛОВ (СОБРАННЫЙ ФРОНТЕНД) =====
app.use(express.static(path.join(__dirname, '../public')));

// Определяем путь к файлу данных
const UTILITY_DATA_FILE_PATH = path.join(__dirname, 'utility_indicator_data/utility_indicator.json');

// Инициализируем сервис с путем к файлу данных
utility_indicatorService.utility_init(UTILITY_DATA_FILE_PATH);

// Middleware для парсинга JSON
app.use(express.json());

// Логирующий middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Подключение маршрутов API
app.use('/utility_indicator', utility_indicatorRouter);

// Для всех остальных маршрутов отдаем HTML (SPA)
app.use((req, res, next) => {
    if (!req.path.startsWith('/utility_indicator') && !req.path.includes('.')) {
        res.sendFile(path.join(__dirname, '../public', 'utility_indicator.html'));
    } else {
        next();
    }
});

// Глобальная обработка 404 для API
app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

// error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.set('json spaces', 2);

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});