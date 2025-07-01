const image__container = document.querySelector(".image__container");
const btn = document.querySelector(".btn");

btn.addEventListener("click", () => {
    image__number = 10;
    add__new__images();
});

function add__new__images() {
    for (let i = 0; i < image__number; i++) {
        const new__img = document.createElement("img");
        new__img.src = `https://picsum.photos/300?random=${Math.floor(Math.random() * 2000)}`;
        image__container.appendChild(new__img);
    };
};