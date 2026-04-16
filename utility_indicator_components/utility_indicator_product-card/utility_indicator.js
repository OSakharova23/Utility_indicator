import { FindPrefix, isPalindrome1 } from "../utility_indicator_function/utility_indicator.js";

export class utility_indicator_ProductCardComponent {
    constructor(utility_indicator_parent) {
        this.utility_indicator_parent = utility_indicator_parent;
    }

    utility_indicator_getHTML(utility_indicator_data, utility_indicator_onDelete) {
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
                            
                            <!-- Объединенный блок с белым фоном -->
                            <div style="background-color: white; border-radius: 8px; padding: 12px; margin: 10px 0;">
                                <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                                    <button class="utility_indicator_prefix-btn w-50" data-id="${item.id}" data-title="${item.title}" style="background-color: #edf4fc; color: #1976d2; border: 1px solid #edf4fc; padding: 8px; border-radius: 5px; cursor: pointer; transition: all 0.3s; font-size: 0.9rem;">
                                        Префикс
                                    </button>
                                    <button class="utility_indicator_palindrome-btn w-50" data-id="${item.id}" style="background-color: #edf4fc; color: #1976d2; border: 1px solid #edf4fc; padding: 8px; border-radius: 5px; cursor: pointer; transition: all 0.3s; font-size: 0.9rem;">
                                        Палиндром
                                    </button>
                                </div>
                                
                                <div id="utility_indicator_prefix-result-${item.id}" style="font-size: 0.85rem; color: #555; margin-top: 8px; display: none; padding: 8px; background-color: #f9f9f9; border-radius: 4px;"></div>
                                
                                <div id="utility_indicator_palindrome-input-${item.id}" style="margin-top: 10px; display: none;">
                                    <input type="text" id="utility_indicator_palindrome-text-${item.id}" placeholder="Введите номер квитанции" style="width: 100%; padding: 8px; margin-bottom: 8px; border: 1px solid #edf4fc; border-radius: 4px; font-size: 0.9rem;">
                                    <button class="utility_indicator_check-palindrome-btn w-100" data-id="${item.id}" style="background-color: #edf4fc; color: #1976d2; border: 1px solid #edf4fc; padding: 8px; border-radius: 5px; cursor: pointer; transition: all 0.3s; font-size: 0.9rem;">
                                        Проверить
                                    </button>
                                </div>
                                <div id="utility_indicator_palindrome-result-${item.id}" style="font-size: 0.85rem; color: #555; margin-top: 8px; display: none; padding: 8px; background-color: #f9f9f9; border-radius: 4px;"></div>
                            </div>
                            
                            <div style="margin-top: 5px;">
                                <button class="btn w-100 mt-auto" id="utility_indicator_product-card-${item.id}" data-id="${item.id}" style="background-color: #ff8f00; color: white; border: none; padding: 8px; border-radius: 5px; cursor: pointer;">
                                    Подробнее
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
                .utility_indicator_prefix-btn:hover,
                .utility_indicator_palindrome-btn:hover,
                .utility_indicator_check-palindrome-btn:hover {
                    background-color: #dfecf8 !important;
                    border-color: #dfecf8 !important;
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

    utility_indicator_checkPrefix(title) {
        const words = ["Холод", "Горяч", "Электро", "Обращ", "Взнос"];
        const prefixWords = [];
        
        for (let i = 0; i < words.length; i++) {
            if (title.startsWith(words[i])) {
                prefixWords.push(words[i]);
            }
        }
        
        const count = prefixWords.length;
        let resultText = `${count} префикс`;
        if (count !== 1) resultText += "а";
        if (count > 0) {
            resultText += `: ${prefixWords.join(", ")}`;
        }
        
        return resultText;
    }

    utility_indicator_addListeners(utility_indicator_data, utility_indicator_onClickCard, utility_indicator_onDelete) {
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
        
        const prefixBtns = document.querySelectorAll('.utility_indicator_prefix-btn');
        prefixBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                const id = btn.getAttribute('data-id');
                const title = btn.getAttribute('data-title');
                const resultDiv = document.getElementById(`utility_indicator_prefix-result-${id}`);
                
                if (resultDiv.style.display === 'block') {
                    resultDiv.style.display = 'none';
                } else {
                    const result = this.utility_indicator_checkPrefix(title);
                    resultDiv.innerHTML = result;
                    resultDiv.style.display = 'block';
                    
                    const palindromeInputDiv = document.getElementById(`utility_indicator_palindrome-input-${id}`);
                    if (palindromeInputDiv) palindromeInputDiv.style.display = 'none';
                    const palindromeResultDiv = document.getElementById(`utility_indicator_palindrome-result-${id}`);
                    if (palindromeResultDiv) palindromeResultDiv.style.display = 'none';
                }
            });
        });
        
        const palindromeBtns = document.querySelectorAll('.utility_indicator_palindrome-btn');
        palindromeBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                const id = btn.getAttribute('data-id');
                const inputDiv = document.getElementById(`utility_indicator_palindrome-input-${id}`);
                
                if (inputDiv.style.display === 'block') {
                    inputDiv.style.display = 'none';
                    const resultDiv = document.getElementById(`utility_indicator_palindrome-result-${id}`);
                    if (resultDiv) resultDiv.style.display = 'none';
                } else {
                    inputDiv.style.display = 'block';
                    const prefixResultDiv = document.getElementById(`utility_indicator_prefix-result-${id}`);
                    if (prefixResultDiv) prefixResultDiv.style.display = 'none';
                }
            });
        });
        
        const checkBtns = document.querySelectorAll('.utility_indicator_check-palindrome-btn');
        checkBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                const id = btn.getAttribute('data-id');
                const input = document.getElementById(`utility_indicator_palindrome-text-${id}`);
                const text = input.value;
                
                if (!text.trim()) {
                    const resultDiv = document.getElementById(`utility_indicator_palindrome-result-${id}`);
                    resultDiv.innerHTML = "Введите номер квитанции";
                    resultDiv.style.display = 'block';
                    return;
                }
                
                const isPal = isPalindrome1(text);
                const resultDiv = document.getElementById(`utility_indicator_palindrome-result-${id}`);
                if (isPal) {
                    resultDiv.innerHTML = "Да, это палиндром";
                } else {
                    resultDiv.innerHTML = "Нет, это не палиндром";
                }
                resultDiv.style.display = 'block';
            });
        });
    }

    utility_indicator_render(utility_indicator_data, utility_indicator_onClickCard, utility_indicator_onDelete) {
        const html = this.utility_indicator_getHTML(utility_indicator_data, utility_indicator_onDelete);
        this.utility_indicator_parent.innerHTML = '';
        this.utility_indicator_parent.insertAdjacentHTML('beforeend', html);
        this.utility_indicator_addListeners(utility_indicator_data, utility_indicator_onClickCard, utility_indicator_onDelete);
    }
}