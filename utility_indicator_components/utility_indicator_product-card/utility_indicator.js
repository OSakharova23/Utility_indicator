export class utility_indicator_ProductCardComponent {
    constructor(utility_indicator_parent) {
        this.utility_indicator_parent = utility_indicator_parent;
    }

    utility_indicator_getHTML(utility_indicator_data, utility_indicator_onDelete, utility_indicator_onEdit) {
        const rows = [];
        for (let i = 0; i < utility_indicator_data.length; i += 3) {
            rows.push(utility_indicator_data.slice(i, i + 3));
        }

        const utility_indicator_rowsHtml = rows.map(row => {
            const cardsHtml = row.map(item => `
                <div class="col-md-4 mb-4">
                    <div class="card h-100" style="background-color: #edf4fc; box-shadow: 0 4px 8px rgba(0,0,0,0.1); transition: transform 0.2s; border: none;">
                        <img class="card-img-top" src="${item.src}" alt="${item.title}" style="height: 200px; object-fit: cover;">
                        <div class="card-body d-flex flex-column">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                <h5 class="card-title" style="margin: 0; font-size: 1.1rem; color: #333;">${item.title}</h5>
                                <button class="utility_indicator_delete-card-btn" data-id="${item.id}" style="background-color: #ff8f00; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 0.8rem;">
                                    Удалить
                                </button>
                            </div>
                            <div class="mb-2">
                                <span style="background-color: white; color: #6e9fcf; padding: 5px 12px; border-radius: 5px; font-size: 0.9rem; font-weight: 500; display: inline-block;">${item.tariff}</span>
                            </div>
                            <p class="card-text text-muted flex-grow-1">${item.text || 'Нажмите для подробной информации'}</p>
                            <div style="display: flex; gap: 10px; margin-top: auto;">
                                <button class="btn w-100" id="utility_indicator_product-card-${item.id}" data-id="${item.id}" style="background-color: #ff8f00; color: white; border: none; flex: 1;">
                                    Подробнее
                                </button>
                                <button class="utility_indicator_edit-card-btn btn w-100" data-id="${item.id}" style="background-color: #ff8f00; color: white; border: none; flex: 1;">
                                    Редактировать
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
            
            return `<div class="row">${cardsHtml}</div>`;
        }).join('');

        return `
            <style>
                .card:hover {
                    transform: translateY(-5px);
                }
                .utility_indicator_grid-container {
                    margin-bottom: 40px;
                }
                @media (max-width: 768px) {
                    .col-md-4 {
                        margin-bottom: 20px;
                    }
                }
            </style>
            <div class="utility_indicator_grid-container">
                ${utility_indicator_rowsHtml}
                ${utility_indicator_data.length === 0 ? '<div class="text-center py-5">Нет доступных услуг</div>' : ''}
            </div>
        `;
    }

    utility_indicator_addListeners(utility_indicator_data, utility_indicator_onClickCard, utility_indicator_onDelete, utility_indicator_onEdit) {
        utility_indicator_data.forEach((item) => {
            const button = document.getElementById(`utility_indicator_product-card-${item.id}`);
            if (button) {
                button.addEventListener("click", utility_indicator_onClickCard);
            }
        });
        
        const utility_indicator_deleteButtons = document.querySelectorAll('.utility_indicator_delete-card-btn');
        utility_indicator_deleteButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                e.stopPropagation();
                const cardId = button.getAttribute('data-id');
                if (utility_indicator_onDelete) {
                    utility_indicator_onDelete(cardId);
                }
            });
        });
        
        const utility_indicator_editButtons = document.querySelectorAll('.utility_indicator_edit-card-btn');
        utility_indicator_editButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                e.stopPropagation();
                const cardId = button.getAttribute('data-id');
                if (utility_indicator_onEdit) {
                    utility_indicator_onEdit(cardId);
                }
            });
        });
    }

    utility_indicator_render(utility_indicator_data, utility_indicator_onClickCard, utility_indicator_onDelete, utility_indicator_onEdit) {
        const html = this.utility_indicator_getHTML(utility_indicator_data, utility_indicator_onDelete, utility_indicator_onEdit);
        this.utility_indicator_parent.innerHTML = '';
        this.utility_indicator_parent.insertAdjacentHTML('beforeend', html);
        this.utility_indicator_addListeners(utility_indicator_data, utility_indicator_onClickCard, utility_indicator_onDelete, utility_indicator_onEdit);
    }
}