const container = document.querySelector(".container");
const btn = document.querySelector(".btn");
const popup__container = document.querySelector(".popup__container");
const close__icon = document.querySelector(".close__icon");

btn.addEventListener("click", () => {
    container.classList.add("active");
    popup__container.classList.remove("active");
});

close__icon.addEventListener("click", () => {
    container.classList.remove("active");
    popup__container.classList.add("active");
});