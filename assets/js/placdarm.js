var Placdarm = function (config) {
    var me = this;

    var division = function (val, by) {
        return (val - val % by) / by;
    };
    var getMarginString = function (marginDelta) {
        return Math.abs(marginDelta * 25) + "px";
    };
//    var isEven = function (someNumber) {
//        return (someNumber % 2 === 0) ? true : false;
//    };
    var whiteMirrorX = function (centerY, x, y) {
        var whiteX = centerY - y + x;
        return whiteX;
    };
    var whiteMirrorY = function (centerY, y) {
        var whiteY = centerY * 2 - y;
        return whiteY;
    }
    var getPawnsByColor = function (isWhite) {
        var pawns = [];
        for (var id in me.cells) {
            if (me.cells[id].pawn === null) {
                continue;
            }
            if (me.cells[id].pawn.isWhite !== isWhite) {
                continue;
            }
            pawns.push(me.cells[id].pawn);
        }
        return pawns;
    };
    var getCellsByState = function (state) {
        var cells = [];
        for (var id in me.cells) {
            if (me.cells[id].state !== state) {
                continue;
            }
            cells.push(me.cells[id]);
        }
        return cells;
    };
    this.getSelectedPawn = function () {
        for (var id in me.cells) {
            if (me.cells[id].pawn === null) {
                continue;
            }
            if (me.cells[id].pawn.isSelected === true) {
                return me.cells[id].pawn;
            }
        }
        return false;
    }
    this.bindEventMove = function (isWhite) {
        var pawns = getPawnsByColor(isWhite);
        pawns.forEach(function (pawn) {
            pawn.getDomElement().addEventListener("click", pawn.move);
        });
    };
    this.removeEventMove = function (isWhite) {
        var pawns = getPawnsByColor(isWhite);
        pawns.forEach(function (pawn) {
            pawn.getDomElement().removeEventListener("click", pawn.move);
        });
    };
    this.bindEventMoveOnIt = function (pawn) {
        var cells = getCellsByState(true);
        cells.forEach(function (cell) {
            cell.getDomElement().addEventListener("click", cell.moveOnIt);
        });
    };
    this.removeEventMoveOnIt = function () {
        var cells = getCellsByState(true);
        cells.forEach(function (cell) {
            cell.getDomElement().removeEventListener("click", cell.moveOnIt);
        });
    };

    this.setSelected = function (isSelected) {
        for (var id in me.cells) {
            me.cells[id].setSelected(isSelected);
        }
    };
    this.setAttacked = function (isAttacked) {
        for (var id in me.cells) {
            me.cells[id].setAttacked(isAttacked);
        }
    };
    this.updateDomState = function () {
        for (var id in me.cells) {
            me.cells[id].updateDomState();
        }
        if (this.isMoveWhite) {
            this.getOptions().box.classList.add("white");
            this.getOptions().box.classList.remove("black");
        } else {
            this.getOptions().box.classList.add("black");
            this.getOptions().box.classList.remove("white");
        }
    };

    var options = {
        width: 10,
        height: 9,
        box: null,
        selector: '#placdarm',
        isMoveWhite: true
    };

    this.cells = [];
    this.isMoveWhite = true;
    
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
            if (x <= y - centerHeight - 1) {
                return false;
            }
        }
        return true;
    };
    this.isEmptyCell = function (x, y) {
        if (!this.isCellInTheField(x, y)) {
            return false;
        }
        if (this.getCellByXY(x, y).pawn === null) {
            return true;
        }
        return false;
    };
    this.getCellByXY = function (x, y) {
        return this.cells['cell-' + x + y];
    };
    this.setCellStatusByXY = function (x, y, status) {
        if (!this.isEmptyCell(x, y)) {
            return false;
        }
        var cell = this.getCellByXY(x, y);
        if (cell) {
            cell.setStatus(status);
            return true;
        }
        return false;
    };

