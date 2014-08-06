/**
 * Created by dodeca on 8/5/14.
 */
DiceRoller = function(){};

var dice = [];
var dieTemplate = {
    sides: []
}

DiceRoller.history = [];

DiceRoller.addDie = function(sides){

    var die = new dieTemplate;
    die.sides = sides;

    dice.push(die);
}

DiceRoller.rollDice = function(){

    var result = [];

    _.each(dice,function(die){

        var index = Math.floor(die.sides.length*Math.random());
        result.push(dice[index]);
    });

    DiceRoller.history.push(result);

    return result;
}

