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

//function Terrain() {
//
//}
//
//// need to pass in board center origin
//function setupTerrain (terrainMap, origin, gridSpacing) {
//    var self = this;
//    var rows = this.config.rows;
//
//    // Start in the most top/left position
//    origin = {
//        x: origin.x + 3*gridSpacing.x,
//        y: origin.y + gridSpacing.x
//    };
//
//    _.each( rows, function(rowLength,rowIndex){
//        self.origins = self.origins.concat(generateTerrainOriginsForRow(origin,rowLength));
//
//        // Shift origin for next row
//        var newX, newY = origin.y + gridSpacing.y*1.5;
//
//        if (rowIndex<2) {
//            newX = origin.x-gridSpacing.x;
//        } else {
//            newX = origin.x+gridSpacing.x;
//        }
//
//        origin = {x:newX,y:newY};
//    });
//
//}
//
//function generateTerrainOriginsForRow (rowOrigin, rowLength, gridSpacing ){
//
//    var origins = [];
//
//    for (var i=0;i<rowLength;i++) {
//        origins.push({
//            x: rowOrigin.x + i*gridSpacing.x*2,
//            y: rowOrigin.y
//        });
//    }
//
//    return origins;
//}
//
//
//function spawnTerrain ( count, type ) {
//    var self = this;
//
//    for (var i=0;i<count;i++) {
//
//        // new Terrain model
//        var terrain = new Terrain( type );
//
//        // cache desert tile for other setup
//        if (type=="desert") {
//            self.desert = terrain;
//            console.log('desert tile!');
//            console.log(terrain);
//        }
//
//        self.terrain.push(terrain);
//    }
//}
//
//function placeTerrain (origins) {
//    var self = this;
//
//    // var terrain = ig.game.getEntitiesByType(EntityTerrain);
//    //terrain = Utils.shuffle(terrain);
//
//    self.terrain = _.shuffle(self.terrain);
//
//    origins.forEach(function(origin,originIndex){
//
//        var terrain = self.terrain[originIndex];
//
//        //console.log(origin);
//        //console.log(terrain);
//
//        if (terrain.type=="desert") {
//            console.log('desert tile!');
//
//        }
//
//        terrain.setOrigin(origin.x,origin.y,originIndex);
//        //console.log(terrain.getOrigin());
//
//        // place terrain at origin
//        terrain.entity.pos.x = origin.x;
//        terrain.entity.pos.y = origin.y;
//        // TODO animate terrain with predetermined type to origin
//    });
//}