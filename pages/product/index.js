import { BackButtonComponent } from "../../components/back-button/index.js";
import { ProductComponent } from "../../components/product/index.js";
import { MainPage } from "../main/index.js";
import { ThreeDViewerComponent } from "../../components/three-d-viewer/index.js";

export class ProductPage {
    constructor(parent, data) {
        this.parent = parent;
        this.data = data;
        this.viewer = null;
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
        if (this.viewer) {
            this.viewer.dispose();
            this.viewer = null;
        }
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    loadModel() {
        const viewerArea = document.getElementById('model-viewer-area');
        if (!viewerArea || !this.data.model) return;

        this.viewer = new ThreeDViewerComponent(viewerArea, 560, 350);
        this.viewer.init(viewerArea);
        this.viewer.loadModel('glbmodels/' + this.data.model);
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

        this.loadModel();
    }
}
