class PasswordGenerator {
    constructor() {
        this.passwordBox = document.getElementById("password");
        this.generateBtn = document.getElementById("generatePassBtn");
        this.copyBtn = document.getElementById("copyPass");
        this.length = 12;

        this.upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.lowerCase = "abcdefghijklmnopqrstuvwxyz";
        this.number = "0123456789";
        this.symbol = "@#$%^&*()_+~|}{[]></-=";

        this.allChars = this.upperCase + this.lowerCase + this.number + this.symbol;

        this.init();
    };

    init() {
        this.generateBtn.addEventListener("click", () => this.generatePassword());
        this.copyBtn.addEventListener("click", () => this.copyPassword());
    };

    getRandomChar(str) {
        return str[Math.floor(Math.random() * str.length)];
    };

    generatePassword() {
        let password = "";

        password += this.getRandomChar(this.upperCase);
        password += this.getRandomChar(this.lowerCase);
        password += this.getRandomChar(this.number);
        password += this.getRandomChar(this.symbol);

        while (password.length < this.length) {
            password += this.getRandomChar(this.allChars);
        };

        this.passwordBox.value = password;
    };

    copyPassword() {
        navigator.clipboard.writeText(this.passwordBox.value);
        alert("Password copied!");
    };
};

document.addEventListener("DOMContentLoaded", () => new PasswordGenerator());