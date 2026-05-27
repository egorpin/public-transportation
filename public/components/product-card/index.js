export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <article class="transport-card" tabindex="0" role="button" aria-label="Подробнее о ${data.title}" data-id="${data.id}">
                <div class="card-img-wrap">
                    <img src="${data.img}" alt="${data.title}" class="card-img" loading="lazy">
                    <div class="card-img-overlay">
                        <span class="card-overlay-text">Узнать больше</span>
                    </div>
                </div>
                <div class="card-content">
                    <span class="card-type-badge">${data.type}</span>
                    <h3>${data.title}</h3>
                    <p>${data.desc}</p>
                    <div class="card-footer-row">
                        <button class="card-detail-btn" data-id="${data.id}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                            Подробнее
                        </button>
                    </div>
                </div>
            </article>
        `;
    }

    render(data, onClick) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));

        const cards = this.parent.querySelectorAll(`.transport-card[data-id="${data.id}"]`);
        const card = cards[cards.length - 1];
        if (card) {
            const open = () => onClick(data);
            card.addEventListener('click', open);
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
            });
        }
    }
}
