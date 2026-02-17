class Translation {
    constructor() {
        this.el = {
            input: document.getElementById("inputText"),
            output: document.getElementById("outputText"),
            from: document.getElementById("fromLanguage"),
            to: document.getElementById("toLanguage"),
            swap: document.getElementById("swap"),
            copyIn: document.getElementById("copyInput"),
            copyOut: document.getElementById("copyOutput"),
            speak: document.getElementById("speak"),
            toast: document.getElementById("toast-container")
        };

        this.languages = {
            af: { name: "Afrikaans", tts: "af-ZA" },
            sq: { name: "Albanian", tts: "sq-AL" },
            am: { name: "Amharic", tts: "am-ET" },
            ar: { name: "Arabic", tts: "ar-SA" },
            hy: { name: "Armenian", tts: "hy-AM" },
            az: { name: "Azerbaijani", tts: "az-AZ" },
            eu: { name: "Basque", tts: "eu-ES" },
            be: { name: "Belarusian", tts: "be-BY" },
            bn: { name: "Bengali", tts: "bn-BD" },
            bs: { name: "Bosnian", tts: "bs-BA" },
            bg: { name: "Bulgarian", tts: "bg-BG" },
            ca: { name: "Catalan", tts: "ca-ES" },
            ceb:{ name: "Cebuano", tts: "ceb-PH" },
            zh: { name: "Chinese", tts: "zh-CN" },
            co: { name: "Corsican", tts: "co-FR" },
            hr: { name: "Croatian", tts: "hr-HR" },
            cs: { name: "Czech", tts: "cs-CZ" },
            da: { name: "Danish", tts: "da-DK" },
            nl: { name: "Dutch", tts: "nl-NL" },
            en: { name: "English", tts: "en-US" },
            eo: { name: "Esperanto", tts: "eo-EO" },
            et: { name: "Estonian", tts: "et-EE" },
            fi: { name: "Finnish", tts: "fi-FI" },
            fr: { name: "French", tts: "fr-FR" },
            fy: { name: "Frisian", tts: "fy-NL" },
            gl: { name: "Galician", tts: "gl-ES" },
            ka: { name: "Georgian", tts: "ka-GE" },
            de: { name: "German", tts: "de-DE" },
            el: { name: "Greek", tts: "el-GR" },
            gu: { name: "Gujarati", tts: "gu-IN" },
            ht: { name: "Haitian Creole", tts: "ht-HT" },
            ha: { name: "Hausa", tts: "ha-NG" },
            haw:{ name: "Hawaiian", tts: "haw-US" },
            he: { name: "Hebrew", tts: "he-IL" },
            hi: { name: "Hindi", tts: "hi-IN" },
            hmn:{ name: "Hmong", tts: "hmn-US" },
            hu: { name: "Hungarian", tts: "hu-HU" },
            is: { name: "Icelandic", tts: "is-IS" },
            ig: { name: "Igbo", tts: "ig-NG" },
            id: { name: "Indonesian", tts: "id-ID" },
            ga: { name: "Irish", tts: "ga-IE" },
            it: { name: "Italian", tts: "it-IT" },
            ja: { name: "Japanese", tts: "ja-JP" },
            jv: { name: "Javanese", tts: "jv-ID" },
            kn: { name: "Kannada", tts: "kn-IN" },
            kk: { name: "Kazakh", tts: "kk-KZ" },
            km: { name: "Khmer", tts: "km-KH" },
            rw: { name: "Kinyarwanda", tts: "rw-RW" },
            ko: { name: "Korean", tts: "ko-KR" },
            ku: { name: "Kurdish", tts: "ku-TR" },
            ky: { name: "Kyrgyz", tts: "ky-KG" },
            lo: { name: "Lao", tts: "lo-LA" },
            la: { name: "Latin", tts: "la-VA" },
            lv: { name: "Latvian", tts: "lv-LV" },
            lt: { name: "Lithuanian", tts: "lt-LT" },
            lb: { name: "Luxembourgish", tts: "lb-LU" },
            mk: { name: "Macedonian", tts: "mk-MK" },
            mg: { name: "Malagasy", tts: "mg-MG" },
            ms: { name: "Malay", tts: "ms-MY" },
            ml: { name: "Malayalam", tts: "ml-IN" },
            mt: { name: "Maltese", tts: "mt-MT" },
            mi: { name: "Maori", tts: "mi-NZ" },
            mr: { name: "Marathi", tts: "mr-IN" },
            mn: { name: "Mongolian", tts: "mn-MN" },
            my: { name: "Myanmar", tts: "my-MM" },
            ne: { name: "Nepali", tts: "ne-NP" },
            no: { name: "Norwegian", tts: "no-NO" },
            ny: { name: "Nyanja", tts: "ny-MW" },
            or: { name: "Odia", tts: "or-IN" },
            ps: { name: "Pashto", tts: "ps-AF" },
            fa: { name: "Persian", tts: "fa-IR" },
            pl: { name: "Polish", tts: "pl-PL" },
            pt: { name: "Portuguese", tts: "pt-PT" },
            pa: { name: "Punjabi", tts: "pa-IN" },
            ro: { name: "Romanian", tts: "ro-RO" },
            ru: { name: "Russian", tts: "ru-RU" },
            sm: { name: "Samoan", tts: "sm-WS" },
            gd: { name: "Scots Gaelic", tts: "gd-GB" },
            sr: { name: "Serbian", tts: "sr-RS" },
            st: { name: "Sesotho", tts: "st-LS" },
            sn: { name: "Shona", tts: "sn-ZW" },
            sd: { name: "Sindhi", tts: "sd-PK" },
            si: { name: "Sinhala", tts: "si-LK" },
            sk: { name: "Slovak", tts: "sk-SK" },
            sl: { name: "Slovenian", tts: "sl-SI" },
            so: { name: "Somali", tts: "so-SO" },
            es: { name: "Spanish", tts: "es-ES" },
            su: { name: "Sundanese", tts: "su-ID" },
            sw: { name: "Swahili", tts: "sw-KE" },
            sv: { name: "Swedish", tts: "sv-SE" },
            tl: { name: "Tagalog", tts: "tl-PH" },
            tg: { name: "Tajik", tts: "tg-TJ" },
            ta: { name: "Tamil", tts: "ta-IN" },
            tt: { name: "Tatar", tts: "tt-RU" },
            te: { name: "Telugu", tts: "te-IN" },
            th: { name: "Thai", tts: "th-TH" },
            tr: { name: "Turkish", tts: "tr-TR" },
            tk: { name: "Turkmen", tts: "tk-TM" },
            uk: { name: "Ukrainian", tts: "uk-UA" },
            ur: { name: "Urdu", tts: "ur-PK" },
            ug: { name: "Uyghur", tts: "ug-CN" },
            uz: { name: "Uzbek", tts: "uz-UZ" },
            vi: { name: "Vietnamese", tts: "vi-VN" },
            cy: { name: "Welsh", tts: "cy-GB" },
            xh: { name: "Xhosa", tts: "xh-ZA" },
            yi: { name: "Yiddish", tts: "yi-DE" },
            yo: { name: "Yoruba", tts: "yo-NG" },
            zu: { name: "Zulu", tts: "zu-ZA" }
        }; 

        this.translate = this.debounce(this.translate.bind(this), 100);

        this.init();
    };

    init() {
        this.fillLanguages();
        this.restoreState();
        this.bindEvents();
    };

    fillLanguages() {
        Object.entries(this.languages).forEach(([code, languageName]) => {
            this.el.from.innerHTML += `<option value="${code}">${languageName.name}</option>`;
            this.el.to.innerHTML += `<option value="${code}">${languageName.name}</option>`;
        });
    };

    restoreState() {
        this.el.from.value = localStorage.getItem("fromLanguage") || "en";
        this.el.to.value = localStorage.getItem("toLanguage") || "ru";
        this.el.input.value = localStorage.getItem("input") || "";
        this.el.output.value = localStorage.getItem("output") || "";
    };

    bindEvents() {
        this.el.input.addEventListener("input", this.translate);
        this.el.from.addEventListener("change", () => this.saveLang("fromLanguage"));
        this.el.to.addEventListener("change", () => this.saveLang("toLanguage"));
        this.el.swap.addEventListener("click", () => this.swapLangs());
        this.el.copyIn.addEventListener("click", () => this.copy(this.el.input.value));
        this.el.copyOut.addEventListener("click", () => this.copy(this.el.output.value));
        this.el.speak.addEventListener("click", () => this.speak());
    };

    saveLang(key) {
        localStorage.setItem(key, this.el[key === "fromLanguage" ? "from" : "to"].value);
        this.translate();
    };

    swapLangs() {
        [this.el.from.value, this.el.to.value] = [this.el.to.value, this.el.from.value];
        this.translate();
    };

    async translate() {
        if (!this.el.input.value.trim()) {
            this.el.output.value = "";
            localStorage.clear();
            return;
        };

        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(this.el.input.value)}&langpair=${this.el.from.value}|${this.el.to.value}`;

        try {
            const res = await fetch(url).then(r => r.json());
            this.el.output.value = res.responseData.translatedText;
            localStorage.setItem("input", this.el.input.value);
            localStorage.setItem("output", this.el.output.value);
        } catch {
            this.el.output.value = "Translation unavailable";
        };
    };

    copy(text) {
        if (!text.trim()) return;
        navigator.clipboard.writeText(text);
        this.toastMsg("Copied!");
    };

    speak() {
        if (!this.el.output.value.trim()) return;
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(this.el.output.value);
        u.lang = this.languages[this.el.to.value]?.tts || "en-US";
        speechSynthesis.speak(u);
    };

    debounce(fn, d) {
        let t;
        return (...a) => (clearTimeout(t), t = setTimeout(() => fn(...a), d));
    };

    toastMsg(msg) {
        const t = document.createElement("div");
        t.className = "toast show";
        t.textContent = msg;
        this.el.toast.appendChild(t);
        setTimeout(() => t.remove(), 1800);
    };
};

document.addEventListener("DOMContentLoaded", () => new Translation());