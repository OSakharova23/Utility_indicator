import {utility_indicator_ProductPage} from "../utility_indicator_product/utility_indicator.js";
import {utility_indicator_ProductCardComponent} from "../../utility_indicator_components/utility_indicator_product-card/utility_indicator.js";
import {utility_indicator_HomeButtonComponent} from "../../utility_indicator_components/utility_indicator_home-button/utility_indicator.js";

export class utility_indicator_MainPage {
    constructor(utility_indicator_parent) {
        this.utility_indicator_parent = utility_indicator_parent;
        this.utility_indicator_products = this.utility_indicator_getInitialProductData();
        this.utility_indicator_filteredProducts = [...this.utility_indicator_products];
        this.utility_indicator_nextId = 6;
    }

    utility_indicator_getInitialProductData() {
        return [
            {
                id: 1,
                src: "https://avatars.mds.yandex.net/i?id=3e1afc4c618c981a5646813503c98e2c_l-10250781-images-thumbs&n=13",
                title: "Холодное водоснабжение",
                text: "",
                tariff: "65.77 ₽/м³"
            },
            {
                id: 2,
                src: "https://main-cdn.sbermegamarket.ru/big2/hlr-system/-89/798/166/711/114/7/600008682549b3.jpg",
                title: "Горячее водоснабжение",
                text: "",
                tariff: "302.82 ₽/м³"
            },
            {
                id: 3,
                src: "https://resizer.mail.ru/p/42f4c5b1-a868-5ab5-b0b9-448fc42555df/AQAX39JBF5VPEtmJ8E487-Ib-I-U3UzNHPbd5XQBztIosCNRoz8ctENAgF-mY6WmGnJmWXmibucl4TCbldBLJt0kbvQ.jpg",
                title: "Электроэнергия",
                text: "",
                tariff: "5.92 ₽/кВт·ч"
            },
            {
                id: 4,
                src: "https://static.vmr-mosreg.ru/682/330/57b/68233057b427a834748581.jpg",
                title: "Обращение с твёрдыми коммунальными отходами",
                text: "",
                tariff: "49.93 ₽/м²"
            },
            {
                id: 5,
                src: "https://avatars.mds.yandex.net/get-ydo/12406519/2a00000191f28de9732ff366cd5a8a42f1c7/diploma",
                title: "Взнос на капитальный ремонт",
                text: "",
                tariff: "29.66 ₽/м²"
            },
        ]
    }

    get utility_indicator_pageRoot() {
        return document.getElementById('utility_indicator_main-page');
    }

    utility_indicator_getHTML() {
        return (
            `
                <div id="utility_indicator_main-page">
                    <div id="utility_indicator_header-container" class="header" style="background-color: white; border-bottom: 1px solid #e0e0e0; padding: 1rem 0; margin-bottom: 2rem;">
                        <div class="container">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div id="utility_indicator_home-button-container"></div>
                                <div style="width: 100px;"></div>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; gap: 15px; flex-wrap: wrap;">
                            <div style="flex: 1; min-width: 250px;">
                                <input 
                                    type="text" 
                                    id="utility_indicator_search-input" 
                                    placeholder="Поиск по названию услуги..." 
                                    style="width: 100%; padding: 10px 15px; border: 2px solid #91bbe6; border-radius: 5px; font-size: 1rem; outline: none;"
                                />
                            </div>
                            <button id="utility_indicator_add-button" style="background-color: #ff8f00; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 1rem; font-weight: 500;">
                                + Добавить услугу
                            </button>
                        </div>
                        <div id="utility_indicator_product-card-container"></div>
                        <div id="utility_indicator_no-results" style="display: none; text-align: center; padding: 50px; color: #666; font-size: 1.2rem;">
                            Ничего не найдено. Попробуйте изменить запрос.
                        </div>
                    </div>
                </div>
            `
        )
    }

    utility_indicator_filterProducts(utility_indicator_searchTerm) {
        if (!utility_indicator_searchTerm.trim()) {
            this.utility_indicator_filteredProducts = [...this.utility_indicator_products];
        } else {
            this.utility_indicator_filteredProducts = this.utility_indicator_products.filter(product => 
                product.title.toLowerCase().includes(utility_indicator_searchTerm.toLowerCase())
            );
        }
        
        this.utility_indicator_updateProductCards();
        
        const utility_indicator_noResultsDiv = document.getElementById('utility_indicator_no-results');
        if (utility_indicator_noResultsDiv) {
            if (this.utility_indicator_filteredProducts.length === 0) {
                utility_indicator_noResultsDiv.style.display = 'block';
            } else {
                utility_indicator_noResultsDiv.style.display = 'none';
            }
        }
    }

