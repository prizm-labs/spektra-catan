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
        GS.advancePhase();
    },

    "click button#advancePhase": function(){
        GS.advancePhase();
    },

    "click button#endTurn": function(){
        GS.advanceTurn();
    }
}

Template.playerActions.helpers({
    getActions: function(data){
        console.log('getActions',data);

        var key = null;

        switch (data){
            case 0:
                key = 'rollAction';
                break;
            case 1:
                key = 'resourceProduction';
                break;
            case 2:
                key = 'buildAction';
                break;

        }

        return { key: key };
    }
});