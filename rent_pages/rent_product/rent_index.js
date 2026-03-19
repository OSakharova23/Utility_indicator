import { BackButtonComponent } from "../../rent_components/rent_back-button/rent_index.js";
import { MainPage } from "../rent_main/rent_index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
        this.servicesData = {
            1: {
                title: "Холодное водоснабжение",
                src: "https://komvek.ru/images/17-1024.webp",
                tariff: "65.77 ₽/м³",
                description: "Подача холодной воды централизованными системами водоснабжения. Норматив потребления: 5,48 м³ на человека в месяц при отсутствии счетчиков."
            },
            2: {
                title: "Горячее водоснабжение",
                src: "https://komvek.ru/images/17-1024.webp",
                tariff: "302.82 ₽/м³",
                description: "Подогрев воды до нормативной температуры (60-75°C). Включает затраты на тепловую энергию, химическую подготовку воды и обслуживание внутридомовых сетей. При наличии счетчика оплата по показаниям, без счетчика - по нормативу 3,85 м³ на человека."
            },
            3: {
                title: "Электроэнергия",
                src: "https://komvek.ru/images/17-1024.webp",
                tariff: "5.92 ₽/кВт·ч",
                description: "Одноставочный тариф для городского населения в пределах социальной нормы (до 150 кВт·ч в месяц). Сверх нормы - 7.23 ₽/кВт·ч. Дифференциация по времени суток: ночной тариф (23:00-7:00) - 2.84 ₽/кВт·ч."
            },
            4: {
                title: "Взнос на капитальный ремонт",
                src: "https://komvek.ru/images/17-1024.webp",
                tariff: "29.66 ₽/м²",
                description: "Ежемесячный взнос в фонд капитального ремонта многоквартирного дома. Рассчитывается исходя из общей площади квартиры. Средства идут на ремонт крыши, фасада, лифтов, инженерных систем. Минимальный взнос установлен региональным правительством."
            }
        }
        
        // Добавляем данные для копированных карточек
        if (id >= 5) {
            this.servicesData[id] = {
                title: `Холодное водоснабжение (копия ${id})`,
                src: "https://avatars.mds.yandex.net/i?id=3e1afc4c618c981a5646813503c98e2c_l-10250781-images-thumbs&n=13",
                tariff: "43.57 ₽/м³",
                description: "Копия карточки холодного водоснабжения."
            }
        }
    }

    getData() {
        return this.servicesData[this.id]
    }

    get pageRoot() {
        return document.getElementById('product-page')
    }

    getHTML() {
        return (
            `
                <style>
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
                        background-color: white;
                        color: #ff8f00;
                        border: none;
                        padding: 8px 20px;
                        border-radius: 5px;
                        font-weight: 500;
                        cursor: pointer;
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
                </style>
                <div class="header">
                    <div class="container">
                        <h1>Калькулятор квартплаты</h1>
                        <button class="btn-home" id="home-button">Домой</button>
                    </div>
                </div>
                
                <div id="product-page" class="container mt-4"></div>
            `
        )
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }
    
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

        // Кнопка назад
        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))

        const data = this.getData()
        
        // Детальная информация об услуге
        const detailHTML = `
            <div class="card mt-4" style="max-width: 600px; margin: 0 auto;">
                <div class="row g-0">
                    <div class="col-md-4 d-flex align-items-center justify-content-center p-4">
                        <img src="${data.src}" class="img-fluid" alt="${data.title}" style="max-height: 150px; object-fit: contain;">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${data.title}</h5>
                            <p class="card-text"><strong>Тариф:</strong> ${data.tariff}</p>
                            <p class="card-text">${data.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        `
        
        this.pageRoot.insertAdjacentHTML('beforeend', detailHTML)
    }
}