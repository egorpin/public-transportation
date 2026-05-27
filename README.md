# public-transportation

Московский транспортный портал. ЛР5 — клиентская часть: XMLHttpRequest + API.

## Структура

```
pages/              — страницы (MainPage, CreatePage, ProductPage, CalculatorPage)
components/         — компоненты
modules/
  ajax.js          — XMLHttpRequest-обёртка (get, post)
  transportUrls.js — эндпоинты API
server.js           — Node.js HTTP-сервер (API карточек, in-memory)
```

## Запуск

```bash
npm start        # сервер → http://localhost:3000
# + CORS Unblock в браузере для dev
```

## Ключевое

- Запросы через `modules/ajax.js` (XMLHttpRequest)
- `modules/transportUrls.js` хранит baseUrl и эндпоинты
- `pages/main/index.js` — GET /transport, рендер карточек
- `pages/create/index.js` — POST /transport, форма создания
- `server.js` — in-memory хранилище, GET/POST

## API

| Метод | Путь           | Описание          |
|-------|----------------|-------------------|
| GET   | /transport     | Все карточки      |
| GET   | /transport/:id | Одна карточка     |
| POST  | /transport     | Создать карточку  |
