export class rent_ProductComponent {
    constructor(rent_parent) {
        this.rent_parent = rent_parent
    }

    rent_getHTML(rent_data) {
        return (
            `
                <div class="card mb-4" style="max-width: 800px; margin: 0 auto;">
                    <div class="row g-0">
                        <div class="col-md-5">
                            <img src="${rent_data.src}" class="img-fluid rounded-start" alt="${rent_data.title}" style="height: 100%; object-fit: cover;">
                        </div>
                        <div class="col-md-7">
                            <div class="card-body">
                                <h3 class="card-title mb-3">${rent_data.title}</h3>
                                <div class="mb-3">
                                    <span class="badge bg-success fs-6 p-2">Тариф: ${rent_data.tariff}</span>
                                </div>
                                <div class="mb-3">
                                    <h5 class="card-subtitle mb-2 text-muted">Описание услуги:</h5>
                                    <p class="card-text">${rent_data.description}</p>
                                </div>
                                <div class="alert alert-info mt-3" role="alert" style="background-color: #ffc070; border: none;">
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

    rent_render(rent_data) {
        const html = this.rent_getHTML(rent_data)
        this.rent_parent.insertAdjacentHTML('beforeend', html)
    }
}