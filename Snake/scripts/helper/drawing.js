var game = game || {};
(function (game) {
    function Drawer() {
        var figures = [];
        var isCanvasSetuped = false;

        Drawer.prototype.buildBackground = function (width, height) {
            if (!isCanvasSetuped) {
                paper.setup('myCanvas');
                isCanvasSetuped = true;
            }
            var background = new paper.Shape.Rectangle(new paper.Point(0, 0), new paper.Point(width, height));
            background.fillColor = game.config.BACKGROUND_COLOR;
            figures.push(background);
        };

        Drawer.prototype.buildGameElement = function (x, y, elementType) {
            var cellSize = game.config.CELL_SIZE;
            var point = new paper.Point(x * cellSize, y * cellSize);
            var size = new paper.Size(cellSize, cellSize);
            var gameElement = new paper.Shape.Rectangle(point, size);
            if (elementType == "snakePart") {
                gameElement.fillColor = game.config.SNAKE_COLOR;
            } else if (elementType == "food"){
                gameElement.fillColor = game.config.FOOD_COLOR;
            }
            figures.push(gameElement);
        };

        Drawer.prototype.draw = function () {
            var group = new paper.Group(figures);
            group.view.draw();
            figures = [];
        };
    }

    game.drawer = new Drawer()
})(game);
