Template.player.rendered = function() {
    console.log('player view rendered');

    // TODO detect screen size !!!

    // TODO force landscape orientation !!!


    // TODO register device settings with view master?
    var screenSize = VIEWS.MICRO["960x640"].landscape;

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


//    ctx = new PRIZM.Context2D('tabletopContext', 'canvas',
//        WORLDS.MACRO.canvas2D[0], WORLDS.MACRO.canvas2D[1]);
//    ctx.init();
//
//    ctx3D = new PRIZM.Context3D('fieldContext',
//        screenSize[0], screenSize[1]);
//    ctx3D.init();
//
//    ctx2D = new PRIZM.Context2D('handContext', 'canvas',
//        screenSize[0], screenSize[1]);
//    ctx2D.init();
//
//    factory = new PRIZM.Factory();
//    factory.registerContext('tabletop',ctx);
//    factory.registerContext('hand',ctx2D);
//    factory.registerContext('field',ctx3D);
//
//    factory.loadTemplates3D( manifest3D, 'field' );
//    factory.loadTemplates2D( 'hand', 'atlas/atlas.json', manifest2D );
//    factory.loadTemplates2D( 'tabletop', 'atlas/atlas.json', manifest2D );
};
