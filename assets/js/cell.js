var Cell = function (x, y, config) {
    var me = this;

    var defaults = {
        class: 'cell',
        html: '&nbsp;',
        htmlElement: 'div',
        state: false,
        placdarm: null
    };

    this.options = Object.assign({}, defaults, config);
    this.x = x;
    this.y = y;
    this.id = 'cell-' + this.x + this.y;
    this.pawn = null;
    this.domElement = null;
    this.placdarm = this.options.placdarm;
    this.state = this.options.state;


    this.getOptions = function () {
        return options;
    };

    this.updateDomState = function () {
        var element = this.getDomElement();
        if (this.pawn !== null) {
            this.pawn.updateDomState();
        } else {
            var pawn = new Pawn({cell: me});
            pawn.removeDomState();
        }
        if (this.state) {
            element.classList.add("highlighted");
        } else {
            element.classList.remove("highlighted");
        }
    };
    this.setSelected = function (isSelected) {
        if (me.pawn) {
            me.pawn.setSelected(isSelected);
        }
        this.setStatus(isSelected);
    };
    this.setAttacked = function (isAttacked) {
        if (me.pawn) {
            me.pawn.setAttacked(isAttacked);
        }
    };
    this.setStatus = function (isStatus) {
        this.state = isStatus;
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
            pawn.cell = me;
        }

    };
    this.movementEvaluation = function () {
        if (me.pawn) {
            me.pawn.movementEvaluation();
        }
    };
};
