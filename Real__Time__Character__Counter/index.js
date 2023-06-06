const textarea = document.getElementById("textarea");
const total__counter = document.getElementById("total__counter"); 
const remaining__counter = document.getElementById("remaining__counter");

textarea.addEventListener("keyup", () => {
    update__counter();  
});

update__counter();

function update__counter() {
    total__counter.innerText = textarea.value.length;
    remaining__counter.innerText = textarea.getAttribute("maxLength") - textarea.value.length;
};