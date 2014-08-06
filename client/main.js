/* ---------------------------------------------------- +/

## Main ##

Global client-side code. Loads last. 

/+ ---------------------------------------------------- */

//

GameSession.init = function(){

    GameSession.diceRoller = new DiceRoller();

    GameSession.diceRoller.addDie(6);
    GameSession.diceRoller.addDie(6);

}


GameSession.init();