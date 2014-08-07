/**
 * Created by dodeca on 8/4/14.
 */

GameSession = (function(){

    function GameSession(){
        this.instant = null; //UI configuration
        this.game = null; //Game, Reactive Dictionary
        this.player = null; //Player, Reactive Dictionary
        this.actions = null; //Actions, Reactive Collection

        this.phase = null;


        this.isMyTurn = false;
    }

    var currentGame = null; //Meteor Collection object

//    GameSession.cache = function(){
//        Session.set('gameSession',GameSession.data);
//    }

    GameSession.prototype.setMyTurn = function(){
        this.isMyTurn = (this.game.position===this.player.position);
    }

    GameSession.prototype.createDiceRoller = function(){
        this.diceRoller = new DiceRoller();
    }

    GameSession.prototype.performAction = function( actionKey, options ){

        var data;

        switch(actionKey){

            case 'roll':
                var roll = this.diceRoller.rollDice(true);
                data = roll;
                break;
        }

        //create action record
        //player, type, details
        var action = {
            game: Session.get('currentGame'),
            player: Session.get('currentPlayer'),
            type: actionKey,
            data: data
        }

        console.log('action record',action);
        Actions.insert(action);
    }

    GameSession.prototype.getCurrentGame = function(){
        return currentGame;
    }

    GameSession.prototype.advancePhase = function() {
        console.log('advancePhase',PHASES);

        var currentPhase = currentGame.phase+1;
//        if (currentPhase==PHASES.length){
//            currentPhase=0;
//        }
        console.log('current phase',currentPhase);

        Games.update(currentGame._id, {$set:{phase:currentPhase}});

        console.log('advancePhase',this.game.phase);
    }

    GameSession.prototype.advanceTurn = function() {

        Games.update(currentGame._id, {$inc: {turn:1} });

        var currentPosition = currentGame.position+1;
        if (currentPosition==currentGame.players.length){
            currentPosition=0;
        }
        console.log('current position',currentPosition);

        Games.update(currentGame._id, {$set:{position:currentPosition,phase:0}});

        //GameSession.data.current_turn = currentGame.current_turn;
        console.log('advanceTurn',this.game.turn);
    }

    GameSession.prototype.setPlayer = function(playerId){
        console.log('setPlayer',playerId);

        var targetPlayer = Players.find(playerId).fetch()[0];
        console.log('targetPlayer',targetPlayer);

        this.player = new ReactiveDictionary(targetPlayer);

        Session.set('currentPlayer',targetPlayer._id);

        this.setMyTurn();
    }

    GameSession.prototype.loadGame = function(gameId) {
        console.log('loadGame',gameId);

        var targetGame = Games.find(gameId).fetch()[0];
        console.log('targetGame',targetGame);

        currentGame = targetGame;
        this.game = new ReactiveDictionary(currentGame);

        Session.set('currentGame',currentGame._id);

        this.phase = PHASES[this.game.phase];

        //this.loadActions()
    }

    GameSession.prototype.loadActions = function(actions) {
        console.log('loadActions');
        this.actions = new ReactiveList(actions);
    }


    return GameSession;
})();

