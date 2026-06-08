class ThemeSwitcher {
    constructor() {
        this.input = document.querySelector(".input");

        this.loadMode();
        this.updateBody();

        this.input.addEventListener("input", () => {
            this.updateBody();
            this.saveMode();
        });
    };

    loadMode() {
        this.input.checked = JSON.parse(localStorage.getItem("mode")) || false;
    };

    updateBody() {
        document.body.classList.toggle("dark", this.input.checked);
    };

    saveMode() {
        localStorage.setItem("mode", JSON.stringify(this.input.checked));
    };
};

document.addEventListener("DOMContentLoaded", () => new ThemeSwitcher());