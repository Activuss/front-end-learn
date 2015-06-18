var game = game || {};
(function (game) {
    function Drawer() {
        Drawer.prototype.drawBackground = function (width, height) {
            paper.setup('myCanvas');
            var rectangle = new Rectangle(new Point(0, 0), new Point(width, height));
             var path = new Path.Rectangle(rectangle);
             path.fillColor = '#808080';
            /*var path = new Path.Rectangle([0, 0], [10, 10]);
            path.strokeColor = 'black';*/
            //alert('other module used, coordinates ' + width + ' ' + height);
        }
    }

    game.drawer = new Drawer()
})(game);
