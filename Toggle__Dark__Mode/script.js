class DarkModeToggle {
    constructor() {
        this.toggle = document.getElementById("toggleDark");
        this.body = document.body;
        
        this.addEvents();
    };

    addEvents() {
        this.toggle.addEventListener("click", () => this.toggleTheme());
    };

    toggleTheme() {
        this.toggle.classList.toggle("bi-moon");

        if (this.toggle.classList.toggle("bi-brightness-high-fill")) {
            this.body.style.background = "white";
            this.body.style.color = "black";
            this.body.style.transition = "2s";
        } else {
            this.body.style.background = "black";
            this.body.style.color = "white";
            this.body.style.transition = "2s";
        };
    };
};

document.addEventListener("DOMContentLoaded", () => new DarkModeToggle());