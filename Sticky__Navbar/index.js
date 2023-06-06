const navbar = document.querySelector(".navbar");
const bottom__container = document.querySelector(".bottom__container");

window.addEventListener("scroll", () => {
    if (window.scrollY > bottom__container.offsetTop - navbar.offsetHeight - 50) {
        navbar.classList.add("active");
    } else {
        navbar.classList.remove("active");
    }
});