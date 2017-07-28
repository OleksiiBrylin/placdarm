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

    this.movementEvaluation = function () {
//        this.moveByThird();    // ЧЕРЕЗ ТРИ КЛЕТКИ 
//        this.moveByBandy();    // КЛЮШКОЙ 
        this.moveByOblique();  // ПО ДИАГОНАЛЯМ + КОСОЙ + УГЛОМ
//        this.moveByStraight(); // ПО ГОРИЗОНТАЛЯМ + УГЛОМ
//        if(this.isGeneral){
//            this.moveByGeneral(); // ХОД ГЕНЕРАЛОМ + БОЙ ГЕНЕРАЛОМ
//        }         
//        Thrid(M, y, x); // ЧЕРЕЗ ТРИ КЛЕТКИ + КЛЮШКОЙ 
//        Four(M, y, x); // ПО ДИАГОНАЛЯМ + КОСОЙ + УГЛОМ
//        Fifth(M, y, x); // ПО ГОРИЗОНТАЛЯМ + УГЛОМ
//        General(M, y, x); // ХОД ГЕНЕРАЛОМ + БОЙ ГЕНЕРАЛОМ
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
    this.moveByMatrix = function (matrix) {
        matrix.forEach(function (move, i) {
            var countSteps = move.length;
            for (var step = 0; step < countSteps; step++) {
                var x = me.cell.x + move[step].x;
                var y = me.cell.y + move[step].y;

                if (!me.getPlacdarm().isEmptyCell(x, y)) {
                    break;
                }
//                
//                var cellForMove = me.getPlacdarm().getCellByXY(x, y);
//                if (cellForMove) {
//                    cellForMove.getDomElement().innerHTML += i + ';';
//                }

                var isLastStep = (countSteps === step + 1) || false;
                if (!isLastStep) {
                    continue;
                }

                me.getPlacdarm().setCellStatusByXY(x, y, true);
            }
        });
    };
    this.moveByOblique = function () {
        var matrix = [
            {
                x: -1, y: -1, 
                left: {x: 1, y: -1}, 
                right: {x: -1, y:1}
            }
        ];
        matrix.forEach(function (move, i) {
            var ix = move.x - 1, iy = move.y - 1; // в левый верхний
            while (me.getPlacdarm().setCellStatusByXY(ix, iy, true)){
                
            }
        });
        while (PustoePole(M, iy, ix))
        {
            Add(M, iy, ix, 'x');
            var zx = ix + 1, zy = iy - 1; // ход углом  в верх-право
            while (PustoePole(M, zy, zx))
            {
                Add(M, zy, zx, 'x');
                zy--;
                zx++;
            }
            zx = ix - 1;
            zy = iy + 1; // ход углом  в низ-лево
            while (PustoePole(M, zy, zx))
            {
                Add(M, zy, zx, 'x');
                zy++;
                zx--;
            }
            ix--;
            iy--;
        }
        ix = x - 2; // в левый верхний по косой
        iy = y - 1;
        while (PustoePole(M, iy, ix))
        {
            Add(M, iy, ix, 'x');
            zx = ix, zy = iy - 1; // ход углом  в верх-право по косой
            while (PustoePole(M, zy, zx))
            {
                Add(M, zy, zx, 'x');
                zy--;
            }
            zx = ix;
            zy = iy + 1; // ход углом  в низ-лево по косой
            while (PustoePole(M, zy, zx))
            {
                Add(M, zy, zx, 'x');
                zy++;
            }
            ix -= 2;
            iy--;
        }
        ix = x + 1; // в правый нижний
        iy = y + 1;
        while (PustoePole(M, iy, ix))
        {
            Add(M, iy, ix, 'x');
            zx = ix + 1, zy = iy - 1; // ход углом  в верх-право
            while (PustoePole(M, zy, zx))
            {
                Add(M, zy, zx, 'x');
                zy--;
                zx++;
            }
            zx = ix - 1;
            zy = iy + 1; // ход углом  в низ-лево
            while (PustoePole(M, zy, zx))
            {
                Add(M, zy, zx, 'x');
                zy++;
                zx--;
            }
            ix++;
            iy++;
        }
        ix = x - 1; // в левый нижний по косой
        iy = y + 1;
        while (PustoePole(M, iy, ix))
        {
            Add(M, iy, ix, 'x');
            zx = ix - 1, zy = iy - 1; // ход углом  в верх-лево по косой
            while (PustoePole(M, zy, zx))
            {
                Add(M, zy, zx, 'x');
                zy--;
                zx--;
            }
            zx = ix + 1;
            zy = iy + 1; // ход углом  в низ-лево по косой
            while (PustoePole(M, zy, zx))
            {
                Add(M, zy, zx, 'x');
                zy++;
                zx++;
            }
            ix--;
            iy++;
        }
        ix = x; // в левый верхний
        iy = y - 1;
        while (PustoePole(M, iy, ix))
        {
            Add(M, iy, ix, 'x');
            zx = ix - 2, zy = iy - 1; // ход углом  в верх-лево по косой
            while (PustoePole(M, zy, zx))
            {
                Add(M, zy, zx, 'x');
                zy--;
                zx -= 2;
            }
            zx = ix + 2;
            zy = iy + 1; // ход углом  в низ-лево по косой
            while (PustoePole(M, zy, zx))
            {
                Add(M, zy, zx, 'x');
                zy++;
                zx += 2;
            }

            iy--;
        }
        ix = x + 1; // в правый верхний по косой
        iy = y - 1;
        while (PustoePole(M, iy, ix))
        {
            Add(M, iy, ix, 'x');
            zx = ix - 1, zy = iy - 1; // ход углом  в верх-право
            while (PustoePole(M, zy, zx))
            {
                Add(M, zy, zx, 'x');
                zy--;
                zx--;
            }
            zx = ix + 1;
            zy = iy + 1; // ход углом  в низ-лево
            while (PustoePole(M, zy, zx))
            {
                Add(M, zy, zx, 'x');
                zy++;
                zx++;
            }
            ix++;
            iy--;
        }
        ix = x; // в правый верхний
        iy = y + 1;
        while (PustoePole(M, iy, ix))
        {
            Add(M, iy, ix, 'x');
            zx = ix - 2, zy = iy - 1; // ход углом  в верх-лево по косой
            while (PustoePole(M, zy, zx))
            {
                Add(M, zy, zx, 'x');
                zy--;
                zx -= 2;
            }
            zx = ix + 2;
            zy = iy + 1; // ход углом  в низ-лево по косой
            while (PustoePole(M, zy, zx))
            {
                Add(M, zy, zx, 'x');
                zy++;
                zx += 2;
            }
            iy++;
        }
        ix = x + 2; // в правый нижний по косой
        iy = y + 1;
        while (PustoePole(M, iy, ix))
        {
            Add(M, iy, ix, 'x');
            zx = ix, zy = iy - 1; // ход углом  в верх-право
            while (PustoePole(M, zy, zx))
            {
                Add(M, zy, zx, 'x');
                zy--;
            }
            zx = ix;
            zy = iy + 1; // ход углом  в низ-лево
            while (PustoePole(M, zy, zx))
            {
                Add(M, zy, zx, 'x');
                zy++;
            }
            ix += 2;
            iy++;
        }
    }
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