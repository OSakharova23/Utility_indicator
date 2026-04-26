const express = require('express');
const path = require('path');
const utility_indicatorRouter = require('./utility_indicator_routes/utility_indicatorRouter');
const utility_indicatorService = require('./utility_indicator_services/utility_indicatorService');

const app = express();
const PORT = 3000;

// Раздача статики
app.use(express.static(path.join(__dirname, '../public')));

// Путь к файлу данных
const UTILITY_DATA_FILE_PATH = path.join(__dirname, 'utility_indicator_data/utility_indicator.json');
utility_indicatorService.utility_init(UTILITY_DATA_FILE_PATH);

// Парсинг JSON
app.use(express.json());

// Парсинг text/plain (важно для CORS обхода!)
app.use(express.text({ type: 'text/plain' }));

// Преобразование text/plain в JSON
app.use((req, res, next) => {
    if (req.is('text/plain') && req.body && typeof req.body === 'string') {
        try {
            req.body = JSON.parse(req.body);
        } catch (e) {}
    }
    next();
});

// Логирование
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Маршруты API
app.use('/utility_indicator', utility_indicatorRouter);

// SPA fallback
app.use((req, res, next) => {
    if (!req.path.startsWith('/utility_indicator') && !req.path.includes('.')) {
        res.sendFile(path.join(__dirname, '../public', 'utility_indicator.html'));
    } else {
        next();
    }
});

// 404
app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

// error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.set('json spaces', 2);

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});