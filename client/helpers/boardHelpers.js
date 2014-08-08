/**
 * Created by dodeca on 8/7/14.
 */
Template.board.rendered = function(){
    console.log('board rendered');
    Crafty.init(500,350, document.getElementById('game'));
    Crafty.e('2D, Canvas, Color').attr({x: 0, y: 0, w: 100, h: 100}).color('#F00');
}