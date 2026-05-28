# public-transportation

Московский транспортный портал. ЛР4 — серверная часть на Express.js.

## Структура

```
src/
  controllers/   — обработчики маршрутов
  routes/        — определения API (/transport)
  services/      — бизнес-логика, чтение/запись JSON
  data/          — transport.json (данные карточек)
  index.js       — точка входа, запуск сервера
```

## Запуск

```bash
npm install
npm start        # → http://localhost:3000
npm run dev      # с nodemon
```

## API

| Метод | Путь              | Описание                  |
|-------|-------------------|---------------------------|
| GET   | /transport        | Все карточки              |
| GET   | /transport/:id    | Одна карточка по id       |
| POST  | /transport        | Создать карточку          |
| PATCH | /transport/:id    | Обновить карточку         |
| DELETE| /transport/:id    | Удалить карточку          |

## Данные

Хранятся в `src/data/transport.json`, персистятся между перезапусками.
