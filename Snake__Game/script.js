class SnakeGame {
    constructor(boardId) {
        this.state = {
            //board
            blockSize: 25, //board block size -> length of one block side
            rows: 20, //board rows -> number of rows (20 pieces)
            cols: 20, //board cols -> number of columns (20 pieces)
            snakeX: 25 * 5, //snake head x coordinate
            snakeY: 25 * 5, //snake head y coordinate
            velocityX: 0, //X is the horizontal component of the snake's linear velocity
            velocityY: 0, //Y is the vertical component of the snake's linear velocity
            snakeBody: [], //snake body
            foodX: 0, //food x coordinate
            foodY: 0, //food y coordinate
            gameOver: false, //indicates whether the game is over or not
            score: 0 //player score counter
        };

        this.board = document.getElementById(boardId);
        //This creates a 500px × 500px play area.
        this.board.height = this.state.rows * this.state.blockSize; //20 * 25px = 500px
        this.board.width = this.state.cols * this.state.blockSize;  //20 * 25px = 500px
        this.context = this.board.getContext("2d");

        //bind events
        document.addEventListener("keyup", this.changeDirection.bind(this));
        document.addEventListener("keyup", this.restartOnSpace.bind(this));

        this.placeFood();
        //Every 1000/10 = 100 ms, 10 times/second (10 FPS), calls the update() function.
        this.interval = setInterval(this.update.bind(this), 1000 / 10);
    };

    update() {
        //If the game is over, we immediately exit the function and do not continue.
        if (this.state.gameOver) return;

        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.board.width, this.board.height);

        //First we draw the food → so that it is always visible.
        this.context.fillStyle = "red";
        this.context.fillRect(this.state.foodX, this.state.foodY, this.state.blockSize, this.state.blockSize);

        /*If the snake's position exactly matches the food's position, it means the snake has eaten the
        red square (food) and at that moment placeFood() is called, which places the new food in a random location.*/
        if (this.state.snakeX === this.state.foodX && this.state.snakeY === this.state.foodY) {
            //If the snake ate the food, we add a new piece to the body.
            this.state.snakeBody.push([this.state.foodX, this.state.foodY]);

            //When the snake eats the food, the points are added.
            this.state.score += 1;

            this.placeFood();
        };

        /*for: to move body parts. This means: the last part moves to the place of its
        predecessor, the predecessor moves to the place of the part above it,
        and so on up to the first part.*/
        for (let i = this.state.snakeBody.length - 1; i > 0; i--) {
            this.state.snakeBody[i] = this.state.snakeBody[i - 1];
        };

        /*The first body part becomes the old head. snakeX, snakeY → was the previous 
        head position of the snake. Now those coordinates become the first part of the 
        snake's body. Because the snake's body always comes after the head. At this point: 
        HEAD = new position, BODY[0] = old head, BODY[1] = old position of BODY[0], 
        BODY[2]= old position of BODY[1]*/
        if (this.state.snakeBody.length) {
            this.state.snakeBody[0] = [this.state.snakeX, this.state.snakeY];
        };

        /*We change the position of the snake according to its speed.
        We multiply by blockSize so that the snake moves a whole cell, not 1px. If this 
        were not the case, the snake would not coincide with the food, the wall, or its own 
        body, and the game would not work.*/
        this.state.snakeX += this.state.velocityX * this.state.blockSize;
        this.state.snakeY += this.state.velocityY * this.state.blockSize;

        //Then we move and draw the snake → so that the snake is in every visible layer.
        this.context.fillStyle = "lime";
        this.context.fillRect(this.state.snakeX, this.state.snakeY, this.state.blockSize, this.state.blockSize);

        /*We draw the body of the snake. This for simply goes through all the parts of the body
        and draws them in a square. Here: snakeBody[i][0] → X, snakeBody[i][1] → Y */
        for (let i = 0; i < this.state.snakeBody.length; i++) {
            this.context.fillRect(this.state.snakeBody[i][0], this.state.snakeBody[i][1], this.state.blockSize, this.state.blockSize);
        };

        //draw score
        this.context.fillStyle = "white"; //We define the writing/drawing color.
        this.context.font = "20px Arial"; //We define the text size and font.
        //Using the fillText function, we write text on the canvas, 10 → the X coordinate of the text on the canvas, 20 → the Y coordinate of the text on the canvas, the text will appear in the upper left corner of the canvas at the position (10px, 20px).
        this.context.fillText("Score: " + this.state.score, 10, 20);

        /*The game field has a width of (cols * blockSize) and a height of (rows * blockSize).
        The snake's position, snakeX and snakeY, must not exceed these limits.
        snakeX < 0` The snake has gone beyond the left boundary.
        snakeX > cols * blockSize` The snake has gone beyond the right boundary.
        snakeY < 0` The snake has gone beyond the top boundary.
        snakeY > rows * blockSize` The snake has gone beyond the bottom boundary.
        If either of these is true, the game ends.*/
        if (
            this.state.snakeX < 0 ||
            this.state.snakeX > this.state.cols * this.state.blockSize ||
            this.state.snakeY < 0 ||
            this.state.snakeY > this.state.rows * this.state.blockSize
        ) {
            this.endGame();
        };  

        /*snakeBody = snake body blocks
        The loop goes through all the blocks in turn.
        snakeX, snakeY → snake head position
        snakeBody[i][0] → X of the i-th body block
        snakeBody[i][1] → Y of the i-th body block
        The snake's head has the same coordinate as the i-th body block.
        If yes → The snake is leaning on itself, i.e. it has collided with its own body.
        That is, the game ends.*/
        for (let i = 0; i < this.state.snakeBody.length; i++) {
            if (this.state.snakeX === this.state.snakeBody[i][0] && this.state.snakeY === this.state.snakeBody[i][1]) {
                this.endGame();
            };
        };
    };

    /*This code prevents the snake from turning on itself (in the opposite direction). 
    If the snake were to turn on itself, it would immediately collide with its own 
    body and the game would end.*/
    changeDirection(e) {
        /*The user pressed the up arrow. This checks to see if the snake is not currently moving downwards. 
        If the snake is moving downwards (velocityY = 1), then it will not be allowed to move upwards, because
        that is the opposite direction. If velocityY != 1, this means that the snake is not moving downwards
        yet ⟶ it can move upwards.*/
        //The same logic applies when the user presses a key: down arrow or left arrow or right arrow.
        switch (e.code) {
            case "ArrowUp":
                if (this.state.velocityY !== 1) {
                    this.state.velocityX = 0;
                    this.state.velocityY = -1;
                };
                break;
            case "ArrowDown":
                if (this.state.velocityY !== -1) {
                    this.state.velocityX = 0;
                    this.state.velocityY = 1;
                };
                break;
            case "ArrowLeft":
                if (this.state.velocityX !== 1) {
                    this.state.velocityX = -1;
                    this.state.velocityY = 0;
                };
                break;
            case "ArrowRight":
                if (this.state.velocityX !== -1) {
                    this.state.velocityX = 1;
                    this.state.velocityY = 0;
                };
                break;
        };
    };

    //Choose a random column and place the food in the correct place on that column.
    //The same, but for a row.
    //This way, the food will always fit into the snake's web of movement.
    placeFood() {
        //Returns a random integer from 0 to 19 for a column.
        this.state.foodX = Math.floor(Math.random() * this.state.cols) * this.state.blockSize;
        //Returns a random integer from 0 to 19 for a row.
        this.state.foodY = Math.floor(Math.random() * this.state.rows) * this.state.blockSize;
    };

    /*Snake is the end function of the game, which is called in 2 cases:
    1. When the snake hits a wall.
    2. When the snake collides with its own body.*/
    endGame() {
        this.state.gameOver = true;
        const playAgain = confirm(`Game Over! Your score: ${this.state.score}. Play again?`);
        if (playAgain) {
            this.reset();
        };
    };

    //After the game ends, the game is completely restored to its original state without refreshing the browser.
    reset() {
        this.state.snakeX = this.state.blockSize * 5;
        this.state.snakeY = this.state.blockSize * 5;
        this.state.velocityX = 0;
        this.state.velocityY = 0;
        this.state.snakeBody = [];
        this.state.gameOver = false;
        this.state.score = 0;
        this.placeFood();
    };

    //By pressing the space key, you can quickly restart the game with one click, without refreshing the page.
    restartOnSpace(e) {
        if (e.code === "Space" && this.state.gameOver) {
            this.reset();
        };
    };
};

window.onload = () => {
    new SnakeGame("board");
};