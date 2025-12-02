class SnakeGame {
    constructor(boardId) {
        //board
        this.blockSize = 25; //length of one block side
        this.rows = 20; //number of rows (20 pieces)
        this.cols = 20; //number of columns (20 pieces)

        this.board = document.getElementById(boardId);
        //This creates a 500px × 500px play area.
        this.board.height = this.rows * this.blockSize; //20 * 25px = 500px
        this.board.width = this.cols * this.blockSize;  //20 * 25px = 500px
        this.context = this.board.getContext("2d");

        //snake
        this.snakeX = this.blockSize * 5;
        this.snakeY = this.blockSize * 5;
        this.velocityX = 0;
        this.velocityY = 0;
        this.snakeBody = [];

        //food
        this.foodX = 0;
        this.foodY = 0;

        this.gameOver = false;

        document.addEventListener("keyup", this.changeDirection.bind(this));

        this.placeFood();
        //Every 1000/10 = 100 ms, 10 times/second (10 FPS), calls the update() function.
        setInterval(this.update.bind(this), 1000 / 10);
    };

    update() {
        //If the game is over, we immediately exit the function and do not continue.
        if (this.gameOver) return;

        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.board.width, this.board.height);

        //First we draw the food → so that it is always visible.
        this.context.fillStyle = "red";
        this.context.fillRect(this.foodX, this.foodY, this.blockSize, this.blockSize);

        /*If the snake's position exactly matches the food's position, it means the snake has eaten the
        red square (food) and at that moment placeFood() is called, which places the new food in a random location.*/
        if (this.snakeX === this.foodX && this.snakeY === this.foodY) {
            //If the snake ate the food, we add a new piece to the body.
            this.snakeBody.push([this.foodX, this.foodY]);

            this.placeFood();
        };

        /*for: to move body parts. This means: the last part moves to the place of its
        predecessor, the predecessor moves to the place of the part above it,
        and so on up to the first part.*/
        for (let i = this.snakeBody.length - 1; i > 0; i--) {
            this.snakeBody[i] = this.snakeBody[i - 1];
        };

        /*The first body part becomes the old head. snakeX, snakeY → was the previous 
        head position of the snake. Now those coordinates become the first part of the 
        snake's body. Because the snake's body always comes after the head. At this point: 
        HEAD = new position, BODY[0] = old head, BODY[1] = old position of BODY[0], 
        BODY[2]= old position of BODY[1]*/
        if (this.snakeBody.length) {
            this.snakeBody[0] = [this.snakeX, this.snakeY];
        };

        /*We change the position of the snake according to its speed.
        We multiply by blockSize so that the snake moves a whole cell, not 1px. If this 
        were not the case, the snake would not coincide with the food, the wall, or its own 
        body, and the game would not work.*/
        this.snakeX += this.velocityX * this.blockSize;
        this.snakeY += this.velocityY * this.blockSize;

        //Then we move and draw the snake → so that the snake is in every visible layer.
        this.context.fillStyle = "lime";
        this.context.fillRect(this.snakeX, this.snakeY, this.blockSize, this.blockSize);

        /*We draw the body of the snake. This for simply goes through all the parts of the body
        and draws them in a square. Here: snakeBody[i][0] → X, snakeBody[i][1] → Y */
        for (let i = 0; i < this.snakeBody.length; i++) {
            this.context.fillRect(this.snakeBody[i][0], this.snakeBody[i][1], this.blockSize, this.blockSize);
        };

        /*The game field has a width of (cols * blockSize) and a height of (rows * blockSize).
        The snake's position, snakeX and snakeY, must not exceed these limits.
        snakeX < 0` The snake has gone beyond the left boundary.
        snakeX > cols * blockSize` The snake has gone beyond the right boundary.
        snakeY < 0` The snake has gone beyond the top boundary.
        snakeY > rows * blockSize` The snake has gone beyond the bottom boundary.
        If either of these is true, the game ends.*/
        if (
            this.snakeX < 0 ||
            this.snakeX > this.cols * this.blockSize ||
            this.snakeY < 0 ||
            this.snakeY > this.rows * this.blockSize
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
        for (let i = 0; i < this.snakeBody.length; i++) {
            if (this.snakeX === this.snakeBody[i][0] && this.snakeY === this.snakeBody[i][1]) {
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
                if (this.velocityY !== 1) {
                    this.velocityX = 0;
                    this.velocityY = -1;
                };
                break;
            case "ArrowDown":
                if (this.velocityY !== -1) {
                    this.velocityX = 0;
                    this.velocityY = 1;
                };
                break;
            case "ArrowLeft":
                if (this.velocityX !== 1) {
                    this.velocityX = -1;
                    this.velocityY = 0;
                };
                break;
            case "ArrowRight":
                if (this.velocityX !== -1) {
                    this.velocityX = 1;
                    this.velocityY = 0;
                };
                break;
        };
    };

    //Choose a random column and place the food in the correct place on that column.
    //The same, but for a row.
    //This way, the food will always fit into the snake's web of movement.
    placeFood() {
        //Returns a random integer from 0 to 19 for a column.
        this.foodX = Math.floor(Math.random() * this.cols) * this.blockSize;
        //Returns a random integer from 0 to 19 for a row.
        this.foodY = Math.floor(Math.random() * this.rows) * this.blockSize;
    };

    /*Snake is the end function of the game, which is called in 2 cases:
    1. When the snake hits a wall.
    2. When the snake collides with its own body.*/
    endGame() {
        this.gameOver = true;
        alert("Game Over");
    };
};

window.onload = () => {
    new SnakeGame("board");
};