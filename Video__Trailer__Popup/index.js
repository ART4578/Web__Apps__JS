class TrailerPlayer {
    constructor() {
        this.btn = document.querySelector(".btn");
        this.closeIcon = document.querySelector(".close__icon");
        this.trailerContainer = document.querySelector(".trailer__container");
        this.video = document.querySelector("video");

        this.addEvents();
    };

    addEvents() {
        this.btn.addEventListener("click", () => this.openTrailer());
        this.closeIcon.addEventListener("click", () => this.closeTrailer());
    };

    openTrailer() {
        this.trailerContainer.classList.remove("active");
    };

    closeTrailer() {
        this.trailerContainer.classList.add("active");

        this.video.pause();
        this.video.currentTime = 0;
    };
};

document.addEventListener("DOMContentLoaded", () => new TrailerPlayer());