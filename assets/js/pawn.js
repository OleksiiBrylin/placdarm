var Pawn = function (config) {
    var me = this;

    var defaults = {
        isWhite: true,
        isGeneral: false,
        isSelected: false,
        isAttacked: false,
        cell: null,
        placdarm: null
    };

    this.options = Object.assign({}, defaults, config);
//    this.id = id;
    this.isWhite = this.options.isWhite;
    this.isGeneral = this.options.isGeneral;
    this.isSelected = this.options.isSelected;
    this.isAttacked = this.options.isAttacked;
    this.cell = this.options.cell;
    this.placdarm = this.options.placdarm;
    this.isFigura = false;

    this.getOptions = function () {
        return options;
    };

    this.updateDomState = function () {
        var element = this.getDomElement();
        element.classList.add("pawn");
        if (this.isGeneral) {
            element.classList.add("general");
        } else {
            element.classList.remove("general");
        }
        if (this.isSelected) {
            element.classList.add("selected");
        } else {
            element.classList.remove("selected");
        }
        if (this.isAttacked) {
            element.classList.add("attacked");
        } else {
            element.classList.remove("attacked");
        }
        if (this.isWhite) {
            element.classList.add("white");
            element.classList.remove("black");
        } else {
            element.classList.add("black");
            element.classList.remove("white");
        }
    };

    this.removeDomState = function () {
        this.getDomElement().classList.remove("pawn", "black", "white", "selected", "general", "attacked");
    };

    this.setSelected = function (isSelected) {
        this.isSelected = isSelected;
    };

    this.setAttacked = function (isAttacked) {
        this.isAttacked = isAttacked;
    };

    this.getDomElement = function () {
        return this.cell.getDomElement();
    };

    this.move = function (element) {
        console.log('move Pawn', me);
        // remove bind events into attack pawns 
        // remove bind events into move cells
        me.getPlacdarm().removeAllSelected();

        me.setSelected(true);
        // check where you can move and bind events and select cells
        // move
        me.movementEvaluation();
        // attack troyka
        me.attackEvaluation();

        me.getPlacdarm().updateDomState();
        me.getPlacdarm().bindEventMoveOnIt();
    };

    this.movementEvaluation = function () {
        this.moveByThird();    // ЧЕРЕЗ ТРИ КЛЕТКИ 
        this.moveByBandy();    // КЛЮШКОЙ 
        this.moveByOblique();  // ПО ДИАГОНАЛЯМ + КОСОЙ + УГЛОМ
        this.moveByStraight(); // ПО ГОРИЗОНТАЛЯМ + УГЛОМ
        this.moveBetwenCells(); // МЕЖДУ ПОЛЕЙ + углом
        if (this.isGeneral) {
            this.moveByGeneral(); // ХОД ГЕНЕРАЛОМ + БОЙ ГЕНЕРАЛОМ
        }
    };
    this.attackEvaluation = function () {
        if (this.isGeneral) {
            this.attackByGeneral();
        }
        if (this.isFigura) {
            this.attackByFigura();
        }
    };

    this.getPlacdarm = function () {
        if (this.placdarm === null) {
            this.placdarm = this.cell.placdarm;
        }
        return this.placdarm;
    };

    this.moveByThird = function () {
        this.moveByMatrix(this.thirdArray);
    };
    this.moveByBandy = function () {
        this.moveByMatrix(this.bandyArray);
    };
    this.moveByOblique = function () {
        this.moveStraightByMatrix(this.obliqueMatrix);
    };
    this.moveByStraight = function () {
        this.moveStraightByMatrix(this.straightMatrix);
    };
    this.moveBetwenCells = function () {
        this.moveStraightByMatrix(this.betweenMatrix);
    };
    this.moveByMatrix = function (matrix) {
        matrix.forEach(function (move, i) {
            var countSteps = move.length;
            for (var step = 0; step < countSteps; step++) {
                var x = me.cell.x + move[step].x;
                var y = me.cell.y + move[step].y;

                if (!me.getPlacdarm().isEmptyCell(x, y)) {
                    break;
                }

                var isLastStep = (countSteps === step + 1) || false;
                if (!isLastStep) {
                    continue;
                }

                me.getPlacdarm().setCellStatusByXY(x, y, true);
            }
        });
    };
    this.moveStraightByMatrix = function (matrix) {
        var status = true;
        var matrix2 = matrix['secondSteps'];
        matrix['firstSteps'].forEach(function (move, index) {
            var ix = me.cell.x + move.x;
            var iy = me.cell.y + move.y;
            while (me.getPlacdarm().setCellStatusByXY(ix, iy, status)) {
                var directionIndex1 = 2;
                var directionIndex2 = 3;
                if (index > 1) {
                    directionIndex1 = 0;
                    directionIndex2 = 1;
                }
                var zx = ix + matrix2[directionIndex1].x;
                var zy = iy + matrix2[directionIndex1].y;
                while (me.getPlacdarm().setCellStatusByXY(zx, zy, status))
                {
                    zx += matrix2[directionIndex1].x;
                    zy += matrix2[directionIndex1].y;
                }

                var zx = ix + matrix2[directionIndex2].x;
                var zy = iy + matrix2[directionIndex2].y;
                while (me.getPlacdarm().setCellStatusByXY(zx, zy, status))
                {
                    zx += matrix2[directionIndex2].x;
                    zy += matrix2[directionIndex2].y;
                }
                ix += move.x;
                iy += move.y;
            }
        });
    };
    this.moveByGeneral = function () {
        var matrix = this.generalArray.concat(this.aroundArray);
        matrix.forEach(function (move, i) {
            var x = me.cell.x + move.x;
            var y = me.cell.y + move.y;
            me.getPlacdarm().setCellStatusByXY(x, y, true);
        });
    };
    this.attackByGeneral = function () {
        var enemyCells = [];
        var maxCount = 2;
        var matrix = me.aroundArray;
        for(var step = 0; step < matrix.length; step++){
            var x = me.cell.x + matrix[step].x;
            var y = me.cell.y + matrix[step].y;
            var neighborCell = me.getPlacdarm().getCellByXY(x, y);
            if (me.isPawnsEnemy(neighborCell.pawn, me.cell.pawn)) {
                enemyCells.push(neighborCell);
            }
        }  
        var canBeAttackedCells = countEnemyAround(enemyCells, maxCount, matrix);

        var countEnemyAround = function (enemyCells, maxCount, matrix) {
            enemyCells.forEach(function (cell, index) {
                for(var step = 0; step < matrix.length; step++){
                    var x = cell.x + matrix[step].x;
                    var y = cell.y + matrix[step].y;
                    var neighborCell = me.getPlacdarm().getCellByXY(x, y);
                    if (me.getPlacdarm().isPawnsSimilar(cell, neighborCell)) {
                        /// todo enemyCells.push(neighborCell);
                        if (enemyCells.lenght > maxCount) {
                            return false;
                        }
                        return countEnemyAround(enemyCells, maxCount, matrix);
                    }
                }
            });
        };
    };
    this.attackByFigura = function () {

    };
    this.isPawnsEnemy = function (pawn1, pawn2) {
        if (pawn1 === null || pawn2 === null) {
            return false;
        }
        if (pawn1.isWhite === pawn2.isWhite) {
            return false;
        }
        return true;
    };    
    this.aroundArray = [
        {x: -1, y: -1},
        {x: 0, y: -1},
        {x: 1, y: 0},
        {x: 1, y: 1},
        {x: 0, y: 1},
        {x: -1, y: 0}
    ];
    this.generalArray = [
        {x: -2, y: -2},
        {x: 0, y: -2},
        {x: 2, y: 0},
        {x: 2, y: 2},
        {x: 0, y: 2},
        {x: -2, y: 0}
    ];
    this.straightMatrix = {
        firstSteps: [
            {x: -1, y: 0}, // top 
            {x: 1, y: 0}, // bottom 
            {x: -1, y: -2}, // right 
            {x: 1, y: 2} // left
        ],
        secondSteps: [
            {x: 1, y: 0}, // right 
            {x: -1, y: 0}, // left
            {x: -1, y: -2}, // top 
            {x: 1, y: 2}, // bottom 
        ]
    };
    this.obliqueMatrix = {
        firstSteps: [
            {x: -1, y: -1}, // top left
            {x: 1, y: 1}, // bottom right
            {x: 0, y: -1}, // top right 
            {x: 0, y: 1} // bottom left
        ],
        secondSteps: [
            {x: -2, y: -1}, // top left
            {x: 2, y: 1}, // bottom right
            {x: -1, y: 1}, // top right 
            {x: 1, y: -1} // bottom left
        ]
    };
    this.betweenMatrix = {
        firstSteps: [
            {x: -2, y: -1}, // top left
            {x: 2, y: 1}, // bottom right
            {x: 1, y: -1}, // top right 
            {x: -1, y: 1} // bottom left
        ],
        secondSteps: [
            {x: -1, y: -1}, // top left
            {x: 1, y: 1}, // bottom right
            {x: 0, y: -1}, // top right 
            {x: 0, y: 1} // bottom left
        ]
    };
    this.bandyArray = [
        [
            {x: -1, y: -1},
            {x: -2, y: -2},
            {x: -2, y: -3}
        ],
        [
            {x: -1, y: -1},
            {x: -1, y: -2},
            {x: -1, y: -3}
        ],
        [
            {x: 0, y: -1},
            {x: 0, y: -2},
            {x: -1, y: -3}
        ],
        [
            {x: 0, y: -1},
            {x: -1, y: -2},
            {x: -2, y: -3}
        ],
        [
            {x: 0, y: -1},
            {x: 0, y: -2},
            {x: 1, y: -2}
        ],
        [
            {x: 0, y: -1},
            {x: 1, y: -1},
            {x: 2, y: -1}
        ],
        [
            {x: 1, y: 0},
            {x: 2, y: 0},
            {x: 2, y: -1}
        ],
        [
            {x: 1, y: 0},
            {x: 1, y: -1},
            {x: 1, y: -2}
        ],
        [
            {x: 1, y: 0},
            {x: 2, y: 0},
            {x: 3, y: 1}
        ],
        [
            {x: 1, y: 0},
            {x: 2, y: 1},
            {x: 3, y: 2}
        ],
        [
            {x: 1, y: 1},
            {x: 2, y: 2},
            {x: 3, y: 2}
        ],
        [
            {x: 1, y: 1},
            {x: 2, y: 1},
            {x: 3, y: 1}
        ],
        [
            {x: 1, y: 1},
            {x: 2, y: 2},
            {x: 2, y: 3}
        ],
        [
            {x: 1, y: 1},
            {x: 1, y: 2},
            {x: 1, y: 3}
        ],
        [
            {x: 0, y: 1},
            {x: 0, y: 2},
            {x: 1, y: 3}
        ],
        [
            {x: 0, y: 1},
            {x: 1, y: 2},
            {x: 2, y: 3}
        ],
        [
            {x: 0, y: 1},
            {x: 0, y: 2},
            {x: -1, y: 2}
        ],
        [
            {x: 0, y: 1},
            {x: -1, y: 1},
            {x: -2, y: 1}
        ],
        [
            {x: -1, y: 0},
            {x: -2, y: 0},
            {x: -2, y: 1}
        ],
        [
            {x: -1, y: 0},
            {x: -1, y: 1},
            {x: -1, y: 2}
        ],
        [
            {x: -1, y: -1},
            {x: -2, y: -2},
            {x: -3, y: -2}
        ],
        [
            {x: -1, y: -1},
            {x: -2, y: -1},
            {x: -3, y: -1}
        ],
        [
            {x: -1, y: 0},
            {x: -2, y: 0},
            {x: -3, y: -1}
        ],
        [
            {x: -1, y: 0},
            {x: -2, y: -1},
            {x: -3, y: -2}
        ]
    ];
    this.thirdArray = [
        [
            {x: -1, y: -1},
            {x: -2, y: -2},
            {x: -2, y: -3},
            {x: -2, y: -4}
        ],
        [
            {x: 0, y: -1},
            {x: 0, y: -2},
            {x: -1, y: -3},
            {x: -2, y: -4}
        ],
        [
            {x: 0, y: -1},
            {x: 0, y: -2},
            {x: 1, y: -2},
            {x: 2, y: -2}
        ],
        [
            {x: 1, y: 0},
            {x: 2, y: 0},
            {x: 2, y: -1},
            {x: 2, y: -2}
        ],
        [
            {x: 1, y: 0},
            {x: 2, y: 0},
            {x: 3, y: 1},
            {x: 4, y: 2}
        ],
        [
            {x: 1, y: 1},
            {x: 2, y: 2},
            {x: 3, y: 2},
            {x: 4, y: 2}
        ],
        [
            {x: 1, y: 1},
            {x: 2, y: 2},
            {x: 2, y: 3},
            {x: 2, y: 4}
        ],
        [
            {x: 0, y: 1},
            {x: 0, y: 2},
            {x: 1, y: 3},
            {x: 2, y: 4}
        ],
        [
            {x: 0, y: 1},
            {x: 0, y: 2},
            {x: -1, y: 2},
            {x: -2, y: 2}
        ],
        [
            {x: -1, y: 0},
            {x: -2, y: 0},
            {x: -2, y: 1},
            {x: -2, y: 2}
        ],
        [
            {x: -1, y: -1},
            {x: -2, y: -2},
            {x: -3, y: -2},
            {x: -4, y: -2}
        ],
        [
            {x: -1, y: 0},
            {x: -2, y: 0},
            {x: -3, y: -1},
            {x: -4, y: -2}
        ]
    ];
}