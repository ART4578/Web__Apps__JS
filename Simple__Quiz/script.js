//questions data
const questions = [
    {
        question: "Which is larget animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false }
        ]
    },
    {
        question: "Which is smallest country in the world?",
        answers: [
            { text: "Vatican City", correct: true },
            { text: "Bhutan", correct: false },
            { text: "Nepal", correct: false },
            { text: "Shri Lanka", correct: false }
        ]
    },
    {
        question: "Which is larget desert in the world?",
        answers: [
            { text: "Kalahari", correct: false },
            { text: "Gobi", correct: false },
            { text: "Sahara", correct: false },
            { text: "Antarctica", correct: true }
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false },
            { text: "Australia", correct: true },
            { text: "Arctic", correct: false },
            { text: "Africa", correct: false }
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

    nextButton.innerHTML = "Next";

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

    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;

    nextButton.innerHTML = "Play Again";
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