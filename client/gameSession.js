/**
 * Created by dodeca on 8/4/14.
 */
var currentGame = null;

GameSession = function(){
}
GameSession.data = null;
GameSession.player = null;

GameSession.cache = function(){
    Session.set('gameSession',GameSession.data);
}

GameSession.advanceTurn = function() {
    GameSession.data.current_turn+=1;
    console.log('advanceTurn',GameSession.data.current_turn);
    //GameSession.cache();

    Games.update(currentGame._id, {$inc: {current_turn:1} })
}

GameSession.setPlayer = function(playerId){
    console.log('setPlayer'),playerId;

    var targetPlayer = Players.find(playerId).fetch()[0];
    console.log('targetPlayer',targetPlayer);

    GameSession.player = new ReactiveDictionary(targetPlayer);

    Session.set('currentPlayer',targetPlayer);
}

GameSession.loadGame = function(gameId) {
    console.log('loadGame',gameId);

    //TODO get via gameData ID lookup
    //var targetGame = Games.findOne(gameId).fetch();
    var targetGame = Games.find(gameId).fetch()[0];
    console.log('targetGame',targetGame);

    currentGame = targetGame;
    GameSession.data = new ReactiveDictionary(currentGame);

    Session.set('currentGame',currentGame);
}