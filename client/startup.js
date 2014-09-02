/**
 * Created by dodeca on 8/5/14.
 */

// Client startup

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
    };


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


    // Global sounds

    soundManager = new PRIZM.SoundManager();
    soundManager.loadGroup( 'default', soundManifest.files );

    // Global contexts

    privateView = null;
    mainView = null;

    // TODO properly determine client type (public or private) !!!!

    Meteor.methods({
        setupGameWorld: function(){

            console.log('client setupGameWorld');

            //ViewMaster.init();

            if (privateView) privateView.onLoadComplete.call(privateView);

            if (mainView) {

                liveDataDelegate = new LiveDataDelegate();

                nodeHandle = Meteor.subscribe('nodes',function onReady(){
                    console.log('subscribed to public nodes !!!');
                });

                connectionStore = Meteor.connection.registerStore('nodes', {
                    beginUpdate: function( batchSize, reset ){
                        console.log('beginUpdate nodes', batchSize, reset);
                    },
                    update: function( msg ){
                        console.log('update nodes', JSON.stringify(msg));
                        liveDataDelegate.updateSubscriptions( msg );
                    },
                    endUpdate: function(){
                        console.log('endUpdate nodes');
                    },
                    saveOriginals: function(){
                        console.log('saveOriginals');
                    },
                    retrieveOriginals: function(){
                        console.log('retrieveOriginals');
                    }
                });

                mainView.onLoadComplete.call(mainView);



            }
        }

    })

});

function LiveDataDelegate(){

    // bind collection (or document) to reactive object
    //i.e. Node document on server to Body2D on client

    // with a translate function: position in 2D context

    this.subscriptions = {};
}

LiveDataDelegate.prototype = {

    registerSubscription: function( collection, id, translation ){

        this.subscriptions[collection+id] = translation;

    },

    updateSubscriptions: function( ddpMsg ){

        console.log('updateSubscriptions',ddpMsg);
        //if id matches subscription, call translation
        // ex:  { "msg":"changed",
        // "collection":"nodes",
        // "id":"qwiyKk5SFwZG9E4ca",
        // "fields":{"x":200,"y":200}}

        if (this.subscriptions[ddpMsg.collection+ddpMsg.id]) this.subscriptions[ddpMsg.collection+ddpMsg.id](ddpMsg.fields);

    }

}