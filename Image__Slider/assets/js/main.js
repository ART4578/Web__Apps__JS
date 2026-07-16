class ImageSlider {
    constructor() {
        this.prev = document.querySelector(".prev");
        this.next = document.querySelector(".next");
        this.imageContainer = document.querySelector(".image__container");
        this.imgs = document.querySelectorAll(".image__container img");

        this.currentImg = 1;
        this.timeOut = null;

        this.addEvents();
        this.updateImg();
    };

    addEvents() {
        this.prev.addEventListener("click", () => {
            this.currentImg--;
            clearTimeout(this.timeOut);
            this.updateImg();
        });

        this.next.addEventListener("click", () => {
            this.currentImg++;
            clearTimeout(this.timeOut);
            this.updateImg();
        });
    };

    updateImg() {
        if (this.currentImg > this.imgs.length) {
            this.currentImg = 1;
        } else if (this.currentImg < 1) {
            this.currentImg = this.imgs.length;
        };

        this.imageContainer.style.transform = `translateX(-${(this.currentImg - 1) * 500}px)`;

        this.timeOut = setTimeout(() => {
            this.currentImg++;
            this.updateImg();
        }, 3000);
    };
};

document.addEventListener("DOMContentLoaded", () => new ImageSlider());