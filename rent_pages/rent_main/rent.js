import {rent_ProductPage} from "../rent_product/rent.js";
import {rent_CarouselComponent} from "../../rent_components/rent_carousel/rent.js";
import {rent_HomeButtonComponent} from "../../rent_components/rent_home-button/rent.js";

export class rent_MainPage {
    constructor(rent_parent) {
        this.rent_parent = rent_parent;
        this.rent_products = this.rent_getInitialProductData();
        this.rent_filteredProducts = [...this.rent_products];
        this.rent_nextId = 6;
    }

    rent_getInitialProductData() {
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

    get rent_pageRoot() {
        return document.getElementById('rent_main-page')
    }

    rent_getHTML() {
        return (
            `
                <div id="rent_main-page">
                    <div id="rent_header-container" class="header" style="background-color: #ff8f00; color: white; padding: 1rem 0; margin-bottom: 2rem;">
                        <div class="container">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <h1 style="margin: 0; font-size: 1.8rem;">Квартплата</h1>
                                <div id="rent_home-button-container"></div>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; gap: 15px; flex-wrap: wrap;">
                            <div style="flex: 1; min-width: 250px;">
                                <input 
                                    type="text" 
                                    id="rent_search-input" 
                                    placeholder="Поиск по названию услуги..." 
                                    style="width: 100%; padding: 10px 15px; border: 2px solid #ff8f00; border-radius: 5px; font-size: 1rem; outline: none;"
                                />
                            </div>
                            <button id="rent_add-button" style="background-color: #ff8f00; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 1rem; font-weight: 500;">
                                + Добавить услугу
                            </button>
                        </div>
                        <div id="rent_carousel-container"></div>
                        <div id="rent_no-results" style="display: none; text-align: center; padding: 50px; color: #666; font-size: 1.2rem;">
                            Ничего не найдено. Попробуйте изменить запрос.
                        </div>
                    </div>
                </div>
            `
        )
    }

    rent_filterProducts(rent_searchTerm) {
        if (!rent_searchTerm.trim()) {
            this.rent_filteredProducts = [...this.rent_products];
        } else {
            this.rent_filteredProducts = this.rent_products.filter(product => 
                product.title.toLowerCase().includes(rent_searchTerm.toLowerCase())
            );
        }
        
        this.rent_updateCarousel();
        
        const rent_noResultsDiv = document.getElementById('rent_no-results');
        if (rent_noResultsDiv) {
            if (this.rent_filteredProducts.length === 0) {
                rent_noResultsDiv.style.display = 'block';
            } else {
                rent_noResultsDiv.style.display = 'none';
            }
        }
    }

    rent_clickCard(e) {
        const cardId = e.target.dataset.id
        const productPage = new rent_ProductPage(this.rent_parent, cardId)
        productPage.rent_render()
    }

    rent_deleteCard(cardId) {
        this.rent_products = this.rent_products.filter(product => product.id !== parseInt(cardId));
        this.rent_filteredProducts = this.rent_filteredProducts.filter(product => product.id !== parseInt(cardId));
        
        this.rent_updateCarousel();
        
        const rent_searchInput = document.getElementById('rent_search-input');
        if (rent_searchInput) {
            this.rent_filterProducts(rent_searchInput.value);
        }
    }

    rent_addCard() {
        const rent_sourceList = this.rent_filteredProducts.length > 0 ? this.rent_filteredProducts : this.rent_products;
        const rent_firstCard = rent_sourceList[0];
        const rent_newCard = {
            ...rent_firstCard,
            id: this.rent_nextId++,
            title: `${rent_firstCard.title}`,
            tariff: rent_firstCard.tariff
        };
        
        this.rent_products.push(rent_newCard);
        
        const rent_searchInput = document.getElementById('rent_search-input');
        if (rent_searchInput) {
            this.rent_filterProducts(rent_searchInput.value);
        } else {
            this.rent_updateCarousel();
        }
    }

    rent_updateCarousel() {
        const rent_carouselContainer = document.getElementById('rent_carousel-container');
        if (rent_carouselContainer) {
            rent_carouselContainer.innerHTML = '';
            if (this.rent_filteredProducts.length > 0) {
                const carousel = new rent_CarouselComponent(rent_carouselContainer);
                carousel.rent_render(this.rent_filteredProducts, this.rent_clickCard.bind(this), this.rent_deleteCard.bind(this));
            }
        }
    }

    rent_goHome() {
        this.rent_products = this.rent_getInitialProductData();
        this.rent_filteredProducts = [...this.rent_products];
        this.rent_nextId = 6;
        this.rent_render();
    }

    rent_addListeners() {
        const rent_homeButton = document.getElementById("rent_home-button");
        if (rent_homeButton) {
            rent_homeButton.addEventListener("click", this.rent_goHome.bind(this));
        }
        
        const rent_addButton = document.getElementById("rent_add-button");
        if (rent_addButton) {
            rent_addButton.addEventListener("click", this.rent_addCard.bind(this));
        }
        
        const rent_searchInput = document.getElementById("rent_search-input");
        if (rent_searchInput) {
            rent_searchInput.addEventListener("input", (e) => {
                this.rent_filterProducts(e.target.value);
            });
        }
    }

    rent_render() {
        this.rent_parent.innerHTML = ''
        const html = this.rent_getHTML()
        this.rent_parent.insertAdjacentHTML('beforeend', html)
        
        const rent_homeButtonContainer = document.getElementById('rent_home-button-container')
        const rent_homeButton = new rent_HomeButtonComponent(rent_homeButtonContainer)
        rent_homeButton.rent_render(this.rent_goHome.bind(this))

        this.rent_addListeners();

        this.rent_filteredProducts = [...this.rent_products];
        
        const rent_carouselContainer = document.getElementById('rent_carousel-container')
        if (this.rent_filteredProducts.length > 0) {
            const carousel = new rent_CarouselComponent(rent_carouselContainer)
            carousel.rent_render(this.rent_filteredProducts, this.rent_clickCard.bind(this), this.rent_deleteCard.bind(this))
        }
    }
}