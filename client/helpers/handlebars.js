/* ---------------------------------------------------- +/

## Handlebars Helpers ##

Custom Handlebars helpers.

/+ ---------------------------------------------------- */

Handlebars.registerHelper('myHelper', function(myArgument){
  return "Hello, " + myArgument;
});

Template.gameItem.events = {

    "click a.loadGame": function(event,template){
        console.log(event);
        console.log(template);
        //console.log(GameSession.data._id);

        GS.loadGame(template.data._id);
    }
}

Template.playerItem.events = {

    "click a.setPlayer": function(event,template){
        console.log(event);
        console.log(template);
        //console.log(GameSession.data._id);

        GS.setPlayer(template.data._id);
    }
}

Template.playerActions.events = {

    "click button#rollDice": function(){
        GS.performAction('roll');
    },

    "click button#advancePhase": function(){
        GS.advancePhase();
    },

    "click button#endTurn": function(){
        GS.advanceTurn();
    }
}

Template.turnSummary.helpers({
   isMyTurn: function(data){
       console.log('isMyTurn',data);

       return true;
   }
});