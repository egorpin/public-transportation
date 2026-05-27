# public-transportation

Московский транспортный портал. Домашняя работа — расширенное приложение на основе ЛР3.

## Структура

```
pages/              — страницы (MainPage, ProductPage, CalculatorPage, AuthorPage)
components/         — компоненты (ProductCard, Product, BackButton, ThreeDViewer)
script.js           — JS-логика калькулятора (window.onload)
main.js             — точка входа
index.html          — корневой HTML
```

## Запуск

```bash
npm install bootstrap
npx vite        # dev сервер → http://localhost:5173
```

Либо открыть `index.html` через VS Code + Live Server.

## Описание

На основе ЛР3: добавлены страница калькулятора с задачами на маршрутизацию транспорта, 3D-модель (Three.js), страница автора. Калькулятор работает через `script.js` (window.onload). Карточки транспорта отображаются на главной странице.
