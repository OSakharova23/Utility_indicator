import {utility_indicator_ProductComponent} from "../../utility_indicator_components/utility_indicator_product/utility_indicator.js";
import {utility_indicator_MainPage} from "../utility_indicator_main/utility_indicator.js";
import {utility_indicator_HomeButtonComponent} from "../../utility_indicator_components/utility_indicator_home-button/utility_indicator.js";


export class utility_indicator_ProductPage {
    constructor(utility_indicator_parent, utility_indicator_id) {
        this.utility_indicator_parent = utility_indicator_parent;
        this.utility_indicator_id = utility_indicator_id;
    }

    utility_indicator_getServiceData() {
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
        
        return services[this.utility_indicator_id] || services[1];
    }

    get utility_indicator_pageRoot() {
        return document.getElementById('utility_indicator_product-page');
    }

    utility_indicator_getHTML() {
        return (
            `
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
            `
        )
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

        const data = this.utility_indicator_getServiceData();
        const product = new utility_indicator_ProductComponent(this.utility_indicator_pageRoot);
        product.utility_indicator_render(data);
    }
}