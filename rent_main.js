import {rent_MainPage} from "./rent_pages/rent_main/rent.js";

const root = document.getElementById('rent_root');

const mainPage = new rent_MainPage(root);
mainPage.rent_render();