const bg__image = document.getElementById("bg__image");

window.addEventListener("scroll", () => {
    update__image();
});

function update__image() {
    bg__image.style.opacity = 1 - window.pageYOffset / 900;
    bg__image.style.backgroundSize = 160 - window.pageYOffset / 12 + "%";
};