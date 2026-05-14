const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const transport = [
    {
        id: 1,
        title: "Трамвай Витязь-М",
        type: "Трамвай",
        model: "Tram.glb",
        desc: "Тихий и комфортный трамвай нового поколения с низким полом.",
        img: "https://upload.wikimedia.org/wikipedia/commons/1/10/71-931m_in_curve.jpg",
        details: [
            { label: "Производитель", value: "ПК Транспортные системы" },
            { label: "Вместимость", value: "265 пассажиров" },
            { label: "Макс. скорость", value: "75 км/ч" },
            { label: "Длина", value: "26,3 м" },
            { label: "Низкий пол", value: "100%" },
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
            { label: "Зарядка", value: "15 мин" },
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
            { label: "Вагонов", value: "8" },
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
            { label: "Маршруты", value: "5 линий" },
            { label: "Вместимость", value: "до 200 пассажиров" },
            { label: "Скорость", value: "до 35 км/ч" },
            { label: "Сезон", value: "Круглогодично" },
            {label: "Оплата", value: "Тройка, карта" },
            { label: "Wi-Fi", value: "Есть" }
        ]
    }
];

let nextId = 5;

function sendJSON(res, status, data) {
    res.writeHead(status, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end();
        return;
    }

    const url = new URL(req.url, `http://localhost:${PORT}`);
    const pathname = url.pathname;

    if (req.method === 'GET' && pathname === '/transport') {
        sendJSON(res, 200, transport);
        return;
    }

    if (req.method === 'GET' && pathname.startsWith('/transport/')) {
        const id = parseInt(pathname.split('/')[2]);
        const item = transport.find(t => t.id === id);
        if (item) {
            sendJSON(res, 200, item);
        } else {
            sendJSON(res, 404, { error: 'Not found' });
        }
        return;
    }

    if (req.method === 'POST' && pathname === '/transport') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const newItem = {
                    id: nextId++,
                    title: data.title || 'Без названия',
                    type: data.type || 'Транспорт',
                    model: data.model || '',
                    desc: data.desc || '',
                    img: data.img || 'https://upload.wikimedia.org/wikipedia/commons/1/10/71-931m_in_curve.jpg',
                    details: data.details || []
                };
                transport.push(newItem);
                sendJSON(res, 201, newItem);
            } catch (e) {
                sendJSON(res, 400, { error: 'Invalid JSON' });
            }
        });
        return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
