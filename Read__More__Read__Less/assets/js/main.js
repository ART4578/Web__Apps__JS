class ReadMore {
    constructor() {
        this.readBtn = document.querySelector("#read");
        this.moreText = document.querySelector("#more");
        this.dots = document.querySelector("#dots");

        this.isOpen = false;

        this.readBtn.addEventListener("click", () => this.toggle());
    };

    toggle() {
        if (!this.isOpen) {
            this.moreText.style.display = "inline";
            this.dots.style.display = "none";
            this.readBtn.innerHTML = "Read Less";
            this.isOpen = true;
        } else {
            this.moreText.style.display = "none";
            this.dots.style.display = "inline";
            this.readBtn.innerHTML = "Read More";
            this.isOpen = false;
        };
    };
};

document.addEventListener("DOMContentLoaded", () => new ReadMore());