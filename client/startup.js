/**
 * Created by dodeca on 8/5/14.
 */

Meteor.startup(function () {

    console.log('Client startup');

    GS = new GameSession();

    console.log('GameSession',GS);

});
