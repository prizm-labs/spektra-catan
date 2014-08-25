/**
 * Created by michaelgarrido on 8/23/14.
 */

function BoardGenerator( config, game ){
    this.config = config;
    this.game = game;
}

BoardGenerator.prototype.calculatePositions = function(){

};

BoardGenerator.prototype.create = function(){
    //all objects enter the game world, no placement
};

BoardGenerator.prototype.addState = function( key, actions ){
    //orders to add, remove, transform, reposition etc. objects
};

BoardGenerator.prototype.executeState = function( key ){
    //perform the actions on the objects
};
