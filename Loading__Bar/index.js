const counter = document.querySelector(".counter");
const loading__bar__front = document.querySelector(".loading__bar__front");

let index = 0;

update__number();

function update__number() {
    counter.innerText = index + "%";
    loading__bar__front.style.width = index + "%";
    index++;
    if (index < 101) {
        setTimeout(update__number, 20);
    }
};