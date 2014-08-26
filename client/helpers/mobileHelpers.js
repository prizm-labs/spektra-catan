
Template.handView.rendered = function() {
    console.log('hand view rendered');


    ctx = new Prizm.Context2D('handContext', 'canvas', 800, 800);
    ctx.init();

    dep = new Deps.Dependency;

    function Factory(){

    }



    Factory.prototype = {

        makeBody: function( x, y ){

            var body = new ReactiveObject({
                'x': x,
                'y': y,
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

                console.log('first computation');


                dep.depend();

                //Deps.currentComputation;

                updatePosition(body);

            });

            return body;

        }

    };


    factory = new Factory();

    body = factory.makeBody( 100, 100 );


    function updatePosition( body ) {

        console.log('updatePosition', body);

        ctx.moveBody( body );

    }

};