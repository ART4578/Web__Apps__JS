class QRCodeGenerator {
    constructor() {
        this.wrapper = document.querySelector(".wrapper");
        this.qrInput = this.wrapper.querySelector(".form input");
        this.generateBtn = this.wrapper.querySelector("#generate");
        this.qrImg = this.wrapper.querySelector("#qr-image");
        this.downloadBtn = this.wrapper.querySelector("#download-btn");
        this.downloadLink = this.wrapper.querySelector("#download-link");

        this.preValue = "";

        this.addEvents();
    };

    addEvents() {
        this.generateBtn.addEventListener("click", () => this.generateQRCode());
        this.qrInput.addEventListener("keyup", () => this.resetQRCode());
    };

    generateQRCode() {
        const qrValue = this.qrInput.value.trim();

        if (!qrValue || this.preValue === qrValue) return;

        this.preValue = qrValue;
        this.generateBtn.innerText = "Generating QR Code...";
        this.qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;

        this.qrImg.onload = () => {
            this.wrapper.classList.add("active");
            this.generateBtn.innerText = "Generate QR Code";
            this.downloadBtn.disabled = false;
            this.downloadLink.href = this.qrImg.src;
        };
    };

    resetQRCode() {
        if (!this.qrInput.value.trim()) {
            this.wrapper.classList.remove("active");

            this.preValue = "";

            this.downloadBtn.disabled = true;
        };
    };
};

document.addEventListener("DOMContentLoaded", () => new QRCodeGenerator());