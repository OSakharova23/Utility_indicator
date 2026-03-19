import { ProductCardComponent } from "../../rent_components/rent_product-card/rent_index.js";
import { ProductPage } from "../rent_product/rent_index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        // Хранилище карточек
        this.cardsData = [
            {
                id: 1,
                src: "https://avatars.mds.yandex.net/i?id=3e1afc4c618c981a5646813503c98e2c_l-10250781-images-thumbs&n=13",
                title: "Холодное водоснабжение",
                text: ""
            },
            {
                id: 2,
                src: "https://avatars.mds.yandex.net/i?id=60e996a0c8681a9bd705339b1c7985b2_l-4549902-images-thumbs&n=13",
                title: "Горячее водоснабжение",
                text: ""
            },
            {
                id: 3,
                src: "https://resizer.mail.ru/p/42f4c5b1-a868-5ab5-b0b9-448fc42555df/AQAX39JBF5VPEtmJ8E487-Ib-I-U3UzNHPbd5XQBztIosCNRoz8ctENAgF-mY6WmGnJmWXmibucl4TCbldBLJt0kbvQ.jpg",
                title: "Электроэнергия",
                text: ""
            },
            {
                id: 4,
                src: "https://avatars.mds.yandex.net/get-ydo/12406519/2a00000191f28de9732ff366cd5a8a42f1c7/diploma",
                title: "Взнос на капитальный ремонт",
                text: ""
            }
        ];
        this.nextId = 5; // Для новых карточек
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }

    getHTML() {
        return (
            `
            <style>
                    /* Оранжевые стрелки для карусели */
                    .carousel-control-prev-icon,
                    .carousel-control-next-icon {
                        background-color: #ff8f00;
                        border-radius: 50%;
                        padding: 10px;
                        background-size: 50%;
                    }
                    
                    /* Оранжевые индикаторы */
                    .carousel-indicators [data-bs-target] {
                        background-color: #ff8f00;
                        opacity: 0.5;
                    }
                    
                    .carousel-indicators .active {
                        opacity: 1;
                    }
                    
                    /* Оранжевая кнопка */
                    .btn-orange {
                        background-color: #ff8f00;
                        border-color: #ff8f00;
                        color: white;
                        font-weight: 500;
                        margin: 0 5px;
                    }

                    .btn-orange:hover {
                        background-color: #ffc070;
                        border-color: #ffc070;
                        color: white;
                    }
                    
                    
                    /* Хедер */
                    .header {
                        background-color: #ff8f00;
                        padding: 15px 0;
                        margin-bottom: 20px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    
                    .header .container {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    
                    .header h1 {
                        color: white;
                        margin: 0;
                        font-size: 24px;
                    }
                    
                    .btn-home {
                        background-color: #ffc070;
                        color: white;
                        border: none;
                        padding: 8px 20px;
                        border-radius: 5px;
                        font-weight: 500;
                        cursor: pointer;
                    }
                    
                    .btn-home:hover {
                        background-color: white;
                        color: #ff8f00;
                    }
                    
                    /* Кнопка добавления */
                    .btn-add-container {
                        text-align: center;
                        margin: 20px 0;
                    }
                    
                </style>
                
                <div class="header">
                    <div class="container">
                        <h1>Квартплата</h1>
                        <button class="btn-home" id="home-button">Домой</button>
                    </div>
                </div>
                
                <div id="main-page" class="container mt-4">
                    <!-- Кнопка добавления карточки -->
                    <div class="btn-add-container">
                        <button class="btn btn-orange" id="add-card-btn">+ Добавить карточку</button>
                    </div>
                    
                    <div id="carouselServices" class="carousel slide" data-bs-ride="false">
                        <div class="carousel-indicators" id="carousel-indicators">
                            <!-- Индикаторы будут добавляться динамически -->
                        </div>
                        <div class="carousel-inner" id="carousel-items">
                            <!-- Сюда будут добавляться карточки -->
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselServices" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Предыдущий</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselServices" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Следующий</span>
                        </button>
                    </div>
                </div>
            `
        )
    }

    // Метод для добавления новой карточки (копирование первой)
    addCard() {
        if (this.cardsData.length > 0) {
            const firstCard = this.cardsData[0];
            const newCard = {
                ...firstCard,
                id: this.nextId++,
                title: firstCard.title + " (копия)",
                text: firstCard.text
            };
            this.cardsData.push(newCard);
            this.render(); // Перерисовываем страницу
        }
    }

    // Метод для удаления карточки
    deleteCard(id) {
        this.cardsData = this.cardsData.filter(card => card.id !== id);
        this.render(); // Перерисовываем страницу
    }

    clickCard(e) {
        const cardId = e.target.dataset.id
        console.log("Нажата карточка с ID:", cardId)
        
        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }
    
    // Метод для перехода на главную страницу (для кнопки Домой)
    goHome() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }
    
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        
        // Добавляем обработчик для кнопки "Домой"
        document.getElementById('home-button').addEventListener('click', this.goHome.bind(this))
        
        // Добавляем обработчик для кнопки добавления
        document.getElementById('add-card-btn').addEventListener('click', this.addCard.bind(this))
        
        // Получаем контейнеры для слайдов и индикаторов
        const carouselItems = document.getElementById('carousel-items')
        const carouselIndicators = document.getElementById('carousel-indicators')
        
        // Очищаем индикаторы
        carouselIndicators.innerHTML = ''
        
        // Создаем индикаторы
        this.cardsData.forEach((item, index) => {
            const isActive = index === 0 ? 'active' : ''
            const indicatorHtml = `
                <button type="button" data-bs-target="#carouselServices" data-bs-slide-to="${index}" class="${isActive}" aria-label="Slide ${index + 1}"></button>
            `
            carouselIndicators.insertAdjacentHTML('beforeend', indicatorHtml)
        })
        
        // Создаем слайды для карусели
        this.cardsData.forEach((item, index) => {
            const isActive = index === 0 ? 'active' : ''
            
            const slideHtml = `
                <div class="carousel-item ${isActive}">
                    <div class="d-flex justify-content-center">
                        <div class="card" style="width: 300px; margin: 20px auto;  background-color: #edf4fc">
                            <img src="${item.src}" class="card-img-top p-4" alt="${item.title}" style="height: 200px; object-fit: contain;">
                            <div class="card-body text-center">
                                <h5 class="card-title">${item.title}</h5>
                                <p class="card-text">${item.text}</p>
                                <div class="d-flex justify-content-center">
                                    <button class="btn btn-orange" id="click-card-${item.id}" data-id="${item.id}">Подробнее</button>
                                    <button class="btn btn-orange" id="delete-card-${item.id}" data-id="${item.id}">Удалить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
            
            carouselItems.insertAdjacentHTML('beforeend', slideHtml)
        })
        
        // Добавляем обработчики для кнопок "Подробнее"
        this.cardsData.forEach((item) => {
            document.getElementById(`click-card-${item.id}`).addEventListener('click', this.clickCard.bind(this))
        })
        
        // Добавляем обработчики для кнопок "Удалить"
        this.cardsData.forEach((item) => {
            document.getElementById(`delete-card-${item.id}`).addEventListener('click', () => this.deleteCard(item.id))
        })
    }
}