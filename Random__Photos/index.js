class ImageGenerator {
    constructor(imagesPerClick = 10) {
        this.imageContainer = document.querySelector(".image__container");
        this.btn = document.querySelector(".btn");

        this.imagesPerClick = imagesPerClick;

        this.addEvents();
    };

    addEvents() {
        this.btn.addEventListener("click", () => this.addNewImages());
    };

    addNewImages() {
        for (let i = 0; i < this.imagesPerClick; i++) {
            const img = document.createElement("img");

            img.src = `https://picsum.photos/300?random=${Math.floor(Math.random() * 2000)}`;

            this.imageContainer.appendChild(img);
        };
    };
};

document.addEventListener("DOMContentLoaded", () => new ImageGenerator());