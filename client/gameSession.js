/**
 * Created by dodeca on 8/4/14.
 */
var currentGame = null;

GameSession = function(){
}
GameSession.data = null;

GameSession.cache = function(){
    Session.set('gameSession',GameSession.data);
}

GameSession.advanceTurn = function() {
    GameSession.data.current_turn+=1;
    console.log('advanceTurn',GameSession.data.current_turn);
    //GameSession.cache();

    Games.update(currentGame._id, {$inc: {current_turn:1} })
}

GameSession.addPlayer = function(player_id){

}

GameSession.loadGame = function(gameId) {
    console.log('loadGame',gameId);

    //TODO get via gameData ID lookup
    //var targetGame = Games.findOne(gameId).fetch();
    var targetGame = Games.find(gameId).fetch()[0];
    console.log(targetGame);

    currentGame = targetGame;
    GameSession.data = new ReactiveDictionary(currentGame);

    Session.set('currentGame',currentGame);
}