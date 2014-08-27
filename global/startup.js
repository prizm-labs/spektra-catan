/**
 * Created by dodeca on 8/5/14.
 */

Meteor.startup(function () {


    GameState = new ReactiveObject({
        are2DAssetsLoaded: false,
        are3DAssetsLoaded: false
    });

    Deps.autorun(function (c) {
        if (GameState.are2DAssetsLoaded && GameState.are3DAssetsLoaded) {
            c.stop();
            console.log('loaded all assets');
            Meteor.call('setupGameWorld');
        } else {
            return;
        }

    });

});
