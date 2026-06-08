class AnalogClock {
    constructor() {
        this.hourElement = document.querySelector(".hour");
        this.minuteElement = document.querySelector(".minute");
        this.secondElement = document.querySelector(".second");

        this.start();
    };

    analogClock() {
        const currentDate = new Date();

        const hour = currentDate.getHours();
        const minute = currentDate.getMinutes();
        const second = currentDate.getSeconds();

        this.hourElement.style.transform = `rotate(${(hour / 12) * 360}deg)`;
        this.minuteElement.style.transform = `rotate(${(minute / 60) * 360}deg)`;
        this.secondElement.style.transform = `rotate(${(second / 60) * 360}deg)`;
    };

    start() {
        this.analogClock();
        setInterval(() => this.analogClock(), 1000);
    };
};

document.addEventListener("DOMContentLoaded", () => new AnalogClock());