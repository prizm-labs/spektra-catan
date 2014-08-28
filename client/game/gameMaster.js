/**
 * Created by michaelgarrido on 8/24/14.
 */

// highest level translator between game state reactive data and rendered bodies
GameMaster = function( variant ){

    this.variant = variant; // Game rules

    // World
    // Objects

    this.nodes = {}
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

GameMaster.prototype.setupNodeMatrix = function(){
    var v = this.variant;
    var d = v.zones.board.dimensions;

    // Create & place terrain
    var origin = {x:(d.size.x-(10* d.gridSpacing.x))/2, y:(d.size.z-(8*d.gridSpacing.y))/2};
    var ctxKey = 'tabletop';

    var locations = generateTerrainLocations( origin, v.rows, d.gridSpacing );
    var entries = generateTerrainEntries( v.terrainMap );
    //TODO randomize terrain locations
    var manifest = generateTerrainManifest( entries, locations );

    this.factory.contexts[ctxKey].setLocations('terrain',locations);

    this.createTerrainNodes( manifest, ctxKey );


    // Create & place piece locations
    this.createPieceLocations( locations, ctxKey );

};


GameMaster.prototype.createTerrainNodes = function( manifest, ctxKey ){
    var _this = this;
    //merge position coordinates with object generator
    console.log('manifest',manifest);

    this.nodes['terrain'] = [];

    _.each( manifest, function(entry){

        console.log('createNodes',entry);

        var bodyKey = entry.node.bodies[0][0], variantKey = entry.node.bodies[0][1];

        var body = _this.factory.makeBody2D(
            ctxKey, bodyKey,
            { x: entry.location.x, y: entry.location.y },
            { variant: variantKey }
        );

        var node = new PRIZM.Node( entry.node.bodies[0] );
        console.log('new node',node);
        node.addBody('root', body);
        node.setState( 'type', variantKey );

        _this.nodes['terrain'].push(node);
    });
};

GameMaster.prototype.createPieceLocations = function( terrainOrigins, gridSpacing, ctxKey ){

    this.nodes['pieceLocations'] = [];


    _.each( terrainOrigins, function( origin ){

    });
};

function setupLocations() {
    var self = this;

    var origin = {x:offsets.boardCenter.x+2*xSpacing,y:offsets.boardCenter.y};


    _.each(self.terrain, function(terrain){
        generateLocationOrigins(terrain);
    });


    _.each(self.locations,function(location){
        var potentialNeighbors = findNeighbors(location);
        var currentNeighbors = location.getNeighbors();

        //console.log('location.entity.zIndex: '+location.entity.zIndex);

        if (currentNeighbors<potentialNeighbors) {
            var newNeighbors = _.difference(potentialNeighbors,currentNeighbors);
            //console.log(newNeighbors.length);
            _.each(newNeighbors,function(newNeighbor){
                location.addNeighbor(newNeighbor);
                newNeighbor.addNeighbor(location);
            });
        }
    });


    _.each(self.terrain,function(terrain, index){
        terrain.hideLocations();
        //terrain.showLocations([0,2,4,6,8,10]);
    });

    function findNeighbors(location){

        var x = location.position.x, y = location.position.y;

        var neighbors = _.filter(self.locations,function(testOrigin){

            var testX = testOrigin.position.x, testY = testOrigin.position.y;

            return (
                (testX==x && testY==y-ySpacing/2)
                ||(testX==x+xSpacing/2 && testY==y-ySpacing/4)
                ||(testX==x+xSpacing/2 && testY==y+ySpacing/4)
                ||(testX==x && testY==y+ySpacing/2)
                ||(testX==x-xSpacing/2 && testY==y+ySpacing/4)
                ||(testX==x-xSpacing/2 && testY==y-ySpacing/4)
                );
        });

        return neighbors;
    }


}

function generateLocationsInTerrain( terrain, uniqueLocations, gridSpacing ){

    var o = terrainOrigin;

    // 12 possible locations in hexagon
    // 6 edges / 6 vertices
    var potentialLocations = [
        {x:o.x, y:o.y-gridSpacing.y},
        {x:o.x+gridSpacing.x/2, y:o.y-gridSpacing.y*3/4},
        {x:o.x+gridSpacing.x, y:o.y-gridSpacing.y/2},
        {x:o.x+gridSpacing.x, y:o.y},
        {x:o.x+gridSpacing.x, y:o.y+gridSpacing.y/2},
        {x:o.x+gridSpacing.x/2, y:o.y+gridSpacing.y*3/4},

        {x:o.x, y:o.y+gridSpacing.y},
        {x:o.x-gridSpacing.x/2, y:o.y+gridSpacing.y*3/4},
        {x:o.x-gridSpacing.x, y:o.y+gridSpacing.y/2},

        {x:o.x-gridSpacing.x, y:o.y},
        {x:o.x-gridSpacing.x, y:o.y-gridSpacing.y/2},
        {x:o.x-gridSpacing.x/2, y:o.y-gridSpacing.y*3/4}
    ];

    _.each( potentialLocations, function(origin, index) {

        // is location already mapped in a previous terrain?
        var locationAtOrigin  = _.where(uniqueLocations,origin)[0];


        if (locationAtOrigin) {
            //console.log('existing location');

            terrain.addLocation(locationAtOrigin.model);
            locationAtOrigin.model.addOwner(terrain);

        } else {
            //console.log('new location');

            var locationType = (index%2==0) ? "vertex" : "edge";
            var locationId = self.locations.length;

            var entity = ig.game.spawnEntity(EntityLocation, origin.x, origin.y);
            // new Piece location model
            var pieceLocation = new PieceLocation(origin.x,origin.y,locationType,locationId,entity);

            self.locationOrigins.push({
                x:origin.x,
                y:origin.y,
                model: pieceLocation
            });

            terrain.addLocation(pieceLocation);
            pieceLocation.addOwner(terrain);

            self.locations.push(pieceLocation);
        }

    });

    //console.log(self.locationOrigins.length);
    return uniqueLocations;
}


function generateTerrainManifest( nodes, locations ) {
    var manifest = [];

    _.each(_.zip( nodes, locations ), function( entry ){
        entry = {
            node: entry[0],
            location: entry[1]
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


function generateTerrainEntries( terrainMap ) {

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