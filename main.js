document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("card-container");

    // Modal elements
    const modal = document.getElementById("transport-modal");
    const modalClose = document.getElementById("modal-close");
    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-desc");
    const modalDetails = document.getElementById("modal-details");

    function openModal(item) {
        modalImg.src = item.img;
        modalImg.alt = item.title;
        modalTitle.textContent = item.title;
        modalDesc.textContent = item.desc;

        // Render extra details if available
        if (item.details && modalDetails) {
            modalDetails.innerHTML = item.details.map(d => `
                <div class="modal-detail-row">
                    <span class="modal-detail-label">${d.label}</span>
                    <span class="modal-detail-value">${d.value}</span>
                </div>
            `).join('');
        }

        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }

    if (modalClose) modalClose.addEventListener("click", closeModal);
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });
    }
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });

    function createCard(item) {
        return `
            <article class="transport-card" tabindex="0" role="button" aria-label="Подробнее о ${item.title}">
                <div class="card-img-wrap">
                    <img src="${item.img}" alt="${item.title}" class="card-img" loading="lazy">
                    <div class="card-img-overlay">
                        <span class="card-overlay-text">Узнать больше</span>
                    </div>
                </div>
                <div class="card-content">
                    <span class="card-type-badge">${item.type || 'Транспорт'}</span>
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                    <div class="card-footer-row">
                        <button class="card-detail-btn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                            Подробнее
                        </button>
                    </div>
                </div>
            </article>
        `;
    }

    fetch('/api/items')
        .then(response => response.json())
        .then(data => {
            container.innerHTML = data.map(item => createCard(item)).join('');

            // Attach click handlers
            container.querySelectorAll('.transport-card').forEach((card, index) => {
                const item = data[index];
                const open = () => openModal(item);
                card.addEventListener("click", open);
                card.addEventListener("keydown", (e) => {
                    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
                });
            });
        })
        .catch(err => {
            console.error("Ошибка загрузки данных:", err);
            container.innerHTML = "<p>Не удалось загрузить данные.</p>";
        });
});
