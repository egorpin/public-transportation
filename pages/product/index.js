import { BackButtonComponent } from "../../components/back-button/index.js";
import { ProductComponent } from "../../components/product/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
    constructor(parent, data) {
        this.parent = parent;
        this.data = data;
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `
            <div id="product-page">
                <main>
                    <div class="container">
                        <div id="back-btn-area"></div>
                        <div class="content-card" id="product-detail-area"></div>
                    </div>
                </main>
            </div>
        `;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const backArea = document.getElementById('back-btn-area');
        const backBtn = new BackButtonComponent(backArea);
        backBtn.render(this.clickBack.bind(this));

        const detailArea = document.getElementById('product-detail-area');
        const product = new ProductComponent(detailArea);
        product.render(this.data);
    }
}
