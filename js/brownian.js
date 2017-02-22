var brownian = (function(brownian, $, undefined) {
    var iterations;
    var intervalDurationInMs;
    var divName;
    var counter;
    var width;
    var height;
    var two;
    var timer;
    var lastPosition;

    function Move(x, y) {
        this.x = x;
        this.y = y;
    }

    var getRandomNumberBetween = function(j, k) {
        return Math.floor(Math.random() * (k - j + 1));
    };

    var getRandomElementFromArray = function(arr) {
        if (!Array.isArray(arr)) {
            throw "arr parameter must be of type array";
        }

        var index = getRandomNumberBetween(0, arr.length - 1);
        return arr[index];
    };

    var getNextPoint = function(x, y) {
        var move = getRandomElementFromArray([new Move(0, 1), new Move(0, -1), new Move(-1, 0), new Move(1, 0)]);
        return { x: lastPosition.x + move.x, y: lastPosition.y + move.y };
    };

    var addRandomPoint = function(pointSize) {
        var rect = two.makeRectangle(lastPosition.x, lastPosition.y, pointSize, pointSize);
        rect.fill = 'rgb(0, 0, 0)';
        rect.noStroke();
        lastPosition = getNextPoint(lastPosition.x, lastPosition.y);
        two.update();
    };

    var getCenter = function() {
        return { x: width / 2, y: height / 2 };
    };

    var updateDrawing = function(timer, pointSize) {
        if (counter > iterations) {
            clearInterval(timer);
        }

        addRandomPoint(pointSize);


        counter++;
    };

    var clear = function(divName) {
        $("#" + divName).empty();

        if (timer) {
            clearInterval(timer);
        }
    };

    brownian.init = function(iterations, intervalDurationInMs, pointSize, divName) {
        divName = divName;
        var elem = $("#" + divName);
        clear(divName);
        pointSize = pointSize || 1;
        iterations = iterations;
        intervalDurationInMs = intervalDurationInMs;
        counter = 0;

        width = elem.width();
        height = elem.height();
        lastPosition = getCenter();

        var params = { width: width, height: height };
        var elem = document.getElementById(divName);
        two = new Two(params).appendTo(elem);
        two.update();
        timer = setInterval(function() { updateDrawing(timer, pointSize); }, intervalDurationInMs);
    };



    return brownian;
})(window.brownian || {}, jQuery);