    utility_indicator_clickCard(e) {
        const cardId = e.target.dataset.id;
        const productPage = new utility_indicator_ProductPage(this.utility_indicator_parent, cardId);
        productPage.utility_indicator_render();
    }

    utility_indicator_deleteCard(cardId) {
        this.utility_indicator_products = this.utility_indicator_products.filter(product => product.id !== parseInt(cardId));
        this.utility_indicator_filteredProducts = this.utility_indicator_filteredProducts.filter(product => product.id !== parseInt(cardId));
        
        this.utility_indicator_updateProductCards();
        
        const utility_indicator_searchInput = document.getElementById('utility_indicator_search-input');
        if (utility_indicator_searchInput) {
            this.utility_indicator_filterProducts(utility_indicator_searchInput.value);
        }
    }

    utility_indicator_addCard() {
        const utility_indicator_sourceList = this.utility_indicator_filteredProducts.length > 0 ? this.utility_indicator_filteredProducts : this.utility_indicator_products;
        const utility_indicator_firstCard = utility_indicator_sourceList[0];
        const utility_indicator_newCard = {
            ...utility_indicator_firstCard,
            id: this.utility_indicator_nextId++,
            title: `${utility_indicator_firstCard.title}`,
            tariff: utility_indicator_firstCard.tariff
        };
        
        this.utility_indicator_products.push(utility_indicator_newCard);
        
        const utility_indicator_searchInput = document.getElementById('utility_indicator_search-input');
        if (utility_indicator_searchInput) {
            this.utility_indicator_filterProducts(utility_indicator_searchInput.value);
        } else {
            this.utility_indicator_updateProductCards();
        }
    }

    utility_indicator_updateProductCards() {
        const utility_indicator_productCardContainer = document.getElementById('utility_indicator_product-card-container');
        if (utility_indicator_productCardContainer) {
            utility_indicator_productCardContainer.innerHTML = '';
            if (this.utility_indicator_filteredProducts.length > 0) {
                const productCard = new utility_indicator_ProductCardComponent(utility_indicator_productCardContainer);
                productCard.utility_indicator_render(this.utility_indicator_filteredProducts, this.utility_indicator_clickCard.bind(this), this.utility_indicator_deleteCard.bind(this));
            }
        }
    }

    utility_indicator_goHome() {
        this.utility_indicator_products = this.utility_indicator_getInitialProductData();
        this.utility_indicator_filteredProducts = [...this.utility_indicator_products];
        this.utility_indicator_nextId = 6;
        this.utility_indicator_render();
    }

    utility_indicator_addListeners() {
        const utility_indicator_homeButton = document.getElementById("utility_indicator_home-button");
        if (utility_indicator_homeButton) {
            utility_indicator_homeButton.addEventListener("click", this.utility_indicator_goHome.bind(this));
        }
        
        const utility_indicator_addButton = document.getElementById("utility_indicator_add-button");
        if (utility_indicator_addButton) {
            utility_indicator_addButton.addEventListener("click", this.utility_indicator_addCard.bind(this));
        }
        
        const utility_indicator_searchInput = document.getElementById("utility_indicator_search-input");
        if (utility_indicator_searchInput) {
            utility_indicator_searchInput.addEventListener("input", (e) => {
                this.utility_indicator_filterProducts(e.target.value);
            });
        }
    }

    utility_indicator_render() {
        this.utility_indicator_parent.innerHTML = '';
        const html = this.utility_indicator_getHTML();
        this.utility_indicator_parent.insertAdjacentHTML('beforeend', html);
        
        const utility_indicator_homeButtonContainer = document.getElementById('utility_indicator_home-button-container');
        const utility_indicator_homeButton = new utility_indicator_HomeButtonComponent(utility_indicator_homeButtonContainer);
        utility_indicator_homeButton.utility_indicator_render(this.utility_indicator_goHome.bind(this));

        this.utility_indicator_addListeners();

        this.utility_indicator_filteredProducts = [...this.utility_indicator_products];
        
        const utility_indicator_productCardContainer = document.getElementById('utility_indicator_product-card-container');
        if (this.utility_indicator_filteredProducts.length > 0) {
            const productCard = new utility_indicator_ProductCardComponent(utility_indicator_productCardContainer);
            productCard.utility_indicator_render(this.utility_indicator_filteredProducts, this.utility_indicator_clickCard.bind(this), this.utility_indicator_deleteCard.bind(this));
        }
    }
}