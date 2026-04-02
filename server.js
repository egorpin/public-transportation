const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

const transportData = [
    {
        id: 1,
        title: "Трамвай Витязь-М",
        type: "Трамвай",
        desc: "Тихий и комфортный трамвай нового поколения с низким полом.",
        img: "https://upload.wikimedia.org/wikipedia/commons/1/10/71-931m_in_curve.jpg",
        details: [
            { label: "Производитель", value: "ПК Транспортные системы" },
            { label: "Вместимость", value: "265 пассажиров" },
            { label: "Макс. скорость", value: "75 км/ч" },
            { label: "Длина состава", value: "26,3 м" },
            { label: "Низкий пол", value: "100% площади салона" },
            { label: "Климат-контроль", value: "Есть" }
        ]
    },
    {
        id: 2,
        title: "Электробус КАМАЗ",
        type: "Электробус",
        desc: "Экологичный городской транспорт нового поколения без выхлопа.",
        img: "https://upload.wikimedia.org/wikipedia/commons/7/7a/KamAZ-6282_electric_bus_on_line_T25_in_Moscow.jpg",
        details: [
            { label: "Производитель", value: "КАМАЗ" },
            { label: "Вместимость", value: "85 пассажиров" },
            { label: "Запас хода", value: "70 км" },
            { label: "Зарядка", value: "Ультрабыстрая, 15 мин" },
            { label: "Выбросы CO₂", value: "0 г/км" },
            { label: "USB-розетки", value: "Есть" }
        ]
    },
    {
        id: 3,
        title: "Поезд Москва-2024",
        type: "Метро",
        desc: "Современный состав с широкими дверями, USB-разъёмами и Wi-Fi.",
        img: "https://storage.yandexcloud.net/moskvichmag/uploads/2023/08/poe1.jpg",
        details: [
            { label: "Производитель", value: "Трансмашхолдинг" },
            { label: "Вместимость", value: "1680 пассажиров" },
            { label: "Макс. скорость", value: "90 км/ч" },
            { label: "Вагонов в составе", value: "8" },
            { label: "Wi-Fi", value: "Есть" },
            { label: "Климат-контроль", value: "Есть" }
        ]
    },
    {
        id: 4,
        title: "Речной трамвай",
        type: "Водный транспорт",
        desc: "Регулярный водный транспорт столицы вдоль Москвы-реки.",
        img: "https://7d9e88a8-f178-4098-bea5-48d960920605.selcdn.net/20b409b7-60ab-4c5d-8b66-855dfb1c0eb0/",
        details: [
            { label: "Маршруты", value: "5 регулярных линий" },
            { label: "Вместимость", value: "до 200 пассажиров" },
            { label: "Скорость", value: "до 35 км/ч" },
            { label: "Сезон", value: "Круглогодично" },
            { label: "Оплата", value: "Тройка, банковская карта" },
            { label: "Wi-Fi", value: "Есть" }
        ]
    }
];

app.get('/api/items', (req, res) => {
    res.json(transportData);
});

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});
