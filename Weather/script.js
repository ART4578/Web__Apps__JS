class Weather {
    constructor() {
        this.cityInput = document.querySelector(".search input");
        this.button = document.querySelector(".search button");
        this.weatherIcon = document.querySelector(".weather-icon");
        this.weather = document.querySelector(".weather");
        this.error = document.querySelector(".error");
        this.cityName = document.querySelector(".city");
        this.temp = document.querySelector(".temp");
        this.humidity = document.querySelector(".humidity");
        this.wind = document.querySelector(".wind");

        this.apiKey = "7b11065fd7317444e4beedf5d19ecba8";

        this.button.addEventListener("click", () => this.checkWeather());
    };

    async checkWeather() {
        const cityValue = this.cityInput.value.trim();

        if (!cityValue) {
            alert("Մուտքագրեք քաղաքի անունը։");
        } else {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${this.apiKey}&units=metric`;

            const response = await fetch(apiUrl);

            if (response.status == 404) {
                this.error.style.display = "block";
                this.weather.style.display = "none";
            } else {
                const data = await response.json();

                this.cityName.innerHTML = data.name;
                this.temp.innerHTML = Math.round(data.main.temp) + "°c";
                this.humidity.innerHTML = data.main.humidity + "%";         
                this.wind.innerHTML = data.wind.speed + " km/h";

                const mainWeather = data.weather[0].main;

                switch (mainWeather) {
                    case "Clouds":
                        this.weatherIcon.src = "./img/clouds.png";
                        break;
                    case "Clear":
                        this.weatherIcon.src = "./img/clear.png";
                        break;
                    case "Rain":
                        this.weatherIcon.src = "./img/rain.png";
                        break;
                    case "Drizzle":
                        this.weatherIcon.src = "./img/drizzle.png";
                        break;
                    case "Mist":
                        this.weatherIcon.src = "./img/mist.png";
                        break;                
                };

                this.weather.style.display = "block";
                this.error.style.display = "none";

                //Ստեղծում ենք փոփոխական անունով utterance, որը պահելու է մեր արտասանվող տեքստը
                const utterance = new SpeechSynthesisUtterance(`city name: ${data.name}, city temperature: ${data.main.temp}, city humidity: ${data.main.humidity}, city wind speed: ${data.wind.speed}`);
                //Սա ասում է բրաուզերին՝ սկսիր տրված տեքստի օրինակ այս դեպքում` utterance ձայնային արտասանումը
                speechSynthesis.speak(utterance);
            };
        };
    };
};

//Երբ վեբ էջի ամբողջ HTML կառուցվածքը բեռնվի, ստեղծիր նոր Weather օբյեկտ
document.addEventListener("DOMContentLoaded", () => {
    new Weather();
});