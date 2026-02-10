let inputText = document.getElementById("inputText"); 
let outputText = document.getElementById("outputText"); 
let fromLanguage = document.getElementById("fromLanguage"); 
let toLanguage = document.getElementById("toLanguage"); 
let swapBtn = document.getElementById("swap");
let copyInput = document.getElementById("copyInput");
let copyOutput = document.getElementById("copyOutput");
let speakBtn = document.getElementById("speak");

//select languages
const languages = {
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

/*makes the object an array and goes over each language 
takes the key and value and adds them to the select*/
Object.entries(languages).forEach(([code, data]) => {
	fromLanguage.innerHTML += `<option value="${code}">${data.name}</option>`;
	toLanguage.innerHTML += `<option value="${code}">${data.name}</option>`; 
});

//get previous selection from localStorage.
const savedFrom = localStorage.getItem("fromLanguage");
const savedTo = localStorage.getItem("toLanguage");

//if available in localStorage → use, otherwise default.
fromLanguage.value = savedFrom || "en";
toLanguage.value = savedTo || "ru";

if (savedFrom) fromLanguage.value = savedFrom;
if (savedTo) toLanguage.value = savedTo;

//when the user changes select → save to localStorage.
fromLanguage.addEventListener("change", () => {
    localStorage.setItem("fromLanguage", fromLanguage.value);
});

toLanguage.addEventListener("change", () => {
    localStorage.setItem("toLanguage", toLanguage.value);
});

//swap languages
swapBtn.addEventListener("click", () => {
	[fromLanguage.value, toLanguage.value] = [toLanguage.value, fromLanguage.value];
	liveTranslate();
});

//input text translate
async function translateTextLive() {
	//When the entered text is deleted, the translated text is also automatically deleted.
	if (!inputText.value.trim()) {
        outputText.value = "";
        localStorage.removeItem("input");
        localStorage.removeItem("output");
        return;
    };
	
	const encodedText = encodeURIComponent(inputText.value);
	const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${fromLanguage.value}|${toLanguage.value}`;
	
	try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Translation error");

        const data = await response.json();
        outputText.value = data.responseData.translatedText;

        localStorage.setItem("input", inputText.value);
        localStorage.setItem("output", outputText.value);
    } catch (err) {
        outputText.value = "Translation is not available.";
        console.error(err);
    };
};

function debounce(fn, delay = 100) {
    let timer;
	
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
};

const liveTranslate = debounce(translateTextLive, 100);

inputText.addEventListener("input", liveTranslate);
fromLanguage.addEventListener("change", liveTranslate);
toLanguage.addEventListener("change", liveTranslate);

//copy input text
copyInput.addEventListener("click", () => {
	if (!inputText.value.trim()) return;
	navigator.clipboard.writeText(inputText.value);
	showToast("Input copied!", 1500, "success");
});

//copy output text
copyOutput.addEventListener("click", () => {
	if (!outputText.value.trim()) return;
	navigator.clipboard.writeText(outputText.value);
	showToast("Output copied!", 1500, "success");
});

//listen to the translation
speakBtn.addEventListener("click", () => {
	if (!outputText.value.trim()) return;
	
	/*We create a new speech object` (SpeechSynthesisUtterance).
    The text to be spoken is, in our case, outputText.value (the translated text).*/
	const utter = new SpeechSynthesisUtterance(outputText.value);
	//This tells you in which language the speech should be heard.
	utter.lang = languages[toLanguage.value]?.tts || "en-US";
	
	/*If some text was spoken last time and it has not yet ended, that is, the voice 
	is active → stops it.*/
	speechSynthesis.cancel();
	
	//Starts the text being spoken using the computer's or browser's text-to-speech engine.
	speechSynthesis.speak(utter);
});

/*This function is executed after the entire page load. It fills the input and output
textareas from localStorage, if something was saved the previous time. If there is no
data in localStorage → an empty string is used. This way the user sees their previous
text when opening the page.*/
window.onload = () => {
    inputText.value = localStorage.getItem("input") || "";
    outputText.value = localStorage.getItem("output") || "";
};

//toast message
function showToast(message, duration = 2000, type = "success") {
    const container = document.getElementById("toast-container");

    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.textContent = message;
  
    if (type === "success") toast.style.color = "green";
    else if (type === "error") toast.style.color = "red";

    container.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 10);

    setTimeout(() => {
        toast.classList.remove("show");
        toast.classList.add("hide");
    }, duration);

    setTimeout(() => container.removeChild(toast), duration + 500);
};