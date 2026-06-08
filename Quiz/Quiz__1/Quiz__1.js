class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.questionElement = document.getElementById("question");
        this.answerButtons = document.getElementById("answer-buttons");
        this.nextButton = document.getElementById("next-btn");

        this.currentQuestionIndex = 0;
        this.score = 0;

        this.addEvents();
        this.startQuiz();
    };

    addEvents() {
        this.nextButton.addEventListener("click", () => {
            if (this.currentQuestionIndex < this.questions.length) {
                this.handleNextButton();
            } else {
                this.startQuiz();
            };
        });
    };

    startQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.nextButton.innerHTML = "Հաջորդը";

        this.showQuestion();
    };

    showQuestion() {
        this.resetState();

        const currentQuestion = this.questions[this.currentQuestionIndex];
        const questionNo = this.currentQuestionIndex + 1;

        this.questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

        currentQuestion.answers.forEach((answer) => {
            const button = document.createElement("button");

            button.innerHTML = answer.text;
            button.classList.add("btn");

            if (answer.correct) {
                button.dataset.correct = true;
            };

            button.addEventListener("click", (e) => {
                this.selectAnswer(e);
            });

            this.answerButtons.appendChild(button);
        });
    }

    resetState() {
        this.nextButton.style.display = "block";
        this.nextButton.style.pointerEvents = "none";
        this.nextButton.style.opacity = "0.8";

        while (this.answerButtons.firstChild) {
            this.answerButtons.removeChild(
                this.answerButtons.firstChild
            );
        };
    };

    selectAnswer(e) {
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === "true";

        if (isCorrect) {
            selectedBtn.classList.add("correct");

            this.score++;
        } else {
            selectedBtn.classList.add("incorrect");
        };

        Array.from(this.answerButtons.children).forEach((button) => {
            if (button.dataset.correct === "true") {
                button.classList.add("correct");
            };

            button.disabled = true;
        });

        this.nextButton.style.pointerEvents = "auto";
        this.nextButton.style.opacity = "1";
    };

    showScore() {
        this.resetState();

        this.questionElement.innerHTML = `
            Դուք ճիշտ եք պատասխանել՝
            ${this.score}
            հարցի
            ${this.questions.length}-ից
        `;

        this.nextButton.innerHTML = "Սկսել նորից";
        this.nextButton.style.pointerEvents = "auto";
        this.nextButton.style.opacity = "1";
    };

    handleNextButton() {
        this.currentQuestionIndex++;

        if (this.currentQuestionIndex < this.questions.length) {
            this.showQuestion();
        } else {
            this.showScore();
        };
    };
};

document.addEventListener("DOMContentLoaded", () => new Quiz(questions));