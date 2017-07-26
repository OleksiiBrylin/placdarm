var Pawn = function (config) {
    var me = this;
    
    var defaults = {
        isWhite: true
        
    };
    
    this.options = Object.assign({}, defaults, config);
//    this.id = id;
    this.isWhite = this.options.isWhite;
    
    this.getOptions = function () {
        return options;
    };
    
    this.getColor = function () {
        if(this.isWhite){
            return 'white';
        }else{
            return 'black';
        }
    };
}