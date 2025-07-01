const btn = document.querySelector(".btn");
const close__icon = document.querySelector(".close__icon");
const trailer__container = document.querySelector(".trailer__container");
const video = document.querySelector("video");

btn.addEventListener("click", () => {
    trailer__container.classList.remove("active");
});

close__icon.addEventListener("click", () => {
    trailer__container.classList.add("active");
    video.pause();
    video.currentTime = 0;
});