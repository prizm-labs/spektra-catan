/* ---------------------------------------------------- +/

## Fixtures ##

Fill in the app with dummy data if database is empty.

/+ ---------------------------------------------------- */

// Fixture data 
if (Items.find().count() === 0) {
 
  Items.insert({
    title: "Eridanus",
    body: "Eridanus is a constellation. It is represented as a river; its name is the Ancient Greek name for the Po River."
  });

  Items.insert({
    title: "Cassiopeia",
    body: "Cassiopeia is a constellation in the northern sky, named after the vain queen Cassiopeia in Greek mythology, who boasted about her unrivalled beauty."
  });

  Items.insert({
    title: "Scorpius",
    body: "Scorpius, sometimes known as Scorpio, is one of the constellations of the zodiac."
  });

}

var players = JSON.parse(Assets.getText('seed.json')).players;

//console.log(players);

if (Players.find().count() === 0) {

    var players = JSON.parse(Assets.getText('seed.json')).players;

    //console.log(players);
    //console.log(_);
    _.each(players,function(player){
        Players.insert(player);
    })

}


if (Games.find().count() === 0) {

    var games = JSON.parse(Assets.getText('seed.json')).games;

    //console.log(players);
    //console.log(_);
    _.each(games,function(game){

        _.each(Players.find().fetch(),function(player){
            game.players.push(player._id);
        })

        Games.insert(game);
    })

}