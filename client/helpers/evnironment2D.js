/**
 * Created by michaelgarrido on 8/22/14.
 */

Environment2D = Environment;

function Environment() {
    // Assets
    // 2D context
    this.game = null;
    this.states = {};
};

//Environment2D.addEntity('desert','img/terrain-desert.png',{x:100,y:100}
//Environment2D.init();

Environment.prototype.init = function () {

    console.log('init',this);

    this.game = new Phaser.Game(ARENA.size.length, ARENA.size.width, Phaser.CANVAS, 'phaser', null, true);

    this.game.state.add('main',this.states['main']);
    this.game.state.start('main');
};

Environment.prototype.addEntity = function (state, name, image, position) {

    var entity = {
        name: name,
        image: image,
        position: position
    };

    this.states[state].entities.push(entity);
    console.log('entities',this.states[state].entities);
};

Environment.prototype.addState = function ( name, manifest, onCreatedCallback ) {
    this.states[name] = new State();
    this.states[name].setPreloadManifest(manifest);
    this.states[name].onCreatedCallback = onCreatedCallback;
};

// Add behavior to existing entity
Environment.prototype.addBehavior = function () {

};


function State(game) {
    this.entities = [];
    this.manifest = null;
    this.onCreatedCallback = null;
};


State.prototype = {

    // Prizm functions
    setPreloadManifest: function( manifest ){
        this.manifest = manifest;
    },

    // PhaserJS reserved "State" functions
    preload: function () {
        var self = this;
        console.log('preload', self);


        // Preload all assets from manifest
        _.each( this.manifest.spritesheets, function( spritesheet )
        {
            var path = SYSTEM.paths.sprites + spritesheet.path;
            self.game.load.spritesheet( spritesheet.name, path, spritesheet.width, spritesheet.height, spritesheet.frames );
        });

    },

    create: function () {
        var self = this;

        console.log('create', self);

        //TODO callback to render 3D environment
        this.onCreatedCallback();
    },
    update: function () {

        //sprite.angle
    }
};