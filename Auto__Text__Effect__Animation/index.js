const container = document.querySelector(".container");

const carrers = ["Youtuber", "Web Developer", "Freelancer", "Instructor"];

let career__index = 0;
let character__index = 0; 

update__text();

function update__text() {
    character__index++;

    container.innerHTML = `
        <h1>I am ${carrers[career__index].slice(0, 1) === "I" ? "an" : "a"} ${carrers[career__index].slice(0, character__index)}</h1>
    `;

    if (character__index === carrers[career__index].length) {
        career__index++;
        character__index = 0;
    }

    if (career__index === carrers.length) {
        career__index = 0;
    }

    setTimeout(update__text, 400);
};