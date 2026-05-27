# public-transportation

Московский транспортный портал. ЛР4-bundle — Express.js API + собранный фронтенд (static).

## Запуск

```bash
npm install
npm start        # → http://localhost:3000
```

## Структура

```
src/
  controllers/   — обработчики маршрутов
  routes/        — /transport API
  services/      — бизнес-логика, чтение/запись JSON
  data/          — transport.json
  index.js       — Express + app.use(express.static('../public'))

public/
  index.html      — точка входа
  assets/         — собранный JS/CSS (Vite)
  bootstrap/      — bootstrap.bundle.min.js
  media/         — видео
  glbmodels/      — 3D модели
  components/     — статичные JS-компоненты
```

## Особенности

- Фронтенд собран через Vite, результат в `public/`
- `src/index.js` раздает `public/` статикой: `/` → index.html, `/assets/` → JS/CSS
- Same-origin: CORS не нужен

## API

| Метод | Путь              | Описание              |
|-------|-------------------|-----------------------|
| GET   | /transport        | Все карточки          |
| GET   | /transport/:id    | Одна карточка по id   |
| POST  | /transport        | Создать карточку      |
| PATCH | /transport/:id    | Обновить карточку     |
| DELETE| /transport/:id    | Удалить карточку      |

## Пересборка фронтенда

```bash
# в checkout лабораторных с исходниками
npm run build        # результат → public/
```
