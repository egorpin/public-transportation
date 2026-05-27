import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { CalculatorPage } from "../calculator/index.js";
import { AuthorPage } from "../author/index.js";
import { ajax } from "../../modules/ajax.js";
import { transportUrls } from "../../modules/transportUrls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div id="main-page">
                <main class="main-landing">
                    <section class="hero-section">
                     <video class="hero-bg-video" autoplay muted loop playsinline>
                        <source
                            src="/media/small-vecteezy_timelapse-of-road-traffic-or-public-transport-rush-hour_29873425_small.mp4"
                            type="video/mp4">
                    </video>
                        <div class="hero-overlay"></div>
                        <div class="container hero-content">
                            <h1 class="hero-title">Движение — это жизнь<br>города</h1>
                            <p class="hero-subtitle">Единый транспортный портал предоставляет актуальную информацию о работе транспорта Москвы.</p>
                            <a id="calculator-btn" class="hero-btn">Рассчитать поездку</a>
                        </div>
                    </section>

                    <section class="transport-section">
                        <div class="container">
                            <div class="section-header">
                                <h2 class="page-title">Наш Транспорт</h2>
                                <p class="section-subtitle">Нажмите на карточку, чтобы узнать подробнее</p>
                            </div>
                            <div id="card-container" class="card-grid"></div>
                            <div class="section-header" style="margin-top: 2rem;">
                                <button id="add-random-card-btn" class="hero-btn" style="display:inline-block;">
                                    + Добавить карточку
                                </button>
                            </div>
                        </div>
                    </section>
                </main>

                <footer>
                    <div class="container">
                        <div class="footer-columns">
                            <div class="footer-col">
                                <h4>Пассажирам</h4>
                                <ul>
                                    <li><a href="#">Расписание</a></li>
                                    <li><a href="#">Тарифы</a></li>
                                </ul>
                            </div>
                            <div class="footer-col">
                                <h4>Организации</h4>
                                <ul>
                                    <li><a href="#">Дептранс</a></li>
                                    <li><a href="#">Метрополитен</a></li>
                                </ul>
                            </div>
                            <div class="footer-col">
                                <h4>Проекты</h4>
                                <ul>
                                    <li><a href="#">МЦД</a></li>
                                    <li><a href="#">Электробус</a></li>
                                </ul>
                            </div>
                            <div class="footer-col">
                                <h4>Связь</h4>
                                <ul>
                                    <li><a href="#">Контакты</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="footer-bottom">© 2026 Департамент транспорта Москвы</div>
                    </div>
                </footer>
            </div>
        `;
    }

    clickCard(item) {
        const productPage = new ProductPage(this.parent, item);
        productPage.render();
    }

    clickCalc() {
        const calcPage = new CalculatorPage(this.parent);
        calcPage.render();
    }

    clickAuthor() {
        const authorPage = new AuthorPage(this.parent);
        authorPage.render();
    }

    clickAddCard() {
        window.pageNavigation.goCreate();
    }

    renderData(items) {
        const cardContainer = document.getElementById('card-container');
        items.forEach(item => {
            const card = new ProductCardComponent(cardContainer);
            card.render(item, (data) => this.clickCard(data));
        });
    }

    async getData() {
        try {
            const { data } = await ajax.get(transportUrls.getTransport());
            this.renderData(data);
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        document.getElementById('nav-main').addEventListener('click', () => this.render());
        document.getElementById('calculator-btn').addEventListener('click', () => this.clickCalc());
        document.getElementById('nav-calc').addEventListener('click', () => this.clickCalc());
        document.getElementById('nav-author').addEventListener('click', () => this.clickAuthor());
        document.getElementById('add-random-card-btn').addEventListener('click', () => this.clickAddCard());
        this.getData();
    }
}