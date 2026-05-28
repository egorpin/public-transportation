# public-transportation

Московский транспортный портал. ЛР6 — Promise, fetch, Vite bundle.

## Оглавление

- [Описание](#описание)
- [Функциональность](#функциональность)
- [Структура файлов](#структура-файлов)
- [Сборка (Vite)](#сборка-vite)
- [Сервер](#сервер)
- [Запуск](#запуск)

## Описание

Приложение представляет собой полнофункциональный Московский транспортный портал. В этой лабораторной работе клиентская часть переписана с XMLHttpRequest на современный `fetch` + `async/await`, а сборка клиента осуществляется через Vite. Сервер раздаёт собранную статику, что устраняет проблемы с CORS.

## Функциональность

### Клиентская часть
- Запросы через `fetch` + `async/await` вместо XMLHttpRequest
- Сборка через Vite в папку `public/`
- Структурированная архитектура: страницы, компоненты, модули

### Серверная часть (lab4-bundle)
- Express.js REST API
- Раздача клиентской статики (`public/`) — same-origin, CORS не требуется
- Хранение данных в JSON-файле

### Компоненты и страницы
- **MainPage** — получение и отображение списка карточек
- **ProductPage** — просмотр деталей транспорта
- **CreatePage** — форма создания новой карточки
- **CalculatorPage** — калькулятор тарифов
- **AuthorPage** — информация об авторе
- **ProductCardComponent** — карточка транспортного средства
- **BackButtonComponent** — кнопка возврата

## Структура файлов

```
/index.html                 — корневой HTML (SPA)
/main.js                    — точка входа
/style.css                  — стили приложения
/vite.config.js             — конфигурация Vite
/pages/                     — страницы
  /main/index.js            — главная страница
  /main/data.js             — данные карточек
  /product/index.js         — страница деталей
  /create/index.js          — форма создания карточки
  /calculator/index.js      — калькулятор тарифов
  /author/index.js         — страница автора
/components/                — компоненты
  /product-card/index.js    — карточка транспорта
  /product/index.js         — детальная информация
  /back-button/index.js     — кнопка возврата
  /three-d-viewer/          — 3D-просмотрщик
/modules/
  /ajax.js                  — fetch-обёртка (async get, post, patch, delete)
  /transportUrls.js        — эндпоинты API
/public/                    — собранная статика (результат `npm run build`)
```

## Сборка (Vite)

```bash
npm run build        # → public/ (результат сборки)
npm run preview      # превью production-сборки
npm run dev          # dev-сервер → http://localhost:5173
```

**vite.config.js:**
```js
export default {
  build: {
    outDir: './public',
    emptyOutDir: true,
  },
};
```

## Сервер

Express.js REST API с раздачей статики. Запуск:

```bash
npm install
npm start            # → http://localhost:3000
```

`src/index.js` раздаёт папку `public/` в качестве статики. Same-origin подключение клиента — CORS не требуется.

## Запуск

```bash
# клиент (dev)
npm install
npm run dev          # → http://localhost:5173

# сервер (生产)
cd lab4-bundle
npm install
npm start            # → http://localhost:3000
```