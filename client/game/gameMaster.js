/**
 * Created by michaelgarrido on 8/24/14.
 */

function Node(){
    this.environments = {};

    this.state = {};
    this.bodies = {};

    this.components = {};
    // Environment2D
    // Atlas

    // Environment3D
    // Atlas
}

Node.prototype.addBody = function( groupKey, body ){



}

GameMaster = function( variant, environment2D, environment3D ){

    this.variant = variant; // Game rules
//    this.environment2D = environment2D;
//    this.environment3D = environment3D;

    this.locations2D = {};

    // World
    // Objects
};

GameMaster.prototype.init = function( factory ){

    this.factory = factory;


    console.log('catan',this);

    // cache desert tile for other setup
//    if (type=="desert") {
//        self.desert = terrain;
//        console.log('desert tile!');
//        console.log(terrain);
//    }
};

GameMaster.prototype.setup = function(){
    var v = this.variant;

    var d = v.zones.board.dimensions;

    //create & place terrain
    var origin = {x:(d.size.x-(10* d.gridSpacing.x))/2, y:(d.size.z-(8*d.gridSpacing.y))/2};

    var locations = generateTerrainLocations( origin, v.rows, d.gridSpacing );
    this.locations2D["terrain"] = locations;

    var nodes = generateTerrainNodes( v.terrainMap );

    //TODO randomize terrain locations

    var manifest = generateTerrainManifest( nodes, locations, 'tabletop' );
    this.createNodes( manifest );

};


GameMaster.prototype.createNodes = function( manifest ){
    var _this = this;
    //merge position coordinates with object generator
    console.log('manifest',manifest);

    _.each( manifest, function(entry){

        console.log('createNodes',entry);
//        var terrainBody = _this.factory.makeBody2D(
//            entry.location.x, entry.location.y,
//            entry.node.bodies[0][0], {variant: entry.node.bodies[0][1] } );

        var terrainBody = _this.factory.makeBody(
            'tabletop',
            entry.node.bodies[0][0],
            { x: entry.location.x, y: entry.location.y },
            { variant: entry.node.bodies[0][1] }
        );
    });
};


function generateTerrainManifest( nodes, locations, zone ) {
    var manifest = [];

    _.each(_.zip( nodes, locations ), function( entry ){
        entry = {
            node: entry[0],
            location: entry[1],
            zone: zone
        };

        manifest.push(entry);
    });

    return manifest;
}


// need to pass in board center origin
function generateTerrainLocations ( origin, rows, gridSpacing) {

    var origins = [];

    // Start in the most top/left position
    origin = {
        x: origin.x + 3*gridSpacing.x,
        y: origin.y + gridSpacing.x
    };

    _.each( rows, function( rowLength, rowIndex ){
        origins = origins.concat( generateTerrainLocationsForRow( origin, rowLength, gridSpacing ) );

        // Shift origin for next row
        var newX, newY = origin.y + gridSpacing.y*1.5;

        if (rowIndex<2) {
            newX = origin.x-gridSpacing.x;
        } else {
            newX = origin.x+gridSpacing.x;
        }

        origin = {x:newX,y:newY};
    });

    return origins;
}

function generateTerrainLocationsForRow( rowOrigin, rowLength, gridSpacing ){

    var origins = [];

    for (var i=0;i<rowLength;i++) {
        origins.push({
            x: rowOrigin.x + i*gridSpacing.x*2,
            y: rowOrigin.y
        });
    }

    return origins;
}


function generateTerrainNodes( terrainMap ) {

    var nodes = [];

    // create terrain nodes
    _.each( terrainMap, function( count, type ){
        nodes = nodes.concat(generateTerrainNode( count, type ));
    });

    return nodes;
}

function generateTerrainNode ( count, type ) {
    var self = this;
    var nodes = [];

    for (var i=0;i<count;i++) {

//        var terrain = new Node();
//
//        terrain.components['sprite'] = 'terrainSprite';
//        terrain.components['animation'] = type;
        var terrainData = {
            node: 'terrain',
            bodies: [
                ['terrain', type]
            ]
        };

        nodes.push(terrainData);
    }

    return nodes;
}

function placeTerrain (origins) {
    var self = this;

    // var terrain = ig.game.getEntitiesByType(EntityTerrain);
    //terrain = Utils.shuffle(terrain);

    self.terrain = _.shuffle(self.terrain);

    origins.forEach(function (origin, originIndex) {

        var terrain = self.terrain[originIndex];

        //console.log(origin);
        //console.log(terrain);

        if (terrain.type == "desert") {
            console.log('desert tile!');

        }

        terrain.setOrigin(origin.x, origin.y, originIndex);
        //console.log(terrain.getOrigin());

        // place terrain at origin
        terrain.entity.pos.x = origin.x;
        terrain.entity.pos.y = origin.y;
        // TODO animate terrain with predetermined type to origin
    });
}