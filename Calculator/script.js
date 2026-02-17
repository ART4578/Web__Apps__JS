class Calculator {
    constructor() {
        this.container = document.querySelector(".container");

        this.createLayout();
        this.init();
    };

    createLayout() {
        //Calculator wrapper
        this.calculator = document.createElement("div");
        this.calculator.className = "calculator";

        //Display
        this.display = document.createElement("input");
        this.display.type = "text";
        this.display.readOnly = true;
        this.display.className = "display";

        //Buttons wrapper
        this.buttons = document.createElement("div");
        this.buttons.className = "buttons";

        //Button configuration
        this.btnConfig = [
            { text: "AC", action: "clear", class: "operator" },
            { text: "DE", action: "delete", class: "operator" },
            { text: ".", value: ".", class: "operator" },
            { text: "/", value: "/", class: "operator" },
            { text: "7", value: "7" },
            { text: "8", value: "8" },
            { text: "9", value: "9" },
            { text: "*", value: "*", class: "operator" },
            { text: "4", value: "4" },
            { text: "5", value: "5" },
            { text: "6", value: "6" },
            { text: "-", value: "-", class: "operator" },
            { text: "1", value: "1" },
            { text: "2", value: "2" },
            { text: "3", value: "3" },
            { text: "+", value: "+", class: "operator" },
            { text: "00", value: "00" },
            { text: "0", value: "0" },
            { text: "=", action: "calculate", class: "equal operator" },
        ];

        //Create buttons dynamically
        this.btnConfig.forEach((btn) => {
            const button = document.createElement("button");
            button.type = "button";
            button.textContent = btn.text;

            if (btn.value) button.dataset.value = btn.value;
            if (btn.action) button.dataset.action = btn.action;
            if (btn.class) button.className = btn.class;

            this.buttons.appendChild(button);
        });

        //Append everything
        this.calculator.appendChild(this.display);
        this.calculator.appendChild(this.buttons);
        this.container.appendChild(this.calculator);
    };

    init() {
        this.buttons.addEventListener("click", (e) => {
            const button = e.target.closest("button");
            if (!button) return;

            const { value, action } = button.dataset;

            if (value) this.append(value);
            if (action) this.handleAction(action);
        });
    };

    append(value) {
        this.display.value += value;
    };

    handleAction(action) {
        switch (action) {
            case "clear":
                this.display.value = "";
                break;
            case "delete":
                this.display.value = this.display.value.slice(0, -1);
                break;
            case "calculate":
                this.calculate();
                break;
        };
    };

    calculate() {
        try {
            this.display.value = Function(`return ${this.display.value}`)();
        } catch {
            this.display.value = "Error";
        };
    };
};

document.addEventListener("DOMContentLoaded", () => new Calculator());