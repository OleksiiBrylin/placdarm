var Placdarm = (function (root, doc) {
    
    var division = function (val, by) {
        return (val - val % by) / by;
    };
    var getMarginString = function (marginDelta) {
        return Math.abs(marginDelta * 25) + "px";
    };
    var isEven = function (someNumber) {
        return (someNumber % 2 === 0) ? true : false;
    };

    var Placdarm = function (config) {
        var me = this;
        var options = {
            width: 10,
            height: 9,
            box: null,
            selector: '#placdarm'
        };
        this.cells = [];

        this.getOptions = function () {
            return options;
        };

        this.isCellInTheField = function (x, y) {
            if (x < 0 || y < 0) {
                return false;
            }
            if (x >= options.width) {
                return false;
            }
            if (y >= options.height) {
                return false;
            }

            var centerHeight = division(options.height, 2);
            if (y < centerHeight) {
                if (x > y + centerHeight + 1) {
                    return false;
                }
            }
            if (y > centerHeight) {
                if (x < y - centerHeight) {
                    return false;
                }
            }
            return true;
        }

    }


    // нарисовать поле с помощью html
    // повесить события
    // создать обьект поле
    // отобразить новое поле относительно массива
    // вывести дополнительные элементы
    // обработать событие Click

    Placdarm.prototype.draw = function () {}

    Placdarm.prototype.setSize = function (width) {
        if(!isEven(width)){
            width++;
        }
        this.getOptions().width = (width >= 5 && width <= 20) ? width : 10;
        this.getOptions().height = this.getOptions().width - 1;
    }

    Placdarm.prototype.setBox = function (selector) {
        this.getOptions().selector = selector || this.getOptions().selector;
        this.getOptions().box = doc.querySelector(this.getOptions().selector);
        if (this.getOptions().box === null) {
            throw "Error. Box has not found!";
        }
    }

    Placdarm.prototype.createCells = function () {
        var marginDelta = division(this.getOptions().height, 2);
        for (var height = 0; height < this.getOptions().height; height++) {
            var first = true;
            for (var width = 0; width < this.getOptions().width; width++) {
                if (!this.isCellInTheField(width, height)) {
                    continue;
                }
                var config = {
                    x: width,
                    y: height
                };
                var cell = new Cell(config);
                var element = cell.getElement();
                if (first) {
                    element.style.marginLeft = getMarginString(marginDelta--);
                    first = false;
                }
                this.getOptions().box.appendChild(element);
                this.cells[cell.id] = cell;
            }
            element.classList.add("last");
        }
    }

    Placdarm.prototype.setPlayer1 = function () {}
    Placdarm.prototype.setPlayer2 = function () {}


    root.Placdarm = new Placdarm();
    return root.Placdarm;

})(window, document);