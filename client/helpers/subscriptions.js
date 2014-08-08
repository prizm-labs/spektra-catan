/**
 * Created by dodeca on 8/4/14.
 */

if (Meteor.isClient) {

    Meteor.subscribe('allPlayers');
    Meteor.subscribe('allGames',function onReady(){

//        var currentGame = Session.get('currentGame') || null;
//
//        if (currentGame){
//            GameSession.loadGame(currentGame);
//        } else {
//            console.log("No game found");
//        }
    });
    //Meteor.subscribe('gameActions', Session.get('currentGame'));

//Meteor.subscribe('allItems');
}

