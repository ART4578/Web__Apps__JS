class BackgroundImage {
    constructor() {
        this.bgImage = document.getElementById("bg__image");

        window.addEventListener("scroll", () => this.updateImage());
    };

    updateImage() {
        this.bgImage.style.opacity = 1 - window.pageYOffset / 900;
        this.bgImage.style.backgroundSize = `${160 - window.pageYOffset / 12}%`;
    };
};

document.addEventListener("DOMContentLoaded", () => new BackgroundImage());