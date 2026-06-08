class CurrencyConverter {
    constructor() {
        this.dropList = document.querySelectorAll(".drop-list select");
        this.fromCurrency = document.querySelector(".from select");
        this.toCurrency = document.querySelector(".to select");
        this.getButton = document.querySelector("form button");
        this.exchangeIcon = document.querySelector(".drop-list .icon");
        this.amount = document.querySelector(".amount input");
        this.exchangeRateText = document.querySelector(".exchage-rate");

        this.apiKey = "f23e51b0648cc2e1ade6df28";

        this.renderCurrencies();
        this.addEvents();

        this.loadFlag(this.fromCurrency);
        this.loadFlag(this.toCurrency);
        this.getExchangeRate();
    };

    renderCurrencies() {
        this.dropList.forEach((select, index) => {
            for (const currencyCode in countryData) {
                let selected = "";

                if (index === 0 && currencyCode === "USD") {
                    selected = "selected";
                };

                if (index === 1 && currencyCode === "NPR") {
                    selected = "selected";
                };

                select.insertAdjacentHTML("beforeend", `
                        <option value="${currencyCode}" ${selected}>
                            ${currencyCode}
                        </option>
                    `
                );
            };
        });
    };

    addEvents() {
        this.dropList.forEach((select) => {
            select.addEventListener("change", (e) => {
                this.loadFlag(e.target)
            });
        });

        this.getButton.addEventListener("click", (e) => {
                e.preventDefault();
                this.getExchangeRate();
            }
        );

        this.exchangeIcon.addEventListener("click", () => {
            this.swapCurrencies()
        });
    };

    loadFlag(element) {
        for (const code in countryData) {
            if (code === element.value) {
                const img = element.parentElement.querySelector("img");
                const countryCode = countryData[code].toLowerCase();

                img.src = `https://flagcdn.com/64x48/${countryCode}.png`;
            };
        };
    };

    swapCurrencies() {
        const temp = this.fromCurrency.value;

        this.fromCurrency.value = this.toCurrency.value;
        this.toCurrency.value = temp;
        this.loadFlag(this.fromCurrency);
        this.loadFlag(this.toCurrency);

        this.getExchangeRate();
    };

    async getExchangeRate() {
        let amountValue = this.amount.value;

        if (amountValue === "" || amountValue === "0") {
            amountValue = 1;
            this.amount.value = 1;
        };

        this.exchangeRateText.innerText = "Getting exchange rate...";

        const url = `https://v6.exchangerate-api.com/v6/${this.apiKey}/latest/${this.fromCurrency.value}`;

        try {
            const response = await fetch(url);
            const result = await response.json();

            const exchangeRate = result.conversion_rates[this.toCurrency.value];

            const total = (amountValue * exchangeRate).toFixed(2);

            this.exchangeRateText.innerText = `${amountValue} ${this.fromCurrency.value} = ${total} ${this.toCurrency.value}`;

        } catch (error) {
            this.exchangeRateText.innerText = "Something went wrong";
            console.error(error);
        };
    };
};

document.addEventListener("DOMContentLoaded", () => new CurrencyConverter());