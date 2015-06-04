(function snake(){

    var config = {
        BOARD_HEIGHT : 20,
        BOARD_WIDTH : 20,
        SNAKE_DEFAULT_SIZE :3,
        SPAWN_COORDINATE_X : 1,
        SPAWN_COORDINATE_Y : 1
    };

    var direction = {
        UP : "up",
        DOWN : "down",
        LEFT : "left",
        RIGHT : "right"
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
            this.appendSnakePart(spawnX, spawnY++, direction.DOWN);
        }

        this.move = function(options) {
            options = options || {};
            var currentHeadX = that.head.x;
            var currentHeadY = that.head.y;

            var shiftToDirection = function (x, y, direction){
                that.parts.shift();
                that.length--;
                that.appendSnakePart(x, y, direction);
            };

            switch (options.direction) {
                case "up": {
                    shiftToDirection(currentHeadX, currentHeadY - 1, direction.UP);
                    break;
                }
                case "down": {
                    shiftToDirection(currentHeadX, currentHeadY - 1, direction.DOWN);
                    break;
                }
                case "left": {
                    shiftToDirection(currentHeadX - 1, currentHeadY, direction.LEFT);
                    break;
                }
                case "right": {
                    shiftToDirection(currentHeadX + 1, currentHeadY, direction.RIGHT);
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
        var snake = new Snake();

        this.generateRandomFoodCoordinates = function() {
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

        var food = new Food(this.generateRandomFoodCoordinates());

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



        //console.log(snake);
        //console.log(food.x + ", " + food.y);
        var grid = this.drawGame();

    }());
}());
