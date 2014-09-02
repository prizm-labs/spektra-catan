/**
 * Created by dodeca on 8/7/14.
 */


Template.board.rendered = function() {
    console.log('board view rendered');


    // TODO detect screen size !!!

    // TODO force landscape orientation !!!


    // TODO register device settings with view master?
    var screenSize = VIEWS.MACRO["1600x1200"].portrait;

    Session.set('screen','private');
    Session.set('screenWidth',screenSize[0]);
    Session.set('screenHeight',screenSize[1]);


    mainView = new PRIZM.View( screenSize[0], screenSize[1] );
    mainView.createContext2D( 'tabletop', 'tabletopContext', 'canvas', manifest2D, 'atlas/atlas.json', WORLDS.MACRO.canvas2D[0], WORLDS.MACRO.canvas2D[1] );
    mainView.createContext3D( 'field', 'fieldContext', manifest3D );
    mainView.createContext2D( 'hand', 'handContext', 'canvas', manifest2D, 'atlas/atlas.json' );



    mainView.onLoadComplete = function(){

        b1 = this.factory.makeBody2D( 'hand', 'terrain', { x:100, y:100}, { variant: 'pasture' } );
        b2 = this.factory.makeBody3D( 'field', 'road', 0,0,0);

        liveDataDelegate.registerSubscription( 'nodes', 'qwiyKk5SFwZG9E4ca', function( fields ){

            b1.place( fields.x||null, fields.y||null, 0 );

        });

        var gameMaster = new GameMaster( VARIANTS["threeToFourPlayers"], this.factory );
        gameMaster.init( this.factory );
        gameMaster.setupNodeMatrix();


        // Map tabletop into 3D context

        var tabletopCtx = this.factory.contexts['tabletop'];
        var fieldCtx = this.factory.contexts['field'];

        //console.log('mapping contexts',tabletopCtx,fieldCtx);
        fieldCtx.addDynamicTexture( 'terrain', tabletopCtx.renderer.view );
        fieldCtx.mapTabletopTexture( 'terrain', WORLDS.MACRO.canvas2D[0], WORLDS.MACRO.canvas2D[1], 0.5 );

        // Setup Camera
        camera = this.factory.makeCamera3D('field', 0, 0, 0, 75, 0.1, 2000);


        fieldCtx.setActiveCamera( camera );

        manager = new PRIZM.CameraManager( camera );

        var rotation = Math.PI/3;
        var distance = 700;

        manager.registerView( 'default', 1, 0,0,500, 0,0,0 );
        manager.registerView( 'p1', 1, 0,-distance,500, rotation,0,0 );
        manager.registerView( 'p2', 1, distance,0,500, 0, rotation,0 );
        manager.registerView( 'p3', 1, 0,distance,500,  -rotation,0,0 );
        manager.registerView( 'p4', 1, -distance,0,500, 0,-rotation,0 );

        manager.setView('default');


        // Render private view bodies (i.e. hand)


        this.present();
    };
};

