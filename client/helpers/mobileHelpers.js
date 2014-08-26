
Template.handView.rendered = function() {
    console.log('hand view rendered');


    ctx = new Prizm.Context2D('handContext', 'canvas', 800, 800);
    ctx.init();


    ctx3D = new Prizm.Context3D('fieldContext', 800, 800);
    ctx3D.init();

    dep = new Deps.Dependency;

    function Body2D( ctx, x, y ) {
        var body = new ReactiveObject({
            'x': x,
            'y': y,
            ctx: ctx,
            place: function( x, y ){
                this.x = x;
                this.y = y;

                //this.computation.invalidate();
            },
            position: function(){
                console.log(this.x+','+this.y);
                return [this.x,this.y];
            }

        });

        body.id = ctx.addBody(body.x,body.y);

        body.computation = Deps.autorun(function (computation) {
            //console.log('first computation');
            //dep.depend();
            //Deps.currentComputation;
            updatePosition2D(body);
        });

        return body;
    }

    function Body3D( ctx, key, x, y, z ) {

        var body = new ReactiveObject({
            position: {
                x: x, y: y, z: z
            },
            rotation: {
                x: 0, y: 0, z:0
            },
            ctx: ctx,
            key: key,

            place: function( x, y, z ){
                this.position = {
                    x: x, y: y, z: z
                };
            },

            rotate: function( x, y, z ){
                this.rotation = {
                    x: x, y: y, z: z
                };
            }

        });

        body.id = ctx.addBody( key, body.position.x,body.position.y,body.position.z);

        body.computation = Deps.autorun(function (computation) {
            //dep.depend();
            updateTransform3D(body);
        });

        return body;
    }


    function Factory(){

        this.templates2D = {};
        this.bodies2D = [];


        this.templates3D = {};
        this.bodies3D = [];
    }

    Factory.prototype = {
        // manifest: [ key, geometry, texture ]
        loadTemplates3D: function( manifest ){
            console.log('loadTemplates3D',manifest);

            _.each(manifest, function(model){
                ctx3D.load(model);
            })

        },

        makeBody3D: function( key, x, y, z ){

            var body = new Body3D( ctx3D, key, x, y, z );
            this.bodies3D.push(body);

            return body;
        },

        makeBody: function( x, y ){
            var body = new Body2D( ctx, x, y );
            this.bodies2D.push(body);

            return body;
        }

    };


    factory = new Factory();

    manifest3D = [
        ['road', 'models/road-model.js', null, 0.5],
        ['settlement','models/settlement-model.js',null, 0.5],
        ['city','models/city-model.js',null, 0.5]
    ];

    factory.loadTemplates3D(manifest3D);


    b1 = factory.makeBody( 100, 100 );
    //b2 = factory.makeBody3D( 'road', 1,1,1);


    function updatePosition2D( body ){

        console.log('updatePosition', body);

        ctx.moveBody( body );

    }

    function updateTransform3D( body ){
        //position
        //rotation
        //scaling

        ctx3D.updateBody( body );
    }

};