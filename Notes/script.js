const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes");
};

showNotes();

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
};

createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");

    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "img/delete.png";

    notesContainer.appendChild(inputBox).appendChild(img);
});

notesContainer.addEventListener("click", e => {
    switch (e.target.tagName) {
        case "IMG": 
            e.target.parentElement.remove();
            updateStorage();
            break;
        case "P":
            notes = document.querySelectorAll(".input-box");

            notes.forEach(note => {
                note.onkeyup = function() {
                    updateStorage();
                };
            });
    };
});

document.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        document.execCommand("insertLineBreak");
        e.preventDefault();
    };
});