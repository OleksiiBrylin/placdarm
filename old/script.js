$(document).ready(function() {

    console.log();
    var pole = '';
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 10; j++) {
            //pole += '<div class="cell" id="unit-' + i + j + '">' + i + j + '</div>';
            pole += '<div class="cell" id="unit-' + i + j + '">&nbsp;</div>';
        }
    }
    $('#placdarm').append(pole);
    var M = NewPole();
    Show(M);

    $(".cell").click(function() {
        var str = $(this).attr('id');
        var x = str[6];
        var y = str[5];
        var hod = Click(M, y, x);
        if (hod != '0') {
            $('#block').css("opacity","0.5");
            $('#block').addClass('start');
            alert(hod);
        }
        Show(M);
    });    
    $("#reset").click(function() {
        if (confirm('Are you sure?')){
            M = NewPole();
            $('#block').css("opacity","1");
            Show(M);
        }
    });
});


function NewPole() {
    var N = Array
            (
                    Array('b', 'b', 'b', 'b', 'b', 'b', 'e', 'n', 'n', '0'),
                    Array('b', 'b', 'b', 'z', 'b', 'b', 'b', 'e', '0', '0'),
                    Array('.', 'b', 'b', 'b', 'b', 'b', 'b', '.', 'e', 'e'),
                    Array('.', '.', 'b', 'b', 'b', 'b', 'b', '.', '.', 'e'),
                    Array('.', '.', '.', '.', '.', '.', '.', '.', '.', '.'),
                    Array('e', '.', '.', 'w', 'w', 'w', 'w', 'w', '.', '.'),
                    Array('e', 'e', '.', 'w', 'w', 'w', 'w', 'w', 'w', '.'),
                    Array('e', 'e', 'e', 'w', 'w', 'w', 'q', 'w', 'w', 'w'),
                    Array('e', 'e', 'e', 'e', 'w', 'w', 'w', 'w', 'w', 'w')
                    );
    return N;
}
function Show(S) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 10; j++) {
            switch (S[i][j]) {
                case 'w':
                    $('#unit-' + i + j).css({
                        "background": "rgb(237, 252, 249)",
                        "border-color": "gray"
                    });
                    break;
                case 'W':
                    $('#unit-' + i + j).css({
                        "background": "rgb(226, 225, 225)",
                        "border-color": "gray"
                    });
                    break;
                case 'b':
                    $('#unit-' + i + j).css({
                        "background": "rgb(124, 111, 111)",
                        "border-color": "gray"
                    });
                    break;
                case 'B':
                    $('#unit-' + i + j).css({
                        "background": "rgb(76, 87, 75)",
                        "border-color": "gray"
                    });
                    break;
                case 'x':
                    $('#unit-' + i + j).css({
                        "background": "rgba(45, 218, 45, 0.32)",
                        "border-color": "green"
                    });
                    break;
                case '.':
                    $('#unit-' + i + j).css({
                        "border-color": "gray",
                        "background": "white"
                    });
                    break;
                case 'z':
                    $('#unit-' + i + j).css({
                        "background": "rgb(85, 59, 59)",
                        "border-color": "gray"
                    });
                    break;
                case 'Z':
                    $('#unit-' + i + j).css({
                        "background": "rgb(53, 00, 32)",
                        "border-color": "green"
                    });
                    break;
                case 'q':
                    $('#unit-' + i + j).css({
                        "background": "#CEC7C7",
                        "border-color": "gray"
                    });
                    break;
                case 'Q':
                    $('#unit-' + i + j).css({
                        "background": "rgb(149, 185, 145)",
                        "border-color": "gray"
                    });
                    break;
                case 'c':
                    $('#unit-' + i + j).css({
                        "background": "rgb(179, 76, 76)",
                        "border-color": "black"
                    });
                    break;
                case 'C':
                    $('#unit-' + i + j).css({
                        "background": "rgb(236, 15, 50)",
                        "border-color": "black"
                    });
                    break;
                case 'a':
                    $('#unit-' + i + j).css({
                        "background": "rgb(255, 150, 150)",
                        "border-color": "black"
                    });
                    break;
                case 'A':
                    $('#unit-' + i + j).css({
                        "background": "rgb(211, 140, 140)",
                        "border-color": "black"
                    });
                    break;
                default:
                    $('#unit-' + i + j).css({
                        "opacity": "0",
                        'cursor': 'inherit'
                    });
            }
        }
    }    
    if(S[0][9]==0){
        $('#hodit').html('White');
    }else{
        $('#hodit').html('Black');
    }
    if(S[1][8]==S[1][9]){
        $('#vantage').html('equally');
    }else if(S[1][8]>S[1][9]){
        $('#vantage').html('White is '+S[1][8]);
    }else{
        $('#vantage').html('Black is'+S[1][9]);
    }
    
    $('.w1').html(S[8][0]['white']);
    $('.w2').html(S[8][0]['troyka']);
    $('.w3').html(S[8][0]['quadro']);
    $('.w4').html(S[8][0]['zero']);
    $('.w5').html(S[8][0]['one']);
    $('.w6').html(S[8][0]['two']);
    $('.w7').html(S[8][0]['three']);
    $('.w8').html(S[8][0]['kolvoboy']);
    
    console.log(S);
    return;
}
//function Click(M, y,x){
//    console.log(M);
//    console.log(y);
//    console.log(x);
//    return;
//}
function edit(b) {
    b[0][0] = 'hh';
    return;
}