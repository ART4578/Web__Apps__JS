class GallerySlider {
    constructor() {
        this.scrollContainer = document.querySelector(".gallery");
        this.backBtn = document.getElementById("backBtn");
        this.nextBtn = document.getElementById("nextBtn");

        this.addEvents();
    };

    addEvents() {
        this.scrollContainer.addEventListener("wheel", (e) => {
            this.handleWheel(e);
        });

        this.nextBtn.addEventListener("click", () => {
            this.next();
        });

        this.backBtn.addEventListener("click", () => {
            this.back();
        });
    };

    handleWheel(e) {
        e.preventDefault();

        this.scrollContainer.scrollLeft += e.deltaY;
        this.scrollContainer.style.scrollBehavior = "auto";
    };

    next() {
        this.scrollContainer.style.scrollBehavior = "smooth";
        this.scrollContainer.scrollLeft += 900;
    };

    back() {
        this.scrollContainer.style.scrollBehavior = "smooth";
        this.scrollContainer.scrollLeft -= 900;
    };
};

document.addEventListener("DOMContentLoaded", () => new GallerySlider());