var game = game || {};
(function (game) {
    var direction = {
        UP: "up",
        DOWN: "down",
        LEFT: "left",
        RIGHT: "right"
    };

    game.config = {
        BOARD_HEIGHT: 20,
        BOARD_WIDTH: 20,
        BOARD_HEIGHT_IN_PIXEL: 400,
        BOARD_WIDTH_IN_PIXEL: 400,
        SNAKE_DEFAULT_SIZE: 3,
        SPAWN_COORDINATE_X: 1,
        SPAWN_COORDINATE_Y: 1,
        DEFAULT_DIRECTION: direction.DOWN,
        DEFAULT_DELAY: 100,
        CELL_SIZE: 20,
        BACKGROUND_COLOR: '#808080',
        SNAKE_COLOR: '#0f0',
        FOOD_COLOR: '#fff',
        START_CODE: 1,
        RESTART_CODE: 0
    };

    function SnakePart(options) {
        this.x = options.x;
        this.y = options.y;
        this.direction = options.direction;
    }

    function Snake() {
        this.parts = [];
        this.length = 0;
        var snakeBusted = false;
        var that = this;
        this.appendSnakePart = function (x, y, direction) {
            that.parts.push(new SnakePart(
                {
                    x: x,
                    y: y,
                    direction: direction
                }
            ));
            that.length++;
            that.head = this.parts[this.length - 1];
        };

        var snakeSpawnSize = game.config.SNAKE_DEFAULT_SIZE;
        var spawnX = game.config.SPAWN_COORDINATE_X;
        var spawnY = game.config.SPAWN_COORDINATE_Y;

        while (snakeSpawnSize-- > 0) {
            this.appendSnakePart(spawnX, spawnY++, game.config.DEFAULT_DIRECTION);
        }

        this.move = function (options) {
            options = options || {};
            var currentHeadX = that.head.x;
            var currentHeadY = that.head.y;

            var isBusted = function (x, y) {
                var result = false;
                for (var i = 0; i < that.length; i++) {
                    var snakePart = that.parts[i];
                    if (snakePart.x == x && snakePart.y == y) {
                        result = true;
                        snakeBusted = true;
                        break;
                    }
                }
                return result;
            };

            var shiftToDirection = function (x, y, direction) {
                if (!isBusted(x, y)) {
                    that.parts.shift();
                    that.length--;
                    that.appendSnakePart(x, y, direction);
                } else {
                    throw new Error("Snake busted!");
                }

            };

            switch (options.direction) {
                case "up":
                {
                    if ((currentHeadY - 1) >= 0) {
                        shiftToDirection(currentHeadX, currentHeadY - 1, direction.UP);
                    } else {
                        shiftToDirection(currentHeadX, game.config.BOARD_HEIGHT - 1, direction.UP);
                    }
                    break;
                }
                case "down":
                {
                    if ((currentHeadY + 1) <= game.config.BOARD_HEIGHT - 1) {
                        shiftToDirection(currentHeadX, currentHeadY + 1, direction.DOWN);
                    } else {
                        shiftToDirection(currentHeadX, 0, direction.DOWN);
                    }
                    break;
                }
                case "left":
                {
                    if ((currentHeadX - 1) >= 0) {
                        shiftToDirection(currentHeadX - 1, currentHeadY, direction.LEFT);
                    } else {
                        shiftToDirection(game.config.BOARD_WIDTH - 1, currentHeadY, direction.LEFT);
                    }
                    break;
                }
                case "right":
                {
                    if ((currentHeadX + 1) <= game.config.BOARD_WIDTH - 1) {
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

    function Food(options) {
        options = options || {};
        this.x = options.x;
        this.y = options.y;
    }

    function GameController() {
        var currentDirection;

        GameController.prototype.generateRandomFoodCoordinates = function () {
            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            }

            var x, y;
            do {
                x = getRandomInt(0, game.config.BOARD_HEIGHT);
                y = getRandomInt(0, game.config.BOARD_WIDTH);
            } while (GameController.prototype.snake.isPartOfSnake(x, y));

            return {x: x, y: y}
        };

        GameController.prototype.isSnakeAteFood = function () {
            var snakeHead = GameController.prototype.snake.head;
            return (snakeHead.x == GameController.prototype.food.x && snakeHead.y == GameController.prototype.food.y);
        };

        GameController.prototype.drawGame = function () {
            var currentSnake = game.controller.snake;
            var snakeParts = currentSnake.parts;

            game.drawer.buildBackground(game.config.BOARD_HEIGHT_IN_PIXEL, game.config.BOARD_WIDTH_IN_PIXEL);

            var i = 0;
            for (i; i < currentSnake.length; i++) {
                game.drawer.buildGameElement(snakeParts[i].x, snakeParts[i].y, "snakePart");
            }
            game.drawer.buildGameElement(GameController.prototype.food.x, GameController.prototype.food.y, "food");

            game.drawer.draw();
        };

        window.addEventListener('keydown', function (event) {
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

        GameController.prototype.play = function () {

            var intervalId = setInterval(function () {

                try {
                    GameController.prototype.snake.move({direction: currentDirection});
                } catch (err) {
                    alert("You lose.");
                    clearInterval(intervalId);
                    game.controller.startNewGame()
                    //game.controller.userInteraction(game.config.RESTART_CODE);
                }

                if (game.controller.isSnakeAteFood()) {
                    GameController.prototype.snake.appendSnakePart(GameController.prototype.food.x,
                        GameController.prototype.food.y, currentDirection);
                    GameController.prototype.food = new Food(game.controller.generateRandomFoodCoordinates());
                }
                game.controller.drawGame();

            }, game.config.DEFAULT_DELAY);
        };

        GameController.prototype.startNewGame = function () {
            GameController.prototype.snake = new Snake();
            currentDirection = game.config.DEFAULT_DIRECTION;
            GameController.prototype.food = new Food(game.controller.generateRandomFoodCoordinates());
            game.controller.play();
        };

        GameController.prototype.userInteraction = function (state) {
            game.controlButton = document.getElementById("button");
            game.controlButton.addEventListener("click", function start() {
                game.controlButton.style.display = 'none';
                game.controller.startNewGame();
            });

            switch (state) {
                case game.config.START_CODE :
                    game.controlButton.innerHTML = 'start';
                    game.controlButton.style.display = 'block';
                    break;
                case game.config.RESTART_CODE :
                    game.controlButton.innerHTML = 'restart';
                    game.controlButton.style.display = 'block';
                    break;
            }
        };
    }

    game.controller = new GameController();
    window.onload = function () {
        game.controller.userInteraction(game.config.START_CODE);
    };
})(game);
