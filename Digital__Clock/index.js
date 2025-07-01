const hourElement = document.getElementById("hour");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const ampmElement = document.getElementById("ampm");

function update__clock() {
    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();
    let ampm = "AM";
  
    if (hour > 12) {
        hour -= 12;
        ampm = "PM";
    }

    hour = hour < 10 ? "0" + hour : hour;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    hourElement.innerText = hour;
    minutesElement.innerText = minutes;
    secondsElement.innerText = seconds;
    ampmElement.innerText = ampm;

    setTimeout(() => {
        update__clock();
    }, 1000);
};

update__clock();