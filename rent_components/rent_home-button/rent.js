export class rent_HomeButtonComponent {
    constructor(rent_parent) {
        this.rent_parent = rent_parent;
    }

    rent_addListeners(rent_listener) {
        const button = document.getElementById("rent_home-button");
        if (button) {
            button.addEventListener("click", rent_listener)
        }
    }

    rent_getHTML() {
        return (
            `
                <button id="rent_home-button" style="background-color: white; color: #ff8f00; border: none; padding: 8px 20px; border-radius: 5px; cursor: pointer; font-size: 1rem; font-weight: 500;">
                    Домой
                </button>
            `
        )
    }

    rent_render(rent_listener) {
        const html = this.rent_getHTML()
        this.rent_parent.insertAdjacentHTML('beforeend', html)
        this.rent_addListeners(rent_listener)
    }
}