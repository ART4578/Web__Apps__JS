const input = document.querySelector(".input");
const body = document.querySelector("body");

input.checked = false;
input.checked = JSON.parse(localStorage.getItem("mode"));

update__body();

function update__body() {
    if (input.checked) {
        body.style.background = "black";
    } else {
        body.style.background = "white";
    }
};

input.addEventListener("input", () => {
    update__body();
    update__local__storige();
});

function update__local__storige() {
    localStorage.setItem("mode", JSON.stringify(input.checked));
};