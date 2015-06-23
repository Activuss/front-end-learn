var game = game || {};
(function (game) {

    function SnakePart(options) {
        this.x = options.x;
        this.y = options.y;
        this.direction = options.direction;
    }

    function Snake() {
        Snake.prototype.parts = [];
        Snake.prototype.length = 0;
        var isSnakeAlive = true;

        Snake.prototype.appendSnakePart = function (x, y, direction) {
            Snake.prototype.parts.push(new SnakePart(
                {
                    x: x,
                    y: y,
                    direction: direction
                }
            ));
            Snake.prototype.length++;
            Snake.prototype.head = Snake.prototype.parts[Snake.prototype.length - 1];
        };

        Snake.prototype.spawnSnake = function () {
            Snake.prototype.parts = [];
            Snake.prototype.length = 0;
            isSnakeAlive = true;
            var snakeSpawnSize = game.config.SNAKE_DEFAULT_SIZE;
            var spawnX = game.config.SPAWN_COORDINATE_X;
            var spawnY = game.config.SPAWN_COORDINATE_Y;

            while (snakeSpawnSize-- > 0) {
                Snake.prototype.appendSnakePart(spawnX, spawnY++, game.config.DEFAULT_DIRECTION);
            }
        };

        Snake.prototype.performSuccessfulMovement = function (options) {
            options = options || {};
            var currentHeadX = Snake.prototype.head.x;
            var currentHeadY = Snake.prototype.head.y;

            var isBusted = function (x, y) {
                var isBusted = false;
                for (var i = 0; i < Snake.prototype.length; i++) {
                    var snakePart = Snake.prototype.parts[i];
                    if (snakePart.x == x && snakePart.y == y) {
                        isBusted = true;
                        isSnakeAlive = false;
                        break;
                    }
                }
                return isBusted;
            };

            var shiftToDirection = function (x, y, direction) {
                if (!isBusted(x, y)) {
                    Snake.prototype.parts.shift();
                    Snake.prototype.length--;
                    Snake.prototype.appendSnakePart(x, y, direction);
                }
            };

            switch (options.direction) {
                case "up":
                {
                    if ((currentHeadY - 1) >= 0) {
                        shiftToDirection(currentHeadX, currentHeadY - 1, game.availableDirection.UP);
                    } else {
                        shiftToDirection(currentHeadX, game.config.BOARD_HEIGHT - 1, game.availableDirection.UP);
                    }
                    break;
                }
                case "down":
                {
                    if ((currentHeadY + 1) <= game.config.BOARD_HEIGHT - 1) {
                        shiftToDirection(currentHeadX, currentHeadY + 1, game.availableDirection.DOWN);
                    } else {
                        shiftToDirection(currentHeadX, 0, game.availableDirection.DOWN);
                    }
                    break;
                }
                case "left":
                {
                    if ((currentHeadX - 1) >= 0) {
                        shiftToDirection(currentHeadX - 1, currentHeadY, game.availableDirection.LEFT);
                    } else {
                        shiftToDirection(game.config.BOARD_WIDTH - 1, currentHeadY, game.availableDirection.LEFT);
                    }
                    break;
                }
                case "right":
                {
                    if ((currentHeadX + 1) <= game.config.BOARD_WIDTH - 1) {
                        shiftToDirection(currentHeadX + 1, currentHeadY, game.availableDirection.RIGHT);
                    } else {
                        shiftToDirection(0, currentHeadY, game.availableDirection.DOWN);
                    }
                    break;
                }
            }

            return isSnakeAlive;
        };

        Snake.prototype.isPartOfSnake = function (x, y) {
            var i = 0;
            for (i; i < Snake.prototype.length; i++) {
                var snakePart = Snake.prototype.parts[i];
                if ((snakePart.x == x) && (snakePart.y == y)) {
                    return true;
                }
            }
            return false;
        }
    }

    game.snake = new Snake();
})(game);