// нарисовать поле с помощью html
// повесить события
// создать обьект поле
// отобразить новое поле относительно массива
// вывести дополнительные элементы
// обработать событие Click

    this.draw = function (width, boxSelector) {
        this.setBox(boxSelector);
        this.setSize(width);
        this.createCells();
        this.setPawns();
//        this.setWhitePawn(4, 4);
        var isWhiteMove = true;
        this.bindEventMove(isWhiteMove);
        this.updateDomState();
    };

    this.setSize = function (width) {
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
            case 13:
                this.getOptions().width = width;
                this.getOptions().height = 11;
                break;
            default:
                this.getOptions().width = 10;
                this.getOptions().height = 9;
                break;
        }
    };

    this.setBox = function (selector) {
        this.getOptions().selector = selector || this.getOptions().selector;
        this.getOptions().box = document.querySelector(this.getOptions().selector);
        if (this.getOptions().box === null) {
            throw "Error. Box has not found!";
        }
    };

    this.createCells = function () {
        var marginDelta = division(this.getOptions().height, 2);
        for (var height = 0; height < this.getOptions().height; height++) {
            var firstInRow = true;
            for (var width = 0; width < this.getOptions().width; width++) {
                if (!this.isCellInTheField(width, height)) {
                    continue;
                }
                var cell = new Cell(width, height, {placdarm: me});
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
    this.setPawns = function () {
        // перебираем все поля по ключу 
        var maxHeigth = this.getOptions().height;
        var maxWidth = this.getOptions().width;
        var beforeCenterHeight = division(maxHeigth, 2);
        var countPawns = maxWidth - beforeCenterHeight;
        for (var height = 0; height < beforeCenterHeight; height++) {
            for (var width = 0; width < this.getOptions().width; width++) {
                if (!this.isCellInTheField(width, height)) {
                    continue;
                }
                // black 
                if (height === 0 || height === 1) {
                    this.setBlackAndWhitePawn(width, height, beforeCenterHeight);
                    continue;
                }

                if (width > height - 2 && width <= countPawns) {
                    this.setBlackAndWhitePawn(width, height, beforeCenterHeight);
                    continue;
                }
            }
        }
        this.setBlackAndWhiteGeneral(countPawns / 2, 1, beforeCenterHeight);
    };
    this.setBlackAndWhiteGeneral = function (width, height, center) {
        var whiteWidth = whiteMirrorX(center, width, height);
        var whiteHeight = whiteMirrorY(center, height);
        this.setWhitePawn(whiteWidth, whiteHeight, true);
        this.setBlackPawn(width, height, true);
    };
    this.setBlackAndWhitePawn = function (width, height, center) {
        var whiteWidth = whiteMirrorX(center, width, height);
        var whiteHeight = whiteMirrorY(center, height);
        this.setWhitePawn(whiteWidth, whiteHeight);
        this.setBlackPawn(width, height);
    };
    this.setWhitePawn = function (width, height, isGeneral) {
        var id = 'cell-' + width + height;
        var isGeneral = isGeneral || false;
        var pawn = new Pawn({
            isWhite: true,
            isGeneral: isGeneral
        });
        this.cells[id].setPawn(pawn);
    };
    this.setBlackPawn = function (width, height, isGeneral) {
        var id = 'cell-' + width + height;
        var isGeneral = isGeneral || false;
        var pawn = new Pawn({
            isWhite: false,
            isGeneral: isGeneral
        });
        this.cells[id].setPawn(pawn);
    };
    this.finishMove = function (isWhite) {
        this.removeAllSelected();
        this.removeEventMove(isWhite);        
        this.bindEventMove(!isWhite);        
        this.isMoveWhite = !isWhite;
        // drop other selected and status
        // finish move - remove all listeners
        // set new listeners on opositive pawns
    };

    this.removeAllSelected = function () {
        this.removeEventMoveOnIt();
        // clear selected pawns
        // clear selected cells 
        this.setSelected(false);
        // clear pawns which is attacked
        this.setAttacked(false);
    };

};