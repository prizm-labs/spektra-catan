
Template.handView.rendered = function() {
    console.log('hand view rendered');


    ctx = new PRIZM.Context2D('handContext', 'canvas', 800, 800);
    ctx.init();


    ctx3D = new PRIZM.Context3D('fieldContext', 800, 800);
    ctx3D.init();

    dep = new Deps.Dependency;




    factory = new PRIZM.Factory();

    manifest3D = [
        ['road', 'models/road-model.js', null, 0.5],
        ['settlement','models/settlement-model.js',null, 0.5],
        ['city','models/city-model.js',null, 0.5]
    ];

    factory.loadTemplates3D(manifest3D);

    //TODO wait for load complete, before creating objects


    b1 = factory.makeBody( 100, 100 );


    //b2 = factory.makeBody3D( 'road', 1,1,1);






};