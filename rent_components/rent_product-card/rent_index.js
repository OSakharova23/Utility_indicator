export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
                <div class="card" style="width: 300px; margin: 10px;">
                    <img src="${data.src}" class="card-img-top p-4" alt="${data.title}" style="height: 200px; object-fit: contain;">
                    <div class="card-body text-center">
                        <h5 class="card-title">${data.title}</h5>
                        <p class="card-text">${data.text}</p>
                        <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Подробнее</button>
                    </div>
                </div>
            `
        )
    }

    render(data, listener) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}