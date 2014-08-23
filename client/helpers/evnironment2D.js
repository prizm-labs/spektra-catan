/**
 * Created by michaelgarrido on 8/22/14.
 */

Environment2D = Environment;

function Environment() {
    // Assets
    // 2D context
    this.game = null;
    this.callback = function () {
        console.log('callback empty')
    };

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

Environment.prototype.addState = function (name) {
    this.states[name] = new State();
};

// Add behavior to existing entity
Environment.prototype.addBehavior = function () {

};


function State(game) {
    this.entities = [];
};


State.prototype = {
    preload: function () {
        var self = this;
        console.log('preload', self);

        //TODO preload all assets from sprite atlas
        _.each(this.entities, function (entity) {
            console.log('entity', entity);
            self.game.load.image(entity.name,entity.image);
        })

    },

    create: function () {
        var self = this;

        console.log('create', self);

        _.each(this.entities, function (entity) {
            console.log('adding entity', entity);
            var sprite = self.game.add.sprite(entity.position.x, entity.position.y, entity.name);
            //var sprite = game.add.sprite(self.game.world.centerX, self.game.world.centerY,entity.name);
            sprite.anchor.setTo(0.5, 0.5);
        });


        //TODO callback to render 3D environment
        //this.callback();
    },
    update: function () {

        //sprite.angle
    }
};