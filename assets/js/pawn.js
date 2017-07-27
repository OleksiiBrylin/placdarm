var Pawn = function (config) {
    var me = this;
    
    var defaults = {
        isWhite: true,
        isGeneral: false,
        isSelected: false,
        isAttacked: false
        
    };
    
    this.options = Object.assign({}, defaults, config);
//    this.id = id;
    this.isWhite = this.options.isWhite;
    this.isGeneral = this.options.isGeneral;
    this.isSelected = this.options.isSelected;
    this.isAttacked = this.options.isAttacked;
    
    this.getOptions = function () {
        return options;
    };
    
    this.updateDomState = function(element){        
        element.classList.add("pawn");
        if(this.isGeneral){
            element.classList.add("general");
        }else{
            element.classList.remove("general");
        }
        if(this.isSelected){
            element.classList.add("selected");
        }else{
            element.classList.remove("selected");
        }
        if(this.isAttacked){
            element.classList.add("attacked");
        }else{
            element.classList.remove("attacked");
        }
        if(this.isWhite){
            element.classList.add("white");
            element.classList.remove("black");
        }else{
            element.classList.add("black");
            element.classList.remove("white");
        }
    };
    
    this.removeDomState = function(element){
        element.classList.remove("pawn", "black", "white", "selected", "general", "attacked");
    };
    
    this.setSelected = function (isSelected){
        this.isSelected = isSelected;
    };
    
    this.setAttacked = function(isAttacked){
        this.isAttacked = isAttacked;
    };
}