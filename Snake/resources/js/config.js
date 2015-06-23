var game = game || {};
(function (game) {

    game.availableDirection = {
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
        DEFAULT_DIRECTION: game.availableDirection.DOWN,
        DEFAULT_DELAY: 100,
        CELL_SIZE: 20,
        BACKGROUND_COLOR: '#808080',
        SNAKE_COLOR: '#0f0',
        FOOD_COLOR: '#fff',
        START_CODE: 1,
        RESTART_CODE: 0
    };
})(game);

