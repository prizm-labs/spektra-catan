/**
 * Created by michaelgarrido on 9/1/14.
 */
ViewMaster = {

    init: function(){

        b1 = factory.makeBody2D( 'hand', 'terrain', { x:100, y:100}, { variant: 'pasture' } );
        b2 = factory.makeBody3D( 'field', 'road', 0,0,0);

        var gameMaster = new GameMaster( VARIANTS["threeToFourPlayers"], factory );
        gameMaster.init( factory );
        gameMaster.setupNodeMatrix();


        // Map tabletop into 3D context

        var tabletopCtx = factory.contexts['tabletop'];
        var fieldCtx = factory.contexts['field'];

        //console.log('mapping contexts',tabletopCtx,fieldCtx);
        fieldCtx.addDynamicTexture( 'terrain', tabletopCtx.renderer.view );
        fieldCtx.mapTabletopTexture( 'terrain', WORLDS.MACRO.canvas2D[0], WORLDS.MACRO.canvas2D[1], 0.5 );

        // Setup Camera
        camera = factory.makeCamera3D('field', 0, 0, 0, [75, 1.0, 0.1, 2000]);


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



    },

    activateUI: function(){

        uiManager = new PRIZM.UIManager( factory, "hitarea" );
        uiManager.bindStageTarget('hand');

        boxTgt = uiManager.addBoxTarget(0,0,1200,1200,'hand');
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
            },
            function( event ){
                console.log('box pan stop',event);
            });

        boxTgt.activate();

    }

}