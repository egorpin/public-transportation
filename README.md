# public-transportation

Московский транспортный портал. ЛР3 — двухстраничное веб-приложение, верстка.

## Структура

```
pages/           — страницы (MainPage, ProductPage)
components/      — компоненты (ProductCard, Product, BackButton)
main.js          — точка входа
index.html       — корневой HTML
```

## Запуск

```bash
npm install bootstrap
# dev сервер
npx vite        # → http://localhost:5173
```

Либо открыть `index.html` через VS Code + Live Server.

## Описание

Карточки транспорта (трамвай, электробус и т.д.) отрисовываются на JS через DOM API. Нажатие на карточку открывает страницу деталей. Данные захардкожены в коде. Bootstrap 5 подключен через npm.