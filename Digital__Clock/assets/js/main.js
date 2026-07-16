class DigitalClock {
    constructor() {
        this.hourElement = document.getElementById("hour");
        this.minutesElement = document.getElementById("minutes");
        this.secondsElement = document.getElementById("seconds");
        this.ampmElement = document.getElementById("ampm");

        this.updateClock();
    };

    updateClock() {
        let hour = new Date().getHours();
        let minutes = new Date().getMinutes();
        let seconds = new Date().getSeconds();
        let ampm = "AM";

        if (hour < 12) {
            hour -= 12;
            ampm = "PM";
        };

        hour = hour < 10 ? "0" + hour : hour;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        this.hourElement.innerText = hour;
        this.minutesElement.innerText = minutes;
        this.secondsElement.innerText = seconds;
        this.ampmElement.innerText = ampm;

        setTimeout(() => this.updateClock(), 1000);
    };
};

document.addEventListener("DOMContentLoaded", () => new DigitalClock());