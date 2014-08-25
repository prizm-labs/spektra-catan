/**
 * Created by michaelgarrido on 8/24/14.
 */

GameMaster = function( variant, environment2D, environment3D ){

    this.variant = variant; // Game rules
    this.environment2D = environment2D;
    this.environment3D = environment3D;

    this.locations2D = {};

    // World
    // Objects
};

GameMaster.prototype.init = function(){




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

    var manifest = generateTerrainManifest( nodes, locations, this.environment2D );
    this.createBodies( manifest );

};


GameMaster.prototype.createBodies = function( manifest ){

    //merge position coordinates with object generator
    console.log('manifest',manifest);

    _.each( manifest, function(entry){

        entry.node.createBody( entry.key, entry.atlas, entry.environment, entry.location );

    });
};


function generateTerrainManifest( nodes, locations, environment ) {
    var manifest = [];

    _.each(_.zip( nodes, locations ), function( entry ){
        entry = {
            key: 'board',
            node: entry[0],
            location: entry[1],
            environment: environment,
            atlas: ATLAS.entities.terrain
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

        var terrain = new GameNode();

        terrain.components['sprite'] = 'terrainSprite';
        terrain.components['animation'] = type;
        nodes.push(terrain);
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