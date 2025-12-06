class DigitalClock {
    constructor(hourId, minutesId, secondsId, ampmId) {
        this.hourElement = document.getElementById(hourId);
        this.minutesElement = document.getElementById(minutesId);
        this.secondsElement = document.getElementById(secondsId);
        this.ampmElement = document.getElementById(ampmId);

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

new DigitalClock("hour", "minutes", "seconds", "ampm");