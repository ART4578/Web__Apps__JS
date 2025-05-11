const analyzeBtn = document.getElementById("analyzeBtn");
const moodInput = document.getElementById("mood");

function isArmenianText(text) {
    const armenianRegex = /^[\u0531-\u0587\s։՜՛՞«»\-.,0-9😊😢]*$/;
    return armenianRegex.test(text);
};

class MoodAdvisor {
    constructor (name) {
        this.name = name;
    };

    giveAdvice (mood) {
        mood = mood.toLowerCase();

        switch (true) {
            case /հոգնած|նյարդայնացած|հոգնեցուցիչ/.test(mood):
                return "Խորհուրդ եմ տալիս մի փոքր հանգստանալ, խմել մի բաժակ ջուր և դուրս գալ մաքուր օդ։";
            case /ուրախ|երջանիկ|հիասքանչ|😊/.test(mood):
                return "Հիանալի է, որ լավ տրամադրություն ունեք։ Շարունակեք այդպես։";
            case /տխուր|տխրություն|😢/.test(mood):
                return "Ձեր տրամադրությունը տխուր է։ Փորձեք լսել սիրելի երաժշտություն կամ զրուցել ընկերների հետ։";
            default:
                return "Ձեր տրամադրությունը հետաքրքիր է։ Փորձեք զբաղվել սիրելի գործով։";
        };
    };
};

const advisor = new MoodAdvisor("MetaBot");

analyzeBtn.addEventListener("click", () => {
    const mood = moodInput.value.toLowerCase();
    const resultText = document.getElementById("resultText");
    const suggestion = document.getElementById("suggestion");
    const output = document.getElementById("mirror-output");
    
    if (!mood.trim()) {
        alert("Խնդրում ենք գրել տրամադրությունը կամ մի էմոջի 😊");
        return;
    };

    if (!isArmenianText(mood)) {
        alert("Խնդրում ենք գրել միայն հայերեն տառերով։ Օրինակ՝ ուրախ, տխուր, հոգնած և այլն։");
        return;
    };

    const advice = advisor.giveAdvice(mood);

    resultText.innerText = `📊 Վերլուծություն: ${mood}`;
    suggestion.innerText = `🤖 Խորհուրդ: ${advice}`;
    output.classList.remove("hidden");
    
    const logs = JSON.parse(localStorage.getItem("mirror_logs") || "[]");
    logs.push({ mood, advice, date: new Date().toLocaleString() });
    localStorage.setItem("mirror_logs", JSON.stringify(logs));
});

function renderMoodChart() {
    const logs = JSON.parse(localStorage.getItem("mirror_logs") || "[]");
    const labels = logs.map((log) => log.date);
    const data = logs.map((log) => {
        if (/ուրախ|երջանիկ|հիասքանչ|😊/.test(log.mood)) {
            return 3
        };

        if (/հոգնած|նյարդայնացած|հոգնեցուցիչ/.test(log.mood)) {
            return 2
        };

        if (/տխուր|տխրություն|😢/.test(log.mood)) {
            return 1
        };

        return 0;
    });

    const canvas = document.getElementById("moodChart");
    const ctx = canvas.getContext("2d");

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

window.addEventListener("load", renderMoodChart);

moodInput.addEventListener("input", (e) => {
    const original = e.target.value;
    const allowed = original.match(/[\u0531-\u0587\s։՜՛՞«».,0-9😊😢\-]/g);
    e.target.value = allowed ? allowed.join("") : "";
});