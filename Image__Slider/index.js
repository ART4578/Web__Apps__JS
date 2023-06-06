const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const image__container = document.querySelector(".image__container");
const imgs = document.querySelectorAll("img");

let current__img = 1;
let time__out;

prev.addEventListener("click", () => {
    current__img--;
    clearTimeout(time__out);
    update__img();
});

next.addEventListener("click", () => {
    current__img++;
    clearTimeout(time__out);
    update__img();
});

update__img();

function update__img() {
    if (current__img > imgs.length) {
        current__img = 1;
    } else if (current__img < 1) {
        current__img = imgs.length;
    }

    image__container.style.transform = `translateX(-${(current__img - 1) * 500}px)`;
    
    time__out = setTimeout(() => {
        current__img++;
        update__img();
    }, 3000);
};