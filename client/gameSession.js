/**
 * Created by dodeca on 8/4/14.
 */
var sessionData = Session.get('gameSession') || {currentTurn:0};

GameSession = function(){
}
GameSession.data = new ReactiveDictionary(sessionData);

GameSession.cache = function(){
    Session.set('gameSession',GameSession.data);
}

GameSession.advanceTurn = function() {
    GameSession.data.currentTurn+=1;
    console.log('advanceTurn',GameSession.data.currentTurn);
    GameSession.cache();
}

GameSession.addPlayer = function(player_id){

}