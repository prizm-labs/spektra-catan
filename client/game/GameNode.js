/**
 * Created by michaelgarrido on 8/24/14.
 */
GameNode = function(){

    this.environments = {};

    this.state = {};
    this.bodies = {};

    this.components = {};
    // Environment2D
    // Atlas

    // Environment3D
    // Atlas

};

GameNode.prototype.createBody = function( key, atlas, environment, position ){

    this.bodies[key] = new GameBody2D( atlas, environment, this.components, position );

    this.bodies[key].render();
};

//Object.defineProperty(GameNode, 'component', {
//    get: function( key ) {
//        return this.components[key];
//    },
//    set: function( key, options ) {
//        // TODO merge in new options, or override existing options
//        this.components[key] = options;
//    }
//});