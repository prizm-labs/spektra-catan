/**
 * Created by dodeca on 8/4/14.
 */

GameSession = (function(){

    function GameSession(){}

    var currentGame = null;

    GameSession.instant = null; //UI configuration
    GameSession.game = null; //Game
    GameSession.player = null;

    GameSession.cache = function(){
        Session.set('gameSession',GameSession.data);
    }

    GameSession.prototype.performAction = function( actionKey ){

        switch(actionKey){

            case 'roll':


                break;


        }

    }

    GameSession.prototype.advancePhase = function() {
        console.log('advancePhase',PHASES);

        var currentPhase = currentGame.phase+1;
//    if (currentPhase==PHASES.length){
//        currentPhase=0;
//    }
        console.log('current phase',currentPhase);

        Games.update(currentGame._id, {$set:{phase:currentPhase}});

        console.log('advancePhase',GameSession.game.phase);
    }

    GameSession.prototype.advanceTurn = function() {

        Games.update(currentGame._id, {$inc: {current_turn:1} });

        var currentPosition = currentGame.position+1;
        if (currentPosition==currentGame.players.length){
            currentPosition=0;
        }
        console.log('current position',currentPosition);

        Games.update(currentGame._id, {$set:{position:currentPosition,phase:0}});

        //GameSession.data.current_turn = currentGame.current_turn;
        console.log('advanceTurn',this.game.current_turn);
    }

    GameSession.prototype.setPlayer = function(playerId){
        console.log('setPlayer',playerId);

        var targetPlayer = Players.find(playerId).fetch()[0];
        console.log('targetPlayer',targetPlayer);

        this.player = new ReactiveDictionary(targetPlayer);

        Session.set('currentPlayer',targetPlayer._id);
    }

    GameSession.prototype.loadGame = function(gameId) {
        console.log('loadGame',gameId);

        var targetGame = Games.find(gameId).fetch()[0];
        console.log('targetGame',targetGame);

        currentGame = targetGame;
        this.game = new ReactiveDictionary(currentGame);

        Session.set('currentGame',currentGame._id);
    }


    return GameSession;
})();

