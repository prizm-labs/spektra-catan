
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

                this.computation.invalidate();
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

    function Body3D( ctx, x, y, z ) {

        var body = new ReactiveObject({
            'x': x,
            'y': y,
            'z': z,
            ctx: ctx,

            place: function( x, y, z ){
                this.x = x;
                this.y = y;
                this.z = z;

                this.computation.invalidate();
            },
            position: function(){
                console.log(this.x+','+this.y);
                return [this.x,this.y];
            }

        });

        body.id = ctx.addBody(body.x,body.y,body.z);

        body.computation = Deps.autorun(function (computation) {
            //dep.depend();
            updateTransform3D(body);
        });

        return body;
    }


    function Factory(){

        this.bodies2D = [];
        this.bodies3D = [];
    }

    Factory.prototype = {

        makeBody3D: function( x, y, z ){

            var body = new Body3D( ctx3D, x, y, z );
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


    b1 = factory.makeBody( 100, 100 );
    b2 = factory.makeBody3D(0,0,0);


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