/*
 * Created by illya.kolykhanin on 23.05.2015.
 */
(function SnakeJS() {

    var defaultConfig = {
        gridHeight : 20,
        gridWidth : 20,
        pointSize : 20
    };

    var paintContext = (function getPaintContext(){
        var canvas = document.getElementById("canvas");
        canvas.width = 480;
        canvas.height = 640;
        return canvas.getContext('2d');
    }());

    var generateFood = function (){
        //place food somewhere
    }

    var playArea = {


    }


    var SnakePart = function (x, y, isHead) {
        this.x = x;
        this.y = y;
        this.isHead = isHead;
        var draw = function (){
            rect("#000", x*defaultConfig.pointSize, y*defaultConfig.pointSize, defaultConfig.gridWidth, defaultConfig.gridHeight )
        }
    }



    var Snake = function (head){
        var length = 0;
        var head = head;
        var snakeParts = [head];
        function addPart(snakePart) {
            this.head = snakePart;
            snakeParts.push(snakePart);
            length++;
        }

    };

    function rect(color, x, y, width, height) {
        this.color = color; // цвет прямоугольника
        this.x = x; // координата х
        this.y = y; // координата у
        this.width = width; // ширина
        this.height = height; // высота
        this.draw = function() // Метод рисующий прямоугольник
        {
            paintContext.fillStyle = this.color;
            paintContext.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    function spawnNewSnake() {
        return new Snake(new SnakePart(4,5, true))
    }

    function init() {
        paintContext.fillRect(0,0,defaultConfig.gridWidth*defaultConfig.pointSize,
            defaultConfig.gridHeight*defaultConfig.pointSize);
        //paintContext.fillStyle='#ccc';
        //paintContext.fillRect(50,50,defaultConfig.pointSize, defaultConfig.pointSize);
    }

    function isFoodKilled() {
        return false;
    }

    function isSnakeBusted() {
        return false;
    }

    function play() {

    }

    init();
    //var rec = rect('#cad',100, 100, 50, 50);
    //rec.draw()
    //paintContext.fillRect(50,50,defaultConfig.pointSize,
    //    defaultConfig.pointSize);
}());

/*fillStyle = color   // определяет цвет заливки
 strokeStyle = color // цвет линий цвет задается точно так же как и css, на примере все четыре способа задания цвета*/

/*function rect(color, x, y, width, height) {
 this.color = color; // цвет прямоугольника
 this.x = x; // координата х
 this.y = y; // координата у
 this.width = width; // ширина
 this.height = height; // высота
 this.draw = function() // Метод рисующий прямоугольник
 {
 context.fillStyle = this.color;
 context.fillRect(this.x, this.y, this.width, this.height);
 }
 }*/
