function analog__clock() {
    const hour__element = document.querySelector(".hour");
    const minute__element = document.querySelector(".minute");
    const second__element = document.querySelector(".second");

    const current__date = new Date();

    const hour = current__date.getHours();
    const minute = current__date.getMinutes();
    const second = current__date.getSeconds();

    const hour__deg = (hour / 12) * 360;
    hour__element.style.transform = `rotate(${hour__deg}deg)`;

    const minute__deg = (minute / 60) * 360;
    minute__element.style.transform = `rotate(${minute__deg}deg)`;

    const second__deg = (second / 60) * 360;
    second__element.style.transform = `rotate(${second__deg}deg)`;
};

setInterval(analog__clock, 1000);