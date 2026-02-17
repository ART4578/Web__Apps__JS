const dropList = document.querySelectorAll(".drop-list select");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const getButton = document.querySelector("form button");
const exchangeIcon = document.querySelector(".drop-list .icon");

for (let i = 0; i < dropList.length; i++) {
    for (currencyCode in countryData) {
        //selecting USD by default as FROM currency and NPR as TO currency
        let selected;

        if (i == 0) {
            selected = currencyCode == "USD" ? "selected" : "";
        } else if (i == 1) {
            selected = currencyCode == "NPR" ? "selected" : "";
        };


        //creating option tag with passing currency code as a text and value
        let optionTag = `<option value=${currencyCode}>${currencyCode}</option>`;
        //inserting options tag inside select tag
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    };

	dropList[i].addEventListener("change", (e) => {
		//calling loadFlag with passing target element as an argument
		loadFlag(e.target);
	});
};

function loadFlag(element) {
	for (code in countryData) {
		//if currency code of country list is equal to option value 
		if (code == element.value) {
			//selecting img tag of particular drop list 
			let imgTag = element.parentElement.querySelector("img");
			let countryCode = countryData[code].toLowerCase();
			//passing country code of a selected currency code in a img url
			imgTag.src = `https://flagcdn.com/64x48/${countryCode}.png`;
		};
	};
};

window.addEventListener("load", () => {
	loadFlag(fromCurrency);
	loadFlag(toCurrency);
	getExchangeRate();
});

getButton.addEventListener("click", (e) => {
    e.preventDefault();
    getExchangeRate();
});

exchangeIcon.addEventListener("click", () => {
	let tempCode = fromCurrency.value; //temporary currency code of FROM drop list
	fromCurrency.value = toCurrency.value; //passing TO currency code to FROM currency code 
	toCurrency.value = tempCode; //passing temporary currency code to TO currency code
	loadFlag(fromCurrency); //calling loadFlag with passing select element (fromCurrency) of FROM
	loadFlag(toCurrency); //calling loadFlag with passing select element (toCurrency) of TO
	getExchangeRate();
});

function getExchangeRate() {
    const amount = document.querySelector(".amount input");
	let exchangeRateText = document.querySelector(".exchage-rate");
    let amountValue = amount.value;
    
    //if user don't enter any value or enter 0 then we'll put 1 value by default in the input field
    if (amountValue == "" || amountValue == "0") {
        amount.value = "1";
        amountValue = 1;
    };
	
	exchangeRateText.innerText = "Getting exchange rate...";

    const apiKey = "f23e51b0648cc2e1ade6df28";
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;

    //fetching api response and returning it with parsing into js obj and in another then method receiving that obj
    fetch(url)
        .then((response) => response.json())
        .then((result) => {
            let exchangeRate = result.conversion_rates[toCurrency.value];
            /*we calculate the converted amount, amountValue -> fromCurrency.value,
			exchangeRate -> toCurrency.value*/
            let totalExchangeRate = (amountValue * exchangeRate).toFixed(2);
			exchangeRateText.innerText = `${amountValue} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
        })
        .catch((err) => {
			exchangeRateText.innerText = "Something went wrong";
			console.log(err);
		});
};