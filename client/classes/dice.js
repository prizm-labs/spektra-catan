/**
 * Created by dodeca on 8/5/14.
 */
DiceRoller = (function(){


    function DiceRoller(){
        this.dice = [];
        this.history = [];
    }



    DiceRoller.prototype.addDie = function(sides){
        console.log('addDie',this);
        var die = {
            sides: sides
        };

        this.dice.push(die);
        console.log('new dice',this.dice);
    }

    DiceRoller.prototype.rollDice = function(shouldSumResult){
        var self = this;
        var result = [];
        var sum = 0;

        _.each(self.dice,function(die){

            var index = Math.floor(die.sides.length*Math.random());
            var side = die.sides[index];

            result.push(side);

            if (shouldSumResult) sum+=side;
        });

        this.history.push(result);

        if (shouldSumResult){
            return {
                dice: result,
                sum: sum
            }
        } else {
            return {
                dice: result
            };
        }

    }

    return DiceRoller;
})();


