# public-transportation

Московский транспортный портал. ЛР6 — Promise, fetch, Vite bundle.

## Замена XMLHttpRequest на fetch

Все запросы переписаны с XMLHttpRequest (коллбэки) на `fetch` + `async/await`.

**modules/ajax.js:**
```js
async get(url) {
    const response = await fetch(url);
    return { data: await response.json(), status: response.status };
}
async post(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return { data: await response.json(), status: response.status };
}
```

`modules/transportUrls.js`: `baseUrl = ''` (same-origin).

## Сборка (Vite)

```bash
npm run build        # → public/
npm run preview      # preview production
npm run dev          # dev → http://localhost:5173
```

**vite.config.js:**
```js
export default { build: { outDir: './public', emptyOutDir: true } };
```

## Сервер (lab4-bundle)

Express.js API + статика. Запуск:

```bash
npm install
npm start            # → http://localhost:3000
```

`src/index.js` раздает `public/` статикой, same-origin — CORS не нужен.
