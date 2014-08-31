/**
 * Created by dodeca on 8/5/14.
 */

Meteor.startup(function () {

    GameState = {
        areAssetsLoaded: {
            '2D': false,
            '3D': false
        },
        _dep: new Deps.Dependency,
        set: function( key, areLoaded ){
            this.areAssetsLoaded[key] = areLoaded;
            this._dep.changed();
        },
        get: function( key ){
            this._dep.depend();
            return this.areAssetsLoaded[key];
        }
    };


    globalDep = new Deps.Dependency;

    gameStateComputation = Deps.autorun(function (c) {

        console.log('gameState comp',c);

        if (GameState.get('2D') && GameState.get('3D')) {

            console.log('loaded all assets');
            Meteor.call('setupGameWorld');
        } else {
            console.log('assets not loaded');
            return;
        }

    });

    Meteor.methods({
        setupGameWorld: function(){

            console.log('client setupGameWorld');

            //b1 = factory.makeBody2D( 100, 100, 'terrain', { variant: 'pasture' } );
            b2 = factory.makeBody3D( 'field', 'road', 0,0,0);

            var gameMaster = new GameMaster( VARIANTS["threeToFourPlayers"], factory );
            gameMaster.init( factory );
            gameMaster.setupNodeMatrix();


            // Map tabletop into 3D context

            var tabletopCtx = factory.contexts['tabletop'];
            var fieldCtx = factory.contexts['field'];

            //console.log('mapping contexts',tabletopCtx,fieldCtx);
            fieldCtx.addDynamicTexture( 'terrain', tabletopCtx.renderer.view );
            fieldCtx.mapTabletopTexture( 'terrain' );

            // Setup Camera
            camera = factory.makeCamera3D('field', 0, 0, 0, [75, 1.0, 0.1, 2000]);


            fieldCtx.setActiveCamera( camera );

            manager = new CameraManager( camera );

            var rotation = Math.PI/3;
            var distance = 700;

            manager.registerView( 'default', 0,0,500, 0,0,0 );
            manager.registerView( 'p1', 0,-distance,500, rotation,0,0 );
            manager.registerView( 'p2', distance,0,500, 0, rotation,0 );
            manager.registerView( 'p3', 0,distance,500,  -rotation,0,0 );
            manager.registerView( 'p4', -distance,0,500, 0,-rotation,0 );

            manager.setView('default');


            n = new PRIZM.Node();
            n2 = new PRIZM.Node();
            n.addChild(n2);


            //q = PRIZM.NodeMatrix.query('numberToken',{ roll: 8 });
            q = PRIZM.NodeMatrix.query('terrain');

            uiManager = new PRIZM.UIManager( factory, "hitarea" );
            uiManager.bindStageTarget('hand');

            boxTgt = uiManager.addBoxTarget(0,0,100,100,'hand');
            boxTgt.setBehavior( 'tap', null, null, function( event ){
                console.log('box tap stop',event);
            });
        }

    })

});


function CameraManager( camera ){

    this.camera = camera;
    this.views = {};
}

CameraManager.prototype.registerView = function( key, positionX, positionY, positionZ, rotationX, rotationY, rotationZ ) {

    var _this = this;

    this.views[key] = function(){

        _this.camera.place( positionX, positionY, positionZ );
        _this.camera.rotate( rotationX, rotationY, rotationZ );
    }

}

CameraManager.prototype.setView = function( key ){

    this.views[key]();

}