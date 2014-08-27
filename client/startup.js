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
    }


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
            // wait for load complete, before creating objects








            b1 = factory.makeBody2D( 100, 100, 'terrain', { variant: 'pasture' } );
            b2 = factory.makeBody3D( 'road', 1,1,1);




            //http://stackoverflow.com/questions/17374431/client-side-asynchronous-call-in-meteor
        }
    })

});