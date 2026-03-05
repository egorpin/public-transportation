document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("card-container");

    // Функция для отрисовки одной карточки
    function createCard(item) {
        return `
            <div class="transport-card">
                <img src="${item.img}" alt="${item.title}" class="card-img">
                <div class="card-content">
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                    <button class="my-btn primary card-btn" onclick="alert('Вы выбрали: ${item.title}')">Подробнее</button>
                </div>
            </div>
        `;
    }

    // Получение данных с сервера
    fetch('/api/items')
        .then(response => response.json())
        .then(data => {
            container.innerHTML = data.map(item => createCard(item)).join('');
        })
        .catch(err => {
            console.error("Ошибка загрузки данных:", err);
            container.innerHTML = "<p>Не удалось загрузить данные.</p>";
        });
});
