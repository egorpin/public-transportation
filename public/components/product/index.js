export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        const detailsHTML = data.details
            ? data.details.map(d => `
                <div class="modal-detail-row">
                    <span class="modal-detail-label">${d.label}</span>
                    <span class="modal-detail-value">${d.value}</span>
                </div>
            `).join('')
            : '';

        const modelHTML = data.model
            ? `<div class="model-viewer-container" id="model-viewer-area"></div>`
            : '';

        const imgHTML = data.img
            ? `<div class="modal-img-wrap">
                    <img src="${data.img}" alt="${data.title}" class="modal-img">
                    <div class="modal-img-gradient"></div>
               </div>`
            : '';

        return `
            ${modelHTML}
            ${imgHTML}
            <div class="modal-body">
                <h2 class="modal-title">${data.title}</h2>
                <p class="modal-desc">${data.desc}</p>
                ${detailsHTML ? `<div class="modal-details-grid">${detailsHTML}</div>` : ''}
            </div>
        `;
    }

    render(data) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
    }
}
