class RockPaperScissors {
    constructor() {
        this.data = {
            you: null,
            yourScore: 0,
            opponent: null,
            opponentScore: 0,
            choices: ["rock", "paper", "scissors"] 
        };

        window.onload = () => this.init();
    };

    init() {
        const container = document.getElementById("choices");

        this.data.choices.forEach((choiceName) => {
            const img = document.createElement("img");
            /*Gives the given image an ID: when i = 0 → id = rock, 
            when i = 1 → id = paper, when i = 2 → id = scissors*/
            img.id = choiceName;
            /*This prints the images in the following HTML element: 
            <div id="choices"></div> i.e. adds 3 images: rock.png, paper.png, scissors.png*/
            img.src = `img/${choiceName}.png`;

            img.addEventListener("click", () => this.selectChoice(choiceName));
            container.appendChild(img);
        });
    };

    selectChoice(choiceName) {
        /*this — points to the HTML element that you just clicked on. this.id — gets the
        id of that image. If you click on rock → id = rock, If on paper → id = paper,
        If on scissors → id = scissors*/
        this.data.you = choiceName;
        //This line changes the large screen image to match the image you selected.
        document.getElementById("your-choice").src = `img/${choiceName}.png`;

        //This line gives the opponent a random choice (rock/paper/scissors).
        const randomIndex = Math.floor(Math.random() * 3);
        this.data.opponent = this.data.choices[randomIndex];
        //This line simply changes the picture displayed on the screen to the picture chosen by the opponent.
        document.getElementById("opponent-choice").src = `img/${this.data.opponent}.png`;

        this.checkWinner();

        //This text becomes your score.
        document.getElementById("your-score").innerText = this.data.yourScore;
        //This text becomes your opponent's score.
        document.getElementById("opponent-score").innerText = this.data.opponentScore;
    };

    //check for winner
    checkWinner() {
        const you = this.data.you; //Gets your choice and stores it in the variable you.
        const opponent = this.data.opponent; //Gets the opponent's choice and stores it in the variable opponent.

        //Checks whether the two choices are the same, if so, no points are awarded to either.
        if (you === opponent) return;

        /*We create an object (winRules) that defines the rule which wins against what. For example, rock:
        scissors means rock wins against scissors, and so on for the rest.*/
        const winRules = {
            rock: "scissors",
            scissors: "paper",
            paper: "rock"
        };

        /*From the winRules object, we take what you win (for example, winRules["rock"] === "scissors"), and compare
        it to the opponent. If this value is the same, it means you won this round: this.data.yourScore++; We
        increment your score by one. If not, we assume that the opponent won: this.data.opponentScore++; We
        increment the opponent's score by one.*/
        winRules[you] === opponent ? this.data.yourScore++ : this.data.opponentScore++;
    };
};

const game = new RockPaperScissors();