import { MainPage } from "./pages/main/index.js";
import { CreatePage } from "./pages/create/index.js";

const root = document.getElementById('root');

window.pageNavigation = {
    goMain: () => {
        const page = new MainPage(root);
        page.render();
    },
    goCreate: () => {
        const page = new CreatePage(root);
        page.render();
    }
};

const mainPage = new MainPage(root);
mainPage.render();
