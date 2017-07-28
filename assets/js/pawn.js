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
        this.moveByThird();    // ЧЕРЕЗ ТРИ КЛЕТКИ 
//        this.moveByBandy();    // КЛЮШКОЙ 
//        this.moveByOblique();  // ПО ДИАГОНАЛЯМ + КОСОЙ + УГЛОМ
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
        this.thirdArray.forEach(function (hod, index) {
            var hodLength = hod.length;
            for (var position = 0; position < hodLength; position++) {
                if (!me.getPlacdarm().isEmptyCell(me.cell.x + hod[position].x, me.cell.y + hod[position].y)) {
                    break;
                }
                if (hodLength - 1 === position) {
                    var cellForMove = me.getPlacdarm().getCellByXY(me.cell.x + hod[position].x, me.cell.y + hod[position].y);
                    if (cellForMove) {
                        cellForMove.setStatus(true);
                    }
                }
            }
        });
    };
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