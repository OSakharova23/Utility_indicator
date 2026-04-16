export class utility_indicator_ProductComponent {
    constructor(utility_indicator_parent) {
        this.utility_indicator_parent = utility_indicator_parent;
    }

    utility_indicator_getHTML(utility_indicator_data) {
        return (
            `
                <div class="card mb-4" style="max-width: 800px; margin: 0 auto; background-color: white; border: 1px solid #91bbe6;">
                    <div class="row g-0">
                        <div class="col-md-5">
                            <img src="${utility_indicator_data.src}" class="img-fluid rounded-start" alt="${utility_indicator_data.title}" style="height: 100%; object-fit: cover;">
                        </div>
                        <div class="col-md-7">
                            <div class="card-body">
                                <h3 class="card-title mb-3" style="color: #333;">${utility_indicator_data.title}</h3>
                                <div class="mb-3" style="background-color: #edf4fc; padding: 10px 15px; border-radius: 5px;">
                                    <span style="color: #333; font-size: 1.1rem; font-weight: 500;">Тариф: ${utility_indicator_data.tariff}</span>
                                </div>
                                <div class="mb-3">
                                    <h5 class="card-subtitle mb-2" style="color: #666;">Описание услуги:</h5>
                                    <p class="card-text" style="color: #555;">${utility_indicator_data.description}</p>
                                </div>
                                <div class="mt-3" style="background-color: #edf4fc; padding: 10px 15px; border-radius: 5px; color: #333;">
                                    <i class="bi bi-info-circle-fill"></i>
                                    <strong>Важно:</strong> Для точного расчета оплаты рекомендуется установка индивидуальных приборов учета.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        )
    }

    utility_indicator_render(utility_indicator_data) {
        const html = this.utility_indicator_getHTML(utility_indicator_data);
        this.utility_indicator_parent.insertAdjacentHTML('beforeend', html);
    }
}