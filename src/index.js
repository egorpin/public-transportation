const express = require('express');
const path = require('path');
const transportRouter = require('./routes/transport');
const transportService = require('./services/transportService');

const app = express();
const PORT = 3000;

const DATA_FILE_PATH = path.join(__dirname, 'data/transport.json');
transportService.init(DATA_FILE_PATH);

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use('/transport', transportRouter);

// Serve built frontend bundle as static assets
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

app.use((err, req, res, next) => {
    console.error('ERROR:', err.message, err.stack);
    res.status(500).json({ error: 'Внутренняя ошибка сервера', detail: err.message });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});