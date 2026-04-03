export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document
            .getElementById('back-button')
            .addEventListener('click', listener);
    }

    getHTML() {
        return `
            <button id="back-button" class="hero-btn" style="margin-bottom:24px;display:inline-block">
                ← Назад к списку
            </button>
        `;
    }

    render(listener) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        this.addListeners(listener);
    }
}
