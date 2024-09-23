const translations = {
    en: {
        select: "Select a Language",
        title: "Welcome To Simple Web Code",
        paragraf: "Language of my website"
    },
    ar: {
        select: "اختر اللغة",
        title: "مرحباً بكم في كود الويب البسيط",
        paragraf: "لغة موقعي"
    }
};

const languageSelector = document.querySelector("select");
const selectTitle = document.getElementById("select__title");
const title = document.getElementById("title");
const paragraf = document.getElementById("paragraf");

languageSelector.addEventListener("change", function(event) {
    setLanguage(event.target.value);
});

function setLanguage(language) {
    if (language == "ar") {
        selectTitle.innerText = translations.ar.select;
        title.innerText = translations.ar.title;
        paragraf.innerText = translations.ar.paragraf;
    } else if (language == "en") {
        selectTitle.innerText = translations.en.select;
        title.innerText = translations.en.title;
        paragraf.innerText = translations.en.paragraf;
    };
};