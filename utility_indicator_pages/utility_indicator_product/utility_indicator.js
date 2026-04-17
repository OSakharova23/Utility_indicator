import { utility_indicator_ProductComponent } from "../../utility_indicator_components/utility_indicator_product/utility_indicator.js";
import { utility_indicator_MainPage } from "../utility_indicator_main/utility_indicator.js";
import { utility_indicator_HomeButtonComponent } from "../../utility_indicator_components/utility_indicator_home-button/utility_indicator.js";
import { utility_indicator_ajax } from "../../modules/utility_indicator_ajax.js";
import { utility_indicator_urls } from "../../modules/utility_indicator_urls.js";

export class utility_indicator_ProductPage {
    constructor(utility_indicator_parent, utility_indicator_id) {
        this.utility_indicator_parent = utility_indicator_parent;
        this.utility_indicator_id = utility_indicator_id;
        this.utility_indicator_serviceData = null;
    }

    utility_indicator_loadServiceData() {
        utility_indicator_ajax.utility_indicator_get(
            utility_indicator_urls.utility_indicator_getServiceById(this.utility_indicator_id),
            (data, status) => {
                if (status === 200 && data) {
                    this.utility_indicator_serviceData = data;
                    this.utility_indicator_renderProduct();
                } else {
                    console.error('Ошибка загрузки данных услуги');
                }
            }
        );
    }

    utility_indicator_renderProduct() {
        if (!this.utility_indicator_serviceData) return;
        
        const product = new utility_indicator_ProductComponent(this.utility_indicator_pageRoot);
        product.utility_indicator_render(this.utility_indicator_serviceData);
    }

    get utility_indicator_pageRoot() {
        return document.getElementById('utility_indicator_product-page');
    }

    utility_indicator_getHTML() {
        return `
            <div id="utility_indicator_product-page">
                <div id="utility_indicator_header-container" class="header" style="background-color: white; border-bottom: 1px solid #e0e0e0; padding: 1rem 0; margin-bottom: 2rem;">
                    <div class="container">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div id="utility_indicator_home-button-container"></div>
                            <div style="width: 100px;"></div>
                        </div>
                    </div>
                </div>
                <div class="container mt-4"></div>
            </div>
        `;
    }

    utility_indicator_goHome() {
        const mainPage = new utility_indicator_MainPage(this.utility_indicator_parent);
        mainPage.utility_indicator_render();
    }

    utility_indicator_render() {
        this.utility_indicator_parent.innerHTML = '';
        const html = this.utility_indicator_getHTML();
        this.utility_indicator_parent.insertAdjacentHTML('beforeend', html);
        
        const utility_indicator_homeButtonContainer = document.getElementById('utility_indicator_home-button-container');
        const utility_indicator_homeButton = new utility_indicator_HomeButtonComponent(utility_indicator_homeButtonContainer);
        utility_indicator_homeButton.utility_indicator_render(this.utility_indicator_goHome.bind(this));

        this.utility_indicator_loadServiceData();
    }
}