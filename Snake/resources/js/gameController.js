var game = game || {};
(function (game) {

    function Food(options) {
        options = options || {};
        this.x = options.x;
        this.y = options.y;
    }

    function GameController() {
        GameController.prototype.generateRandomFoodCoordinates = function () {
            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            }

            var x, y;
            do {
                x = getRandomInt(0, game.config.BOARD_HEIGHT);
                y = getRandomInt(0, game.config.BOARD_WIDTH);
            } while (game.snake.isPartOfSnake(x, y));

            return {x: x, y: y}
        };

        GameController.prototype.isSnakeAteFood = function () {
            var snakeHead = game.snake.head;
            return (snakeHead.x == GameController.prototype.food.x && snakeHead.y == GameController.prototype.food.y);
        };

        GameController.prototype.drawGame = function () {
            var currentSnake = game.snake;
            var snakeParts = currentSnake.parts;

            game.drawer.buildBackground(game.config.BOARD_HEIGHT_IN_PIXEL, game.config.BOARD_WIDTH_IN_PIXEL);

            var i = 0;
            for (i; i < currentSnake.length; i++) {
                game.drawer.buildGameElement(snakeParts[i].x, snakeParts[i].y, "snakePart");
            }
            game.drawer.buildGameElement(GameController.prototype.food.x, GameController.prototype.food.y, "food");
            game.drawer.draw();
        };

        GameController.prototype.play = function () {

            var intervalId = setInterval(function () {
                if (!game.snake.performSuccessfulMovement({direction: GameController.prototype.currentDirection})) {
                    alert("You lose.");
                    clearInterval(intervalId);
                    game.controller.performStartGameUserInteraction(game.config.RESTART_CODE);
                } else if (game.controller.isSnakeAteFood()) {
                    game.snake.appendSnakePart(GameController.prototype.food.x,
                        GameController.prototype.food.y, GameController.prototype.currentDirection);
                    GameController.prototype.food = new Food(game.controller.generateRandomFoodCoordinates());
                }
                game.controller.drawGame();
	        	game.controller.movePerformed = false;
            }, game.config.DEFAULT_DELAY);
        };

        GameController.prototype.startNewGame = function () {
            game.snake.spawnSnake();
            GameController.prototype.currentDirection = game.config.DEFAULT_DIRECTION;
            GameController.prototype.food = new Food(game.controller.generateRandomFoodCoordinates());
            game.controller.play();
        };

        GameController.prototype.performStartGameUserInteraction = function (state) {
            game.controlButton = game.controlButton || document.getElementById("button");
            game.controlButton.addEventListener("click", function start() {
                game.controlButton.style.display = 'none';
                game.controller.startNewGame();
                game.controlButton.removeEventListener("click", start);
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

    window.addEventListener('keydown', function (event) {
    	if (!game.controller.movePerformed){
    		switch (event.keyCode) {
    		    case 37: // Left
    		        if (GameController.prototype.currentDirection != game.availableDirection.RIGHT)
    		            GameController.prototype.currentDirection = game.availableDirection.LEFT;
    		        break;
    
    		    case 38: // Up
    		        if (GameController.prototype.currentDirection != game.availableDirection.DOWN)
    		            GameController.prototype.currentDirection = game.availableDirection.UP;
    		        break;
    
    		    case 39: // Right
    		        if (GameController.prototype.currentDirection != game.availableDirection.LEFT)
    		            GameController.prototype.currentDirection = game.availableDirection.RIGHT;
    		        break;
    
    		    case 40: // Down
    		        if (GameController.prototype.currentDirection != game.availableDirection.UP)
    		            GameController.prototype.currentDirection = game.availableDirection.DOWN;
    		        break;
    		}
    		game.controller.movePerformed = true;
    	}
    }, false);

    window.onload = function () {
        game.controller.performStartGameUserInteraction(game.config.START_CODE);
    };
})(game);
