import {rent_ProductComponent} from "../../rent_components/rent_product/rent.js";
import {rent_MainPage} from "../rent_main/rent.js";
import {rent_HomeButtonComponent} from "../../rent_components/rent_home-button/rent.js";

export class rent_ProductPage {
    constructor(rent_parent, rent_id) {
        this.rent_parent = rent_parent
        this.rent_id = rent_id
    }

    rent_getServiceData() {
        const services = {
            1: {
                title: "Холодное водоснабжение",
                src: "https://avatars.mds.yandex.net/i?id=3e1afc4c618c981a5646813503c98e2c_l-10250781-images-thumbs&n=13",
                tariff: "65.77 ₽/м³",
                description: "Подача холодной воды централизованными системами водоснабжения. Норматив потребления: 5,48 м³ на человека в месяц при отсутствии счетчиков."
            },
            2: {
                title: "Горячее водоснабжение",
                src: "https://main-cdn.sbermegamarket.ru/big2/hlr-system/-89/798/166/711/114/7/600008682549b3.jpg",
                tariff: "302.82 ₽/м³",
                description: "Подогрев воды до нормативной температуры (60-75°C). Включает затраты на тепловую энергию, химическую подготовку воды и обслуживание внутридомовых сетей. При наличии счетчика оплата по показаниям, без счетчика - по нормативу 3,85 м³ на человека."
            },
            3: {
                title: "Электроэнергия",
                src: "https://resizer.mail.ru/p/42f4c5b1-a868-5ab5-b0b9-448fc42555df/AQAX39JBF5VPEtmJ8E487-Ib-I-U3UzNHPbd5XQBztIosCNRoz8ctENAgF-mY6WmGnJmWXmibucl4TCbldBLJt0kbvQ.jpg",
                tariff: "5.92 ₽/кВт·ч",
                description: "Одноставочный тариф для городского населения в пределах социальной нормы (до 150 кВт·ч в месяц). Сверх нормы - 7.23 ₽/кВт·ч. Дифференциация по времени суток: ночной тариф (23:00-7:00) - 2.84 ₽/кВт·ч."
            },
            4: {
                title: "Обращение с твёрдыми коммунальными отходами",
                src: "https://static.vmr-mosreg.ru/682/330/57b/68233057b427a834748581.jpg",
                tariff: "49.93 ₽/м²",
                description: "Вывоз и утилизация твердых коммунальных отходов. Плата рассчитывается исходя из общей площади жилого помещения. Включает сбор, транспортирование, обработку, утилизацию, обезвреживание и захоронение ТКО."
            },
            5: {
                title: "Взнос на капитальный ремонт",
                src: "https://avatars.mds.yandex.net/get-ydo/12406519/2a00000191f28de9732ff366cd5a8a42f1c7/diploma",
                tariff: "29.66 ₽/м²",
                description: "Ежемесячный взнос в фонд капитального ремонта многоквартирного дома. Рассчитывается исходя из общей площади квартиры. Средства идут на ремонт крыши, фасада, лифтов, инженерных систем. Минимальный взнос установлен региональным правительством."
            }
        };
        
        return services[this.rent_id] || services[1];
    }

    get rent_pageRoot() {
        return document.getElementById('rent_product-page')
    }

    rent_getHTML() {
        return (
            `
                <div id="rent_product-page">
                    <div id="rent_header-container" class="header" style="background-color: #ff8f00; color: white; padding: 1rem 0; margin-bottom: 2rem;">
                        <div class="container">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <h1 style="margin: 0; font-size: 1.8rem;">Квартплата</h1>
                                <div id="rent_home-button-container"></div>
                            </div>
                        </div>
                    </div>
                    <div class="container mt-4"></div>
                </div>
            `
        )
    }

    rent_goHome() {
        const mainPage = new rent_MainPage(this.rent_parent)
        mainPage.rent_render()
    }

    rent_render() {
        this.rent_parent.innerHTML = ''
        const html = this.rent_getHTML()
        this.rent_parent.insertAdjacentHTML('beforeend', html)
        
        const rent_homeButtonContainer = document.getElementById('rent_home-button-container')
        const rent_homeButton = new rent_HomeButtonComponent(rent_homeButtonContainer)
        rent_homeButton.rent_render(this.rent_goHome.bind(this))

        const data = this.rent_getServiceData()
        const product = new rent_ProductComponent(this.rent_pageRoot)
        product.rent_render(data)
    }
}