//We connect HTML elements to JS
const toggle = document.getElementById("toggleDark");
const body = document.querySelector("body");

//whenever this icon is clicked this function will be executed
toggle.addEventListener("click", function() {
    //We create a new class for the element
    this.classList.toggle("bi-moon");

    //if the class is a sun icon then the background will be white and if it is a moon icon then the background will be black
    if (this.classList.toggle("bi-brightness-high-fill")) {
        body.style.background = "white";
        body.style.color = "black";
        body.style.transition = "2s";
    } else {
        body.style.background = "black";
        body.style.color = "white";
        body.style.transition = "2s";
    }
});