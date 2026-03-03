class Translation {
    constructor() {
        this.languageSelector = document.querySelector("select");
        this.selectTitle = document.getElementById("select__title");
        this.title = document.getElementById("title");
        this.paragraf = document.getElementById("paragraf");

        this.translations = {
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

        this.init();
    };

    init() {
        this.languageSelector.addEventListener("change", (e) => this.setLanguage(e.target.value));
    };

    setLanguage(language) {
        const lang = this.translations[language];

        if (!lang) return;

        this.selectTitle.innerText = lang.select;
        this.title.innerText = lang.title;
        this.paragraf.innerText = lang.paragraf;
    };
};

document.addEventListener("DOMContentLoaded", () => new Translation());