Template.player.rendered = function() {
    console.log('player view rendered');

    // TODO detect screen size !!!

    // TODO force landscape orientation !!!


    // TODO register device settings with view master?
    var screenSize = VIEWS.MICRO["960x640"].landscape;

    Session.set('screen','private');
    Session.set('screenWidth',screenSize[0]);
    Session.set('screenHeight',screenSize[1]);


    privateView = new PRIZM.View( screenSize[0], screenSize[1] );
    privateView.createUIManager( 'hitarea' );
    privateView.createContext2D( 'tabletop', 'tabletopContext', 'canvas', manifest2D, 'atlas/atlas.json', WORLDS.MACRO.canvas2D[0], WORLDS.MACRO.canvas2D[1] );
    privateView.createContext3D( 'field', 'fieldContext', manifest3D );
    privateView.createContext2D( 'hand', 'handContext', 'canvas', manifest2D, 'atlas/atlas.json' );




    privateView.onLoadComplete = function(){

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

        boxTgt = this.UI.addBoxTarget(0,0,screenSize[0], screenSize[1],'hand');
        boxTgt.setBehavior( 'tap', null, null, function( event ){
            console.log('box tap stop',event);
        });
        boxTgt.setBehavior( 'pan',
            function( event ){
                console.log('box pan start',event);
            },
            function( event ){
                console.log('box pan update',event);
                //b1.place( b1.x+event.deltaX, b1.y+event.deltaY );
                b1.place( event.center.x, event.center.y, 0 );
                Meteor.call('updateNode',"qwiyKk5SFwZG9E4ca",{x:event.center.x,y:event.center.y})
            },
            function( event ){
                console.log('box pan stop',event);
            });
        boxTgt.activate();


        this.UI.setTargetGroup('fullscreen',[boxTgt]);


        this.present();
    };
};
