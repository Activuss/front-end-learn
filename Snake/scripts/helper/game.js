(function snake(){

    var config = {
        boardHeight : 20,
        boardWidth : 20,
        snakeDefaultSize :3,
        spawnCoordinateX : 0,
        spawnCoordinateY : 0
    }

    function SnakePart(options) {
        this.options = options || {};
        this.x = options.x;
        this.y = options.y;
        this.direction = options.direction;
    }

    function Snake () {
        this.parts = [];
        this.length = 0;
        var appendSnakePart = function (x, y) {
            parts.push (new SnakePart(
                {
                    x: x,
                    y: y
                }
            ))
            this.length++;
        }
        var snakSpawnSize = config.snakeDefaultSize;
        var spawnX = config.spawnCoordinateX;
        var spawnY = config.spawnCoordinateY;
        while (snakSpawnSize-- > 0) {
            /*this.parts.push(new SnakePart(
                {   x : spawnX,
                    y : spawnY++
                    }))*/
            appendSnakePart(spawnX, spawnY++);
        }
        this.head = this.parts[0]

    }

    var snake = new Snake()
    console.log(snake)


}())
