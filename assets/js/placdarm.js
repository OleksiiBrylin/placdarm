var Placdarm = (function (root, doc) {

    var division = function (val, by) {
        return (val - val % by) / by;
    };
    var getMarginString = function (marginDelta) {
        return Math.abs(marginDelta * 25) + "px";
    };
//    var isEven = function (someNumber) {
//        return (someNumber % 2 === 0) ? true : false;
//    };

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
                if (x >= options.width - centerHeight + y) {
                    return false;
                }
            }
            if (y > centerHeight) {
                if (x >= options.width + centerHeight - y) {
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
        switch (width) {
            case 5:
                this.getOptions().width = width;
                this.getOptions().height = 7;
                break;
            case 6:
            case 8:
            case 10:
                this.getOptions().width = width;
                this.getOptions().height = 9;
                break;
            case 12:
                this.getOptions().width = width;
                this.getOptions().height = 11;
                break;
            default:
                this.getOptions().width = 10;
                this.getOptions().height = 9;
                break;
        }
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
            var firstInRow = true;
            for (var width = 0; width < this.getOptions().width; width++) {
                if (!this.isCellInTheField(width, height)) {
                    continue;
                }
                var cell = new Cell(width, height, {});
                var element = cell.getDomElement();
                if (firstInRow) {
                    element.style.marginLeft = getMarginString(marginDelta--);
                    firstInRow = false;
                }
                this.getOptions().box.appendChild(element);
                this.cells[cell.id] = cell;
            }
            element.classList.add("last");
        }
    };

    Placdarm.prototype.setPawns = function () {
        // перебираем все поля по ключу 
        var maxHeigth = this.getOptions().height;
        var maxWidth = this.getOptions().width;
        var centerHeight = division(maxHeigth, 2);
        var countPawns = maxWidth - centerHeight;
        if (countPawns === 1) {
            countPawns = 2;
        }
        for (var height = 0; height < this.getOptions().height; height++) {
            if (height === centerHeight) {
                continue;
            }
            for (var width = 0; width < this.getOptions().width; width++) {
                if (!this.isCellInTheField(width, height)) {
                    continue;
                }
                // black 
                if (height === 0 || height === 1) {
                    this.setBlackPawn(width, height);
                    continue;
                }

                //white
                if (height === maxHeigth - 1 || height === maxHeigth - 2) {
                    this.setWhitePawn(width, height);
                    continue;
                }

                if (height < centerHeight) {
                    if (width > height - 2 && width <= countPawns) {
                        this.setBlackPawn(width, height);
                        continue;
                    }
                } else {
                    if (width > height - 3 && width <= countPawns) {
                        this.setWhitePawn(width, height);
                        continue;
                    }
                }


//                if (width > height - 2 && width <= countPawns) {
//                    if (height < centerHeight) {
//
//                    } else {
//
//                    }
//                    continue;
//                }
            }
            //countPawns--;
        }

//        for (var id in this.cells) {
//            // первая линия вся 
//            // вторая линия вся и сохраняем длину 
//            // третья на одну меньше длины с обоих сторон
//            // если не центр то на еще одну меньше 
//            // если центр то конец
//
//            // то же самое с конца поля и до центра 
//            if (this.cells[id].y === 0 || this.cells[id].y === 1) {
//                var pawn = new Pawn({
//                    isWhite: true
//                });
//                this.cells[id].setPawn(pawn);
//            }
//            if (this.cells[id].y === this.getOptions().height - 1 || this.cells[id].y === this.getOptions().height - 2) {
//                var pawn = new Pawn({
//                    isWhite: false
//                });
//                this.cells[id].setPawn(pawn);
//            }
//        }

//        var N = Array
//                (
//                        Array('b', 'b', 'b', 'b', 'b', 'b'),
//                        Array('b', 'b', 'b', 'z', 'b', 'b', 'b'),
//                        Array('.', 'b', 'b', 'b', 'b', 'b', 'b', '.'),
//                        Array('.', '.', 'b', 'b', 'b', 'b', 'b', '.', '.'),
//                        Array('.', '.', '.', '.', '.', '.', '.', '.', '.', '.'),
//                        Array('.', '.', 'w', 'w', 'w', 'w', 'w', '.', '.'),
//                        Array('.', 'w', 'w', 'w', 'w', 'w', 'w', '.'),
//                        Array('w', 'w', 'w', 'q', 'w', 'w', 'w'),
//                        Array('w', 'w', 'w', 'w', 'w', 'w')
//                        );
//        return N;
    };

    Placdarm.prototype.setWhitePawn = function (width, height) {
        var id = 'cell-' + width + height;
        var pawn = new Pawn({
            isWhite: true
        });
        this.cells[id].setPawn(pawn);
    };

    Placdarm.prototype.setBlackPawn = function (width, height) {
        var id = 'cell-' + width + height;
        var pawn = new Pawn({
            isWhite: false
        });
        this.cells[id].setPawn(pawn);
    };

    Placdarm.prototype.setPlayer1 = function () {}
    Placdarm.prototype.setPlayer2 = function () {}


    root.Placdarm = new Placdarm();
    return root.Placdarm;

})(window, document);