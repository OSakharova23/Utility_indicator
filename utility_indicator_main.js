import {utility_indicator_MainPage} from "./utility_indicator_pages/utility_indicator_main/utility_indicator.js";

const root = document.getElementById('utility_indicator_root');

const mainPage = new utility_indicator_MainPage(root);
mainPage.utility_indicator_render();