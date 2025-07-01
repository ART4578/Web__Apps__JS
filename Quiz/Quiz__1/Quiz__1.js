//questions data
const questions = [
    {
        question: "Ո՞ր շարքի բոլոր բառերի բաց թողած տեղում է գրվում միևնույն տառը կամ տառակապակցությունը:",
        answers: [
            { text: "1)ճրա-ալույց, նետաձի-, բեր-առատ (գ կամ ք)", correct: false },
            { text: "2)գու-կան, դ-խո, երա-տակավ (ժ կամ շ)", correct: false },
            { text: "3)խավ-ր, դաստ-րակ, միմ-յն (յա կամ իա)", correct: true }
        ]
    },
    {
        question: "Ո՞ր բառում ույ երկհնչյուն կա:", 
        answers: [
            { text: "1)ծաղկահ-ս", correct: false },
            { text: "2)առ-ծասիրտ", correct: false },
            { text: "3)կենտրոնախ-ս", correct: true }
        ]
    },
    {
        question: "Ո՞ր բառում ը ձայնավորի հնչյունափոխություն կա:",
        answers: [
            { text: "1)լուսնկա", correct: false },
            { text: "2)դստրիկ", correct: true },
            { text: "3)գրչատուփ", correct: false }
        ]
    },
    {
        question: "Տրված բառերից ո՞րն է կազմված միայն երկու արմատից:",
        answers: [
            { text: "1)հեռագրալար", correct: false },
            { text: "2)փորձանոթ", correct: true },
            { text: "3)արտադրանք", correct: false }
        ]
    },
    {
        question: "Ո՞ր բառը հետևյալ բառերից ոչ մեկի հոմանիշը չէ՝ բաղձանք, բազմաթույր, անպաճույճ:",
        answers: [
            { text: "1)երփներանգ", correct: false },
            { text: "2)անշուք", correct: false },
            { text: "3)իղձ", correct: false },
            { text: "4)ձանձրույթ", correct: true }
        ]
    },
    {
        question: "Ո՞ր տարբերակի բառազույգերն են հականիշներ:",
        answers: [
            { text: "1)հակիրճ - ամբողջական", correct: false },
            { text: "2)զառամյալ - դեռատի", correct: true },
            { text: "3)բեկբեկուն - աղեղնաձև", correct: false }
        ]
    },
    {
        question: "Ո՞ր բառակապակցությունը դարձվածային իմաստ չունի:",
        answers: [
            { text: "1)թիկունքից հարվածել", correct: false },
            { text: "2)համեստ ձևանալ", correct: true },
            { text: "3)արյունը երակներում սառչել", correct: false }
        ]
    },
    {
        question: "Ո՞ր շարքի բոլոր բառերն են ածականներ:",
        answers: [
            { text: "1)խոշոր, արգավանդ, ամայի", correct: true },
            { text: "2)ծիրանագույն, ատաղձ, կաղ", correct: false },
            { text: "3)գանգուր, ամոթ, որոշակի", correct: false }
        ]
    },
    {
        question: "Ո՞ր շարքի բոլոր բառերն են բարդածանցավոր:",
        answers: [
            { text: "1)մրգառատ, մարզպետարան, հավերժաբուխ", correct: false },
            { text: "2)անգործություն, ձերբակալում, կառավարիչ", correct: false },
            { text: "3)առաջնակարգ, բերքատու, ընդդիմախոս", correct: true }
        ]
    },
    {
        question: "Ո՞ր շարքում բառի կազմության սխալ ձև չկա:",
        answers: [
            { text: "1)ավերել, հօգուտ, ազգամեջյան", correct: false },
            { text: "2)պարզեցնել, ծաղկեվաճառ, դռնբաց", correct: false },
            { text: "3)լուսատտիկ, խոնավացնել, սիզախոտ", correct: true }
        ]
    }
];

//imported html elements
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0; //question index
let score = 0; //score

//start quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    nextButton.innerHTML = "Հաջորդը";

    showQuestion();
};

//show question
function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex]; //questions(questions data)[question index(0) = 1 question]
    let questionNo = currentQuestionIndex + 1; //question index(0) + 1

    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
    //questions data question index.answers.forEach(answer => {}); 
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button"); //create button element
        button.innerHTML = answer.text; //button element text = answer.text
        button.classList.add("btn"); //button element add btn class
        answerButtons.appendChild(button);

        //answer correct true
        if (answer.correct) {
            button.dataset.correct = answer.correct; //button correct(text) = answer correct
        };

        button.addEventListener("click", selectAnswer);
    });
};

//reset state
function resetState() {
    nextButton.style.display = "block";
    nextButton.style.pointerEvents = "none";
    nextButton.style.opacity = "0.8";

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    };
};

//select answer
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true"; //selected correct = questions data answers array correct value
    
    if (isCorrect) { //selected button correct = true selected button add correct class
        selectedBtn.classList.add("correct");
        score++; 
    } else { //selected button correct = false selected button add incorrect class
        selectedBtn.classList.add("incorrect");
    };

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct == "true") {
            button.classList.add("correct");
        };
        button.disabled = true;
    });

    nextButton.style.display = "block";
    nextButton.style.pointerEvents = "auto";
    nextButton.style.opacity = 1;
};

//show score
function showScore() {
    resetState();

    questionElement.innerHTML = `Դուք ճիշտ եք պատասխանել՝ ${score} հարցի ${questions.length}-ից:`;

    nextButton.innerHTML = "Սկսել նորից";
    nextButton.style.pointerEvents = "auto";
    nextButton.style.opacity = 1;
};

//handle next button
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    };
};

//next button event 
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    };
});

startQuiz();