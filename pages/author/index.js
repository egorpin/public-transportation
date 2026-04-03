
export class AuthorPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div class="container">
            <h1>Информация о разработчике</h1>
            <div class="author-card">
                <details open>
                    <summary>Разработчик</summary>
                    <p><b>ФИО:</b> Пингин Егор Витальевич<br><b>Группа:</b> ИУ5-46Б</p>
                </details>
            </div>
        </div>
        `;
    }

    render() {

        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
    }
}
