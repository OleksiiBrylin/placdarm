//;(function (root) {

var Cell = function (config) {
    var me = this;
    
    var defaults = {
        x: null,
        y: null,
        id: 'cell-' + config.x + config.y,
        class: 'cell',
        html: '&nbsp;',
        htmlElement: 'div',
        state: 0,
        pawnId: null
    };
    
    this.options = Object.assign({}, defaults, config);
    
    this.getOptions = function () {
        return options;
    };

    this.getElement = function () {
        var element = document.createElement(me.options.htmlElement);
        element.className = me.options.class;
        element.id = me.options.id;
        element.innerHTML = me.options.html;
        me.element = element;
        return element;
    }

    console.log(this.options);

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