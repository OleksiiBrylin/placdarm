//;(function (root) {

var Cell = function (x, y, config) {
    var me = this;

    var defaults = {
        class: 'cell',
        html: '&nbsp;',
        htmlElement: 'div',
        state: 0
    };

    this.options = Object.assign({}, defaults, config);
    this.x = x;
    this.y = y;
    this.id = 'cell-' + this.x + this.y;    
    this.pawn = null;
    this.domElement = null;


    this.getOptions = function () {
        return options;
    };
    
    this.updateDomState = function(){
        if(this.pawn !== null){
            this.pawn.updateDomState(me.getDomElement());
        }else{
            var pawn = new Pawn();
            pawn.removeDomState(me.getDomElement());
        }
    };
    this.setSelected = function(isSelected){
        if (me.pawn) {
            me.pawn.setSelected(isSelected);
        }        
    };
    this.setAttacked = function(isAttacked){
        if (me.pawn) {
            me.pawn.setAttacked(isAttacked);
        }
    };

    this.getDomElement = function () {
        if (me.domElement === null) {
            var element = document.createElement(me.options.htmlElement);
            element.className = me.options.class;
            element.dataset.id = me.id;
//            element.innerHTML = 'x' + me.x + ':y' + me.y;
            element.innerHTML = me.options.html;
            me.domElement = element;
        }
        return me.domElement;
    }

    this.setPawn = function (pawn) {
        me.pawn = pawn || null;
        if (me.pawn) {
            me.updateDomState();
        }

    };
    this.movementEvaluation = function (){
        moveByThird();
//        Thrid(M, y, x); // ЧЕРЕЗ ТРИ КЛЕТКИ + КЛЮШКОЙ 
//        Four(M, y, x); // ПО ДИАГОНАЛЯМ + КОСОЙ + УГЛОМ
//        Fifth(M, y, x); // ПО ГОРИЗОНТАЛЯМ + УГЛОМ
//        General(M, y, x); // ХОД ГЕНЕРАЛОМ + БОЙ ГЕНЕРАЛОМ
    };
    var moveByThird = function(){
        console.log('moveByThird');
    };

    //console.log(this.options);

}

//    Cell.prototype.constructor = Cell;

//    Cell.prototype.setBox = function () {
//        this.getOptions().box = doc.querySelector(this.getOptions().selector);
//        console.log(this.getOptions().box);
//        if (this.getOptions().box === null) {
//            throw "Error. Box has not found!";
//        }
//    }


//    root.Cell = new Cell();
//    return root.Cell;

//})(window);