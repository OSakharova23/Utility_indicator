export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document
            .getElementById("back-button")
            .addEventListener("click", listener)
    }

    getHTML() {
        return (
            `
            <style>
                .btn-orange {
                            background-color: #ff8f00;
                            border-color: #ff8f00;
                            color: white;
                            font-weight: 500;
                        }
                .btn-orange:hover {
                
                            background-color: #ffc070;
                            border-color: #ffc070;
                            color: white;
                        }
            </style>
                <button id="back-button" class="btn btn-orange" type="button">← Назад к услугам</button>
            `
        )
    }

    render(listener) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }
}