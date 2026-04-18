import { utility_indicator_ProductPage } from "../utility_indicator_product/utility_indicator.js";
import { utility_indicator_EditPage } from "../utility_indicator_edit/utility_indicator.js";
import { utility_indicator_ProductCardComponent } from "../../utility_indicator_components/utility_indicator_product-card/utility_indicator.js";
import { utility_indicator_HomeButtonComponent } from "../../utility_indicator_components/utility_indicator_home-button/utility_indicator.js";
import { utility_indicator_ajax } from "../../modules/utility_indicator_ajax.js";
import { utility_indicator_urls } from "../../modules/utility_indicator_urls.js";

export class utility_indicator_MainPage {
    constructor(utility_indicator_parent) {
        this.utility_indicator_parent = utility_indicator_parent;
        this.utility_indicator_products = [];
        this.utility_indicator_filteredProducts = [];
    }

    async utility_indicator_loadProducts(searchTerm = '') {
        try {
            let url = utility_indicator_urls.utility_indicator_getServices();
            if (searchTerm && searchTerm.trim()) {
                url += `?title=${encodeURIComponent(searchTerm.trim())}`;
            }
            
            const { data, status } = await utility_indicator_ajax.utility_indicator_get(url);
            
            if (status === 200 && data) {
                this.utility_indicator_products = data;
                this.utility_indicator_filteredProducts = [...data];
                this.utility_indicator_updateProductCards();
                
                const utility_indicator_noResultsDiv = document.getElementById('utility_indicator_no-results');
                if (utility_indicator_noResultsDiv) {
                    utility_indicator_noResultsDiv.style.display = this.utility_indicator_filteredProducts.length === 0 ? 'block' : 'none';
                }
            }
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
            alert('Не удалось загрузить данные');
        }
    }

    utility_indicator_filterProducts(utility_indicator_searchTerm) {
        this.utility_indicator_loadProducts(utility_indicator_searchTerm);
    }

    utility_indicator_clickCard(e) {
        const cardId = e.target.dataset.id;
        const productPage = new utility_indicator_ProductPage(this.utility_indicator_parent, cardId);
        productPage.utility_indicator_render();
    }

    utility_indicator_editCard(cardId) {
        const editPage = new utility_indicator_EditPage(this.utility_indicator_parent, cardId);
        editPage.utility_indicator_render();
    }

    async utility_indicator_deleteCard(cardId) {
        if (confirm('Вы уверены, что хотите удалить эту услугу?')) {
            try {
                const { status } = await utility_indicator_ajax.utility_indicator_delete(
                    utility_indicator_urls.utility_indicator_removeService(cardId)
                );
                
                if (status === 204) {
                    alert('Услуга успешно удалена');
                    this.utility_indicator_loadProducts();
                }
            } catch (error) {
                alert('Ошибка при удалении услуги');
                console.error('Ошибка удаления:', error);
            }
        }
    }

    async utility_indicator_addCard() {
        if (this.utility_indicator_filteredProducts.length === 0) {
            alert('Нет услуг для копирования');
            return;
        }
        
        const utility_indicator_firstCard = this.utility_indicator_filteredProducts[0];
        
        const utility_indicator_newCard = {
            title: utility_indicator_firstCard.title + " (копия)",
            src: utility_indicator_firstCard.src,
            tariff: utility_indicator_firstCard.tariff,
            description: utility_indicator_firstCard.description || "Описание услуги"
        };
        
        try {
            const { status } = await utility_indicator_ajax.utility_indicator_post(
                utility_indicator_urls.utility_indicator_createService(),
                utility_indicator_newCard
            );
            
            if (status === 201) {
                alert('Услуга успешно добавлена');
                this.utility_indicator_loadProducts();
            }
        } catch (error) {
            alert('Ошибка при добавлении услуги');
            console.error('Ошибка создания:', error);
        }
    }

    utility_indicator_updateProductCards() {
        const utility_indicator_productCardContainer = document.getElementById('utility_indicator_product-card-container');
        if (utility_indicator_productCardContainer) {
            utility_indicator_productCardContainer.innerHTML = '';
            if (this.utility_indicator_filteredProducts.length > 0) {
                const productCard = new utility_indicator_ProductCardComponent(utility_indicator_productCardContainer);
                productCard.utility_indicator_render(
                    this.utility_indicator_filteredProducts, 
                    this.utility_indicator_clickCard.bind(this), 
                    this.utility_indicator_deleteCard.bind(this),
                    this.utility_indicator_editCard.bind(this)
                );
            }
        }
    }

    utility_indicator_goHome() {
        this.utility_indicator_render();
    }

    utility_indicator_getHTML() {
        return `
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
        `;
    }

    utility_indicator_addListeners() {
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
        this.utility_indicator_loadProducts();
    }
}