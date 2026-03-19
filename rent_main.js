import { MainPage } from "./rent_pages/rent_main/rent_index.js";

const root = document.getElementById('root');

const mainPage = new MainPage(root);
mainPage.render();