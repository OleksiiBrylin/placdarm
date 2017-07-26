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

    this.getDomElement = function () {        
        if(me.domElement === null){
            var element = document.createElement(me.options.htmlElement);
            element.className = me.options.class;
            element.id = me.id;
            element.innerHTML = me.options.html;
            me.domElement = element;            
        }
        return me.domElement;
    }
    
    this.setPawn = function(pawn){
        me.getDomElement().classList.remove("pawn", "white", "black");
        me.pawn = pawn || null;
        if(me.pawn){
            me.getDomElement().classList.add("pawn");            
            me.getDomElement().classList.add(me.pawn.getColor());
        }
        
    }

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