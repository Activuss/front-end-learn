(function snake(){

    var direction = {
        UP : "up",
        DOWN : "down",
        LEFT : "left",
        RIGHT : "right"
    };

    var config = {
        BOARD_HEIGHT : 20,
        BOARD_WIDTH : 20,
        SNAKE_DEFAULT_SIZE :3,
        SPAWN_COORDINATE_X : 1,
        SPAWN_COORDINATE_Y : 1,
        DEFAULT_DIRECTION : direction.DOWN,
        DEFAULT_DELAY : 200
    };

    function SnakePart(options) {
        //this.options = options || {};
        this.x = options.x;
        this.y = options.y;
        this.direction = options.direction;
    }

    function Snake () {
        this.parts = [];
        this.length = 0;
        var snakeBusted = false;
        var that = this;
        this.appendSnakePart = function (x, y, direction) {
            that.parts.push (new SnakePart(
                {
                    x: x,
                    y: y,
                    direction: direction
                }
            ));
            that.length++;
            that.head = this.parts[this.length - 1];
        };

        var snakeSpawnSize = config.SNAKE_DEFAULT_SIZE;
        var spawnX = config.SPAWN_COORDINATE_X;
        var spawnY = config.SPAWN_COORDINATE_Y;

        while (snakeSpawnSize-- > 0) {
            this.appendSnakePart(spawnX, spawnY++, config.DEFAULT_DIRECTION);
        }

        this.move = function(options) {
            options = options || {};
            var currentHeadX = that.head.x;
            var currentHeadY = that.head.y;

            var isBusted = function(x, y) {
                var result = false;
                for(var i = 0; i < that.length; i++) {
                    var snakePart = that.parts[i];
                    if (snakePart.x == x && snakePart.y == y) {
                        result = true;
                        snakeBusted = true;
                        break;
                    }
                }
                return result;
            };

            var shiftToDirection = function (x, y, direction){
                if (!isBusted(x, y)) {
                    that.parts.shift();
                    that.length--;
                    that.appendSnakePart(x, y, direction);
                } else {
                    throw new Error("Snake busted!");
                }

            };

            switch (options.direction) {
                case "up": {
                    if ((currentHeadY - 1) >= 0) {
                        shiftToDirection(currentHeadX, currentHeadY - 1, direction.UP);
                    } else {
                        shiftToDirection(currentHeadX, config.BOARD_HEIGHT - 1, direction.UP);
                    }
                    break;
                }
                case "down": {
                    if ((currentHeadY + 1) <= config.BOARD_HEIGHT - 1) {
                        shiftToDirection(currentHeadX, currentHeadY + 1, direction.DOWN);
                    } else {
                        shiftToDirection(currentHeadX, 0, direction.DOWN);
                    }
                    break;
                }
                case "left": {
                    if ((currentHeadX - 1) >= 0) {
                        shiftToDirection(currentHeadX - 1, currentHeadY, direction.LEFT);
                    } else {
                        shiftToDirection(config.BOARD_WIDTH - 1, currentHeadY, direction.LEFT);
                    }
                    break;
                }
                case "right": {
                    if ((currentHeadX + 1) <= config.BOARD_WIDTH - 1) {
                        shiftToDirection(currentHeadX + 1, currentHeadY, direction.RIGHT);
                    } else {
                        shiftToDirection(0, currentHeadY, direction.DOWN);
                    }
                    break;
                }
            }
        };

        this.isPartOfSnake = function (x, y) {
            var i = 0;
            for (i; i < that.length; i++) {
                var snakePart = that.parts[i];
                if ((snakePart.x == x) && (snakePart.y == y)) {
                    return true;
                }
            }
            return false;
        }
    }

    function Food (options) {
        options = options || {};
        this.x = options.x;
        this.y = options.y;
    }

    (function GameController() {
        var snake, food, currentDirection;

        var generateRandomFoodCoordinates = function() {
            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            }
            var x, y;
            do {
                x = getRandomInt(0, config.BOARD_HEIGHT);
                y = getRandomInt(0, config.BOARD_WIDTH);
            } while (snake.isPartOfSnake(x, y));

            return {x: x, y: y }
        };

        this.isSnakeAteFood = function() {
            var snakeHead = snake.head;
            return (snakeHead.x == food.x && snakeHead.y == food.y);
        };

        this.drawGame = function() {
            var i = 0;
            var j = 0;
            var grid = "";

            for(i; i < config.BOARD_HEIGHT; i++) {
                j = 0;
                for (j; j < config.BOARD_WIDTH; j++) {
                    if (snake.isPartOfSnake (j, i)) {
                        grid = grid + "0";
                    } else if ((food.x == j) && (food.y == i)) {
                        grid = grid + "X";
                    } else {
                        grid = grid + " ";
                    }
                }
                grid = grid + "\n";
            }
            console.log(grid);
        };

        window.addEventListener('keydown', function(event) {
            switch (event.keyCode) {
                case 37: // Left
                    if (currentDirection != direction.RIGHT)
                        currentDirection = direction.LEFT;
                    break;

                case 38: // Up
                    if (currentDirection != direction.DOWN)
                        currentDirection = direction.UP;
                    break;

                case 39: // Right
                    if (currentDirection != direction.LEFT)
                        currentDirection = direction.RIGHT;
                    break;

                case 40: // Down
                    if (currentDirection != direction.UP)
                        currentDirection = direction.DOWN;
                    break;
            }
        }, false);

        var play = function(gameController) {

            var intervalId = setInterval(function() {

             try {
                 snake.move({direction: currentDirection});
             } catch (err) {
                 alert("You lose.");
                 clearInterval(intervalId);
                 startNewGame(gameController);
             }

             if (gameController.isSnakeAteFood()) {
                 snake.appendSnakePart(food.x, food.y, currentDirection);
                 food = new Food(generateRandomFoodCoordinates());
             }
             gameController.drawGame();
         }, config.DEFAULT_DELAY);


         };

        var startNewGame = function (gameController){
            snake = new Snake();
            currentDirection = config.DEFAULT_DIRECTION;
            food = new Food(generateRandomFoodCoordinates());
            play(gameController);
        };


        startNewGame(this);
    }());
}());
