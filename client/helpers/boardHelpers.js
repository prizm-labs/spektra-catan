/**
 * Created by dodeca on 8/7/14.
 */

ARENA = {};

ARENA.size = {
    width: 1200,
    length: 1200,
    height: 1400
};

ENTITIES = {
    card: {
        size: {
            width: 91,
            height: 135
        }
    }
};

//ARENA.size = {
//    width: 300,
//    length: 300,
//    height: 1000
//}

var BABYLON = Babylon;


Template.board.rendered = function(){
    console.log('board rendered');


    // Create 2D contexts
    // from PhaserJS
    var environment2D = new Environment2D();
    environment2D.addState('main', MANIFEST.D2 );
   //environment2D.addEntity('main','desert','img/terrain-desert.png',{x:100,y:100});
    environment2D.init();



    // Create 3D contexts
    // from BabylonJS
    var environment3D = new Environment3D();
    environment3D.setCanvas('babylon');
    environment3D.setFpsLabel('fpsLabel');
    environment3D.setContext2D('tabletop',environment2D.game);

    environment3D.init();


};

