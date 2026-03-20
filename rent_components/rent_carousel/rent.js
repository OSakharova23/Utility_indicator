export class rent_CarouselComponent {
    constructor(rent_parent) {
        this.rent_parent = rent_parent;
    }

    rent_getHTML(rent_data, rent_onDelete) {
        const rent_indicators = rent_data.map((item, index) => {
            const isActive = index === 0 ? 'active' : '';
            const ariaCurrent = index === 0 ? 'aria-current="true"' : '';
            return `
                <button type="button" 
                    data-bs-target="#rent_serviceCarousel" 
                    data-bs-slide-to="${index}" 
                    class="${isActive}" 
                    ${ariaCurrent} 
                    aria-label="Slide ${index + 1}">
                </button>
            `;
        }).join('');

        const rent_items = rent_data.map((item, index) => {
            const isActive = index === 0 ? 'active' : '';
            return `
                 <style>
                    .carousel-control-prev-icon,
                    .carousel-control-next-icon {
                        background-color: #ff8f00;
                        border-radius: 50%;
                        padding: 10px;
                        background-size: 50%;
                    }
                    
                    .carousel-indicators [data-bs-target] {
                        background-color: #ff8f00;
                        opacity: 0.5;
                    }
                    
                    .carousel-indicators .active {
                        opacity: 1;
                    }
                </style>
                <div class="carousel-item ${isActive}">
                    <div class="d-flex justify-content-center align-items-center" style="min-height: 450px; padding-bottom: 40px;">
                        <div class="card" style="width: 400px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                            <img class="card-img-top" src="${item.src}" alt="${item.title}" style="height: 250px; object-fit: cover;">
                            <div class="card-body">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                    <h5 class="card-title" style="margin: 0;">${item.title}</h5>
                                    <button class="rent_delete-card-btn" data-id="${item.id}" style="background-color: #ff8f00; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 0.8rem;">
                                        Удалить
                                    </button>
                                </div>
                                <div class="mb-2">
                                    <span class="badge bg-success">${item.tariff}</span>
                                </div>
                                <p class="card-text text-muted">${item.text || 'Нажмите для подробной информации'}</p>
                                <button class="btn btn-primary w-100" id="rent_carousel-card-${item.id}" data-id="${item.id}" style="background-color: #ff8f00; border: none;">
                                    Подробнее
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        return (
            `
                <div id="rent_serviceCarousel" class="carousel slide" data-bs-ride="carousel" style="margin-bottom: 40px;">
                    <div class="carousel-indicators" style="bottom: -30px;">
                        ${rent_indicators}
                    </div>
                    <div class="carousel-inner">
                        ${rent_items}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#rent_serviceCarousel" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Предыдущий</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#rent_serviceCarousel" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Следующий</span>
                    </button>
                </div>
            `
        )
    }

    rent_addListeners(rent_data, rent_onClickCard, rent_onDelete) {
        rent_data.forEach((item) => {
            const button = document.getElementById(`rent_carousel-card-${item.id}`);
            if (button) {
                button.addEventListener("click", rent_onClickCard)
            }
        });
        
        const rent_deleteButtons = document.querySelectorAll('.rent_delete-card-btn');
        rent_deleteButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                e.stopPropagation();
                const cardId = button.getAttribute('data-id');
                if (rent_onDelete) {
                    rent_onDelete(cardId);
                }
            });
        });
    }

    rent_render(rent_data, rent_onClickCard, rent_onDelete) {
        const html = this.rent_getHTML(rent_data, rent_onDelete)
        this.rent_parent.insertAdjacentHTML('beforeend', html)
        this.rent_addListeners(rent_data, rent_onClickCard, rent_onDelete)
    }
}