class LoadingBar {
    constructor() {
        this.counter = document.querySelector(".counter");
        this.loading__bar__front = document.querySelector(".loading__bar__front");

        this.index = 0;

        this.init();
    };

    init() {
        this.counter.innerText = this.index + "%";
        this.loading__bar__front.style.width = this.index + "%";
        this.index++;
        this.index < 101 && setTimeout(() => this.init(), 20);
    };
};

document.addEventListener("DOMContentLoaded", () => new LoadingBar());