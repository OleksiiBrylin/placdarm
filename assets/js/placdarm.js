var Placdarm = (function (root, doc) {

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
            
            if (y == 0)
                if (x > 5)
                    return false;
            if (y == 1)
                if (x > 6)
                    return false;
            if (y == 2)
                if (x > 7)
                    return false;
            if (y == 3)
                if (x > 8)
                    return false;
            if (y == 5)
                if (x < 1)
                    return false;
            if (y == 6)
                if (x < 2)
                    return false;
            if (y == 7)
                if (x < 3)
                    return false;
            if (y == 8)
                if (x < 4)
                    return false;
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
        this.getOptions().width = (width >= 5 && width <= 10) ? width : 10;
        this.getOptions().heigt = this.getOptions().width - 1;
    }

    Placdarm.prototype.setBox = function () {
        this.getOptions().box = doc.querySelector(this.getOptions().selector);
        console.log(this.getOptions().box);
        if (this.getOptions().box === null) {
            throw "Error. Box has not found!";
        }
    }

    Placdarm.prototype.createCells = function () {
        for (var height = 0; height < this.getOptions().height; height++) {
            for (var width = 0; width < this.getOptions().width; width++) {
                console.log(this.isCellInTheField(width, height), 'continue');
                if (!this.isCellInTheField(width, height)) {

                    continue;
                }
                var config = {
                    x: width,
                    y: height
                };
                var cell = new Cell(config);
                this.getOptions().box.appendChild(cell.getElement());
                this.cells.push(cell);
            }
        }
    }

    Placdarm.prototype.setPlayer1 = function () {}
    Placdarm.prototype.setPlayer2 = function () {}


    root.Placdarm = new Placdarm();
    return root.Placdarm;

})(window, document);