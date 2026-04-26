import { utility_indicator_ajax } from "../../modules/utility_indicator_ajax.js";
import { utility_indicator_urls } from "../../modules/utility_indicator_urls.js";
import { utility_indicator_MainPage } from "../utility_indicator_main/utility_indicator.js";
import { utility_indicator_HomeButtonComponent } from "../../utility_indicator_components/utility_indicator_home-button/utility_indicator.js";

// URL изображения по умолчанию
const DEFAULT_IMAGE_URL = "https://avatars.mds.yandex.net/i?id=e74a5eca858c831fb3971b48dc7a6befed46c5a6-12439438-images-thumbs&n=13";

export class utility_indicator_EditPage {
    constructor(utility_indicator_parent, utility_indicator_id) {
        this.utility_indicator_parent = utility_indicator_parent;
        this.utility_indicator_id = utility_indicator_id; // может быть null для создания новой услуги
        this.utility_indicator_serviceData = null;
        this.utility_indicator_isNew = !utility_indicator_id; // true если создаем новую
    }

    utility_indicator_getHTML() {
        const titleText = this.utility_indicator_isNew ? 'Добавление новой услуги' : 'Редактирование услуги';
        return `
            <div id="utility_indicator_edit-page">
                <div id="utility_indicator_header-container" class="header" style="background-color: white; border-bottom: 1px solid #e0e0e0; padding: 1rem 0; margin-bottom: 2rem;">
                    <div class="container">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div id="utility_indicator_home-button-container"></div>
                            <div style="width: 100px;"></div>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-8">
                            <div class="card" style="border: 1px solid #91bbe6; border-radius: 10px;">
                                <div class="card-header" style="background-color: #edf4fc; padding: 20px; border-bottom: 1px solid #91bbe6;">
                                    <h3 class="mb-0" style="color: #333;">${titleText}</h3>
                                </div>
                                <div class="card-body" style="padding: 30px;">
                                    ${!this.utility_indicator_isNew ? `
                                    <div id="utility_indicator_loading" style="text-align: center; padding: 50px;">
                                        Загрузка данных...
                                    </div>
                                    ` : ''}
                                    <form id="utility_indicator_edit-form" style="${!this.utility_indicator_isNew ? 'display: none;' : ''}">
                                        <div class="mb-3">
                                            <label for="utility_indicator_title" class="form-label" style="font-weight: 500;">Название услуги</label>
                                            <input type="text" class="form-control" id="utility_indicator_title" required style="border: 1px solid #91bbe6; border-radius: 5px; padding: 10px;">
                                        </div>
                                        <div class="mb-3">
                                            <label for="utility_indicator_src" class="form-label" style="font-weight: 500;">URL изображения</label>
                                            <input type="url" class="form-control" id="utility_indicator_src" placeholder="${DEFAULT_IMAGE_URL}" style="border: 1px solid #91bbe6; border-radius: 5px; padding: 10px;">
                                            <small class="form-text text-muted">Оставьте пустым, чтобы использовать изображение по умолчанию</small>
                                        </div>
                                        <div class="mb-3">
                                            <label for="utility_indicator_tariff" class="form-label" style="font-weight: 500;">Тариф</label>
                                            <input type="text" class="form-control" id="utility_indicator_tariff" required style="border: 1px solid #91bbe6; border-radius: 5px; padding: 10px;">
                                        </div>
                                        <div class="mb-3">
                                            <label for="utility_indicator_description" class="form-label" style="font-weight: 500;">Описание</label>
                                            <textarea class="form-control" id="utility_indicator_description" rows="5" required style="border: 1px solid #91bbe6; border-radius: 5px; padding: 10px;"></textarea>
                                        </div>
                                        <div class="d-flex gap-2">
                                            <button type="submit" class="btn" style="background-color: #ff8f00; color: white; border: none; padding: 10px 30px;">
                                                Сохранить
                                            </button>
                                            <button type="button" id="utility_indicator_cancel-btn" class="btn" style="background-color: #ff8f00; color: white; border: none; padding: 10px 30px;">
                                                Отмена
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    utility_indicator_loadData() {
        if (this.utility_indicator_isNew) return;
        
        const loadingDiv = document.getElementById('utility_indicator_loading');
        const form = document.getElementById('utility_indicator_edit-form');
        
        utility_indicator_ajax.utility_indicator_get(
            utility_indicator_urls.utility_indicator_getServiceById(this.utility_indicator_id),
            (data, status) => {
                if (status === 200 && data) {
                    this.utility_indicator_serviceData = data;
                    if (loadingDiv) loadingDiv.style.display = 'none';
                    if (form) form.style.display = 'block';
                    this.utility_indicator_fillForm();
                } else {
                    console.error('Ошибка загрузки данных');
                    if (loadingDiv) {
                        loadingDiv.innerHTML = 'Ошибка загрузки данных. Попробуйте снова.';
                    }
                }
            }
        );
    }

    utility_indicator_fillForm() {
        if (!this.utility_indicator_serviceData) return;
        
        const titleInput = document.getElementById('utility_indicator_title');
        const srcInput = document.getElementById('utility_indicator_src');
        const tariffInput = document.getElementById('utility_indicator_tariff');
        const descriptionInput = document.getElementById('utility_indicator_description');
        
        if (titleInput) titleInput.value = this.utility_indicator_serviceData.title || '';
        if (srcInput) srcInput.value = this.utility_indicator_serviceData.src || '';
        if (tariffInput) tariffInput.value = this.utility_indicator_serviceData.tariff || '';
        if (descriptionInput) descriptionInput.value = this.utility_indicator_serviceData.description || '';
    }

    utility_indicator_getFormData() {
        let srcValue = document.getElementById('utility_indicator_src').value;
        
        // Если поле URL пустое, используем изображение по умолчанию
        if (!srcValue || srcValue.trim() === '') {
            srcValue = DEFAULT_IMAGE_URL;
        }
        
        return {
            title: document.getElementById('utility_indicator_title').value,
            src: srcValue,
            tariff: document.getElementById('utility_indicator_tariff').value,
            description: document.getElementById('utility_indicator_description').value
        };
    }

    utility_indicator_saveData(event) {
        event.preventDefault();
        
        const updatedData = this.utility_indicator_getFormData();
        
        if (this.utility_indicator_isNew) {
            // Создание новой услуги
            utility_indicator_ajax.utility_indicator_post(
                utility_indicator_urls.utility_indicator_createService(),
                updatedData,
                (data, status) => {
                    if (status === 201) {
                        this.utility_indicator_goBack();
                    } else {
                        console.error('Ошибка при создании услуги:', status, data);
                    }
                }
            );
        } else {
            // Обновление существующей
            utility_indicator_ajax.utility_indicator_patch(
                utility_indicator_urls.utility_indicator_updateService(this.utility_indicator_id),
                updatedData,
                (data, status) => {
                    if (status === 200) {
                        this.utility_indicator_goBack();
                    } else {
                        console.error('Ошибка при обновлении услуги:', status, data);
                    }
                }
            );
        }
    }

    utility_indicator_goBack() {
        const mainPage = new utility_indicator_MainPage(this.utility_indicator_parent);
        mainPage.utility_indicator_render();
    }

    utility_indicator_addListeners() {
        const form = document.getElementById('utility_indicator_edit-form');
        if (form) {
            form.addEventListener('submit', this.utility_indicator_saveData.bind(this));
        }
        
        const cancelBtn = document.getElementById('utility_indicator_cancel-btn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', this.utility_indicator_goBack.bind(this));
        }
    }

    utility_indicator_render() {
        this.utility_indicator_parent.innerHTML = '';
        const html = this.utility_indicator_getHTML();
        this.utility_indicator_parent.insertAdjacentHTML('beforeend', html);
        
        const utility_indicator_homeButtonContainer = document.getElementById('utility_indicator_home-button-container');
        const utility_indicator_homeButton = new utility_indicator_HomeButtonComponent(utility_indicator_homeButtonContainer);
        utility_indicator_homeButton.utility_indicator_render(this.utility_indicator_goBack.bind(this));
        
        // Для новой карточки устанавливаем значение по умолчанию в поле URL
        if (this.utility_indicator_isNew) {
            const srcInput = document.getElementById('utility_indicator_src');
            if (srcInput) {
                srcInput.value = DEFAULT_IMAGE_URL;
            }
        } else {
            this.utility_indicator_loadData();
        }
        
        this.utility_indicator_addListeners();
    }
}