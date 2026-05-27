import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { ajax } from "../../modules/ajax.js";
import { transportUrls } from "../../modules/transportUrls.js";

export class CreatePage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('create-page');
    }

    getHTML() {
        return `
            <div id="create-page">
                <main>
                    <div class="container">
                        <div id="back-btn-area"></div>
                        <div class="content-card">
                            <h1 style="margin-bottom:8px;">Добавить карточку</h1>
                            <p style="color:#8E8E8E;margin-bottom:32px;">Заполните поля и нажмите «Сохранить»</p>
                            <form id="create-form">
                                <div class="form-group">
                                    <label for="field-title">Название</label>
                                    <input type="text" id="field-title" placeholder="Например: Трамвай Витязь-М" required>
                                </div>
                                <div class="form-group">
                                    <label for="field-type">Тип транспорта</label>
                                    <input type="text" id="field-type" placeholder="Например: Трамвай" required>
                                </div>
                                <div class="form-group">
                                    <label for="field-desc">Описание</label>
                                    <textarea id="field-desc" rows="3" placeholder="Краткое описание..." required></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="field-img">URL изображения</label>
                                    <input type="url" id="field-img" placeholder="https://example.com/image.jpg">
                                </div>
                                <div class="form-actions">
                                    <button type="submit" class="hero-btn" style="padding:14px 40px;">Сохранить</button>
                                </div>
                                <div id="form-message" style="margin-top:16px;font-size:15px;"></div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        `;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    async submitForm(e) {
        e.preventDefault();
        const title = document.getElementById('field-title').value.trim();
        const type = document.getElementById('field-type').value.trim();
        const desc = document.getElementById('field-desc').value.trim();
        const img = document.getElementById('field-img').value.trim();

        if (!title || !type || !desc) return;

        const msg = document.getElementById('form-message');
        msg.style.color = '#8E8E8E';
        msg.textContent = 'Сохранение...';

        const data = { title, type, desc, img };
        try {
            const { status } = await ajax.post(transportUrls.createTransport(), data);
            if (status === 201 || status === 200) {
                msg.style.color = '#16a34a';
                msg.textContent = 'Карточка успешно добавлена!';
                setTimeout(() => this.clickBack(), 1000);
            } else {
                msg.style.color = '#D9232E';
                msg.textContent = `Ошибка (статус ${status}).`;
            }
        } catch (err) {
            msg.style.color = '#D9232E';
            msg.textContent = 'Ошибка сети: сервер недоступен.';
        }
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const backArea = document.getElementById('back-btn-area');
        const backBtn = new BackButtonComponent(backArea);
        backBtn.render(this.clickBack.bind(this));

        document.getElementById('create-form').addEventListener('submit', (e) => this.submitForm(e));
    }
}