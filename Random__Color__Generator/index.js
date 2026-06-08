class ColorGenerator {
  constructor(count = 30) {
    this.container = document.querySelector(".container");
    this.count = count;

    this.createBoxes();
    this.generateColors();
  };

  createBoxes() {
    for (let i = 0; i < this.count; i++) {
      const colorBox = document.createElement("div");

      colorBox.classList.add("color__container");

      this.container.appendChild(colorBox);
    };

    this.colorBoxes = document.querySelectorAll(".color__container");
  };

  generateColors() {
    this.colorBoxes.forEach((box) => {
      const color = this.randomColor();

      box.style.backgroundColor = `#${color}`;
      box.innerText = `#${color}`;
    });
  };

  randomColor() {
    const chars = "0123456789abcdef";

    let colorCode = "";

    for (let i = 0; i < 6; i++) {
      const randomNum = Math.floor(Math.random() * chars.length);

      colorCode += chars[randomNum];
    };

    return colorCode;
  };
};

document.addEventListener("DOMContentLoaded", () => new ColorGenerator());