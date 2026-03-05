const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Раздача статических файлов (html, css, js)
app.use(express.static(__dirname));

// Данные для карточек (имитация базы данных)
const transportData = [
    { id: 1, title: "Трамвай Витязь-М", desc: "Тихий и комфортный трамвай.", img: "https://upload.wikimedia.org/wikipedia/commons/1/10/71-931m_in_curve.jpg" },
    { id: 2, title: "Электробус КАМАЗ", desc: "Экологичный городской транспорт нового поколения.", img: "https://upload.wikimedia.org/wikipedia/commons/7/7a/KamAZ-6282_electric_bus_on_line_T25_in_Moscow.jpg" },
    { id: 3, title: "Поезд метро Москва-2024", desc: "Современный состав с широкими дверями и USB-разъемами.", img: "https://storage.yandexcloud.net/moskvichmag/uploads/2023/08/poe1.jpg" },
    { id: 4, title: "Речной трамвай", desc: "Регулярный водный транспорт столицы.", img: "https://7d9e88a8-f178-4098-bea5-48d960920605.selcdn.net/20b409b7-60ab-4c5d-8b66-855dfb1c0eb0/" }
];

// API endpoint для получения данных
app.get('/api/items', (req, res) => {
    res.json(transportData);
});

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});
