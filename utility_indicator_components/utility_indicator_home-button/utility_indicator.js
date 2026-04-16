export class utility_indicator_HomeButtonComponent {
    constructor(utility_indicator_parent) {
        this.utility_indicator_parent = utility_indicator_parent;
    }

    utility_indicator_addListeners(utility_indicator_listener) {
        const button = document.getElementById("utility_indicator_home-button");
        if (button) {
            button.addEventListener("click", utility_indicator_listener);
        }
    }

    utility_indicator_getHTML() {
        return (
            `
                <button id="utility_indicator_home-button" style="background: none; color: black; border: none; padding: 0; cursor: pointer; font-size: 1.8rem; font-weight: 500;">
                    Квартплата
                </button>
            `
        )
    }

    utility_indicator_render(utility_indicator_listener) {
        const html = this.utility_indicator_getHTML();
        this.utility_indicator_parent.insertAdjacentHTML('beforeend', html);
        this.utility_indicator_addListeners(utility_indicator_listener);
    }
}