function update__image() {
    const bg__image = document.getElementById("bg__image");

    bg__image.style.opacity = 1 - window.pageYOffset / 900;
    bg__image.style.backgroundSize = 160 - window.pageYOffset / 12 + "%";
};

window.addEventListener("scroll", () => {
    update__image();
});