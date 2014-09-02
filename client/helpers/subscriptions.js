/**
 * Created by dodeca on 8/4/14.
 */

if (Meteor.isClient) {

    Meteor.subscribe('allPlayers');
    Meteor.subscribe('allGames',function onReady(){
    });
}
