let readBtn = document.querySelector("#read");
let moreText = document.querySelector("#more");
let dots = document.querySelector("#dots");

let i = 0;

function read() {
    if (!i) {
        moreText.style.display = "inline";
        dots.style.display = "none";
        readBtn.innerHTML = "Read Less";
        i = 1;
    } else {
        moreText.style.display = "none";
        dots.style.display = "inline";
        readBtn.innerHTML = "Read More";
        i = 0;
    };
};

readBtn.addEventListener("click", read);