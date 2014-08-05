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

        GameSession.loadGame(template.data._id);
    }
}

Template.playerItem.events = {

    "click a.setPlayer": function(event,template){
        console.log(event);
        console.log(template);
        //console.log(GameSession.data._id);

        GameSession.setPlayer(template.data._id);
    }
}