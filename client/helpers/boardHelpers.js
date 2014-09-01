/**
 * Created by dodeca on 8/7/14.
 */


Template.board.rendered = function() {
    console.log('board view rendered');


    // TODO detect screen size !!!

    Session.set('screen','public');

    soundManager = new PRIZM.SoundManager();
    soundManager.loadGroup( 'default', soundManifest.files );

    ctx2D = new PRIZM.Context2D('handContext', 'canvas',
        WORLDS.MACRO.canvas2D[0], WORLDS.MACRO.canvas2D[1]);
    ctx2D.init();

    ctx = new PRIZM.Context2D('tabletopContext', 'canvas',
        WORLDS.MACRO.canvas2D[0], WORLDS.MACRO.canvas2D[1]);
    ctx.init();

    ctx3D = new PRIZM.Context3D('fieldContext',
        WORLDS.MACRO.canvas3D[0], WORLDS.MACRO.canvas3D[1]);
    ctx3D.init();

    factory = new PRIZM.Factory();
    factory.registerContext('tabletop',ctx);
    factory.registerContext('hand',ctx2D);
    factory.registerContext('field',ctx3D);

    factory.loadTemplates3D( manifest3D, 'field');
    factory.loadTemplates2D( 'hand', 'atlas/atlas.json', manifest2D );
    factory.loadTemplates2D( 'tabletop', 'atlas/atlas.json', manifest2D );
};

