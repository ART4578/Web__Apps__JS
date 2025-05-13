let analyzeBtn = document.getElementById("analyzeBtn");
let moodInput = document.getElementById("mood");
let resultText = document.getElementById("resultText");
let suggestionText = document.getElementById("suggestion");
let output = document.getElementById("mirror-output");
let canvas = document.getElementById("moodChart");
let ctx = canvas.getContext("2d");

//Այս ֆունկցիան ստուգում է՝ արդյո՞ք մուտքագրված տեքստը միայն հայերեն տառեր, հատուկ նշաններ, թվեր և էմոջիներ է պարունակում։
function isArmenianText(text) {
    const armenianRegex = /^[\u0531-\u0587\s։՜՛՞«»\-.,0-9😊😢]*$/;
    return armenianRegex.test(text);
};

// Ստեղծվել է դաս՝ MoodAdvisor, որն ունի giveAdvice() մեթոդ՝ տրամադրությունը վերլուծելու և համապատասխան խորհուրդ տալու համար։ giveAdvice()-ը՝ Ստուգում է, արդյոք տեքստում կա որևէ հետևյալ տրամադրություններից՝ հոգնած, ուրախ, տխուր, եթե ոչ՝ վերադարձնում է ընդհանրական խորհուրդ։
class MoodAdvisor {
    constructor (name) {
        this.name = name;
    };

    giveAdvice(moodInput) {
        moodInput = moodInput.toLowerCase();

        switch (true) {
            case /հոգնած|նյարդայնացած|հոգնեցուցիչ/.test(moodInput):
                return "Խորհուրդ եմ տալիս մի փոքր հանգստանալ, խմել մի բաժակ ջուր և դուրս գալ մաքուր օդ։";
            case /ուրախ|երջանիկ|հիասքանչ|😊/.test(moodInput):
                return "Հիանալի է, որ լավ տրամադրություն ունեք։ Շարունակեք այդպես։";
            case /տխուր|տխրություն|😢/.test(moodInput):
                return "Ձեր տրամադրությունը տխուր է։ Փորձեք լսել սիրելի երաժշտություն կամ զրուցել ընկերների հետ։";
            default:
                return "Ձեր տրամադրությունը հետաքրքիր է։ Փորձեք զբաղվել սիրելի գործով։";
        };
    };
};

const advisor = new MoodAdvisor("MetaBot");

//Այս գործողությունը տեղի է ունենում երբ սեղմվում է Վերլուծել կոճակը։ 
analyzeBtn.addEventListener("click", () => {
    moodInput = moodInput.value.toLowerCase();

    //Ստուգում է՝ Մուտքը դատարկ չէ։
    if (!moodInput.trim()) {
        alert("Խնդրում ենք գրել տրամադրությունը կամ մի էմոջի 😊");
        return;
    };

    //Ստուգում է՝ Հայերեն է մուտքագրված տեքստը։
    if (!isArmenianText(moodInput)) {
        alert("Խնդրում ենք գրել միայն հայերեն տառերով։ Օրինակ՝ ուրախ, տխուր, հոգնած և այլն։");
        return;
    };

    const advice = advisor.giveAdvice(moodInput);

    //Եթե ամեն ինչ լավ է՝ Վերլուծում է տրամադրությունը և ցույց է տալիս արդյունքը։
    resultText.innerText = `📊 Վերլուծություն: ${moodInput}`;
    suggestionText.innerText = `🤖 Խորհուրդ: ${advice}`;
    output.classList.remove("hidden");

    //Պահպանում է տվյալները localStorage-ում՝ տրամադրության պատմություն ստեղծելու համար։
    const logs = JSON.parse(localStorage.getItem("mirror_logs") || "[]");
    logs.push({ moodInput, advice, date: new Date().toLocaleString() });
    localStorage.setItem("mirror_logs", JSON.stringify(logs));
});

//Այս ֆունկցիան՝ ստանում է պահված տրամադրությունների ցանկը և յուրաքանչյուր տրամադրությանը տալիս է մի գնահատական (3 – բարձր, 2 – միջին, 1 – ցածր, 0 – անհայտ)։ Գծում է գծապատկեր Chart.js գրադարանով՝ ցույց տալով տրամադրության փոփոխությունները ժամանակի ընթացքում։
function renderMoodChart() {
    const logs = JSON.parse(localStorage.getItem("mirror_logs") || "[]");
    const labels = logs.map((log) => log.date);
    const data = logs.map((log) => {
        if (/ուրախ|երջանիկ|հիասքանչ|😊/.test(log.moodInput)) return 3;
        if (/հոգնած|նյարդայնացած|հոգնեցուցիչ/.test(log.moodInput)) return 2;
        if (/տխուր|տխրություն|😢/.test(log.moodInput)) return 1;

        return 0;
    });

    new Chart(ctx, {
        type: "line",
        data: {
        labels,
        datasets: [{
                label: "Տրամադրության մակարդակ",
                data,
                borderColor: "rgba(0, 150, 136, 1)",
                backgroundColor: "rgba(0, 150, 136, 0.2)",
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    ticks: {
                        callback: function(value) {
                            switch (value) {
                                case 3: return "Բարձր";
                                case 2: return "Միջին";
                                case 1: return "Ցածր";
                                default: return "Անհայտ";
                            }
                        }
                    }
                }
            }
        }
    });
};

//Երբ էջը ամբողջությամբ բեռնվում է, միանգամից գծապատկերը ցուցադրվում է։
window.addEventListener("load", renderMoodChart);

//Թույլ է տալիս մուտքագրել միայն հայերեն նիշեր և էմոջիներ։ Եթե օգտագործողը սխալ բան մուտքագրի (օրինակ՝ անգլերեն), ավտոմատ ջնջվում է։
moodInput.addEventListener("input", (e) => {
    const original = e.target.value;
    const allowed = original.match(/[\u0531-\u0587\s։՜՛՞«».,0-9😊😢\-]/g);
    e.target.value = allowed ? allowed.join("") : "";
});