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
        }

    }

    var snake = new Snake();
    //console.log(snake)
    //snake.move({direction: "right"})
    //snake.move({direction: "left"})
    //snake.move({direction: "up"})
    console.log(snake);

}());
