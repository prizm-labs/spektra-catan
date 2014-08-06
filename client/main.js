/* ---------------------------------------------------- +/

## Main ##

Global client-side code. Loads last. 

/+ ---------------------------------------------------- */

//
GS = new GameSession();

GS.init = function(){

    GS.createDiceRoller();

    //setup 2 D6 dice
    GS.diceRoller.addDie([1,2,3,4,5,6]);
    GS.diceRoller.addDie([1,2,3,4,5,6]);
}


GS.init();