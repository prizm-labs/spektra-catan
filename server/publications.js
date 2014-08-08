/* ---------------------------------------------------- +/

## Publications ##

All publications-related code. 

/+ ---------------------------------------------------- */

// Publish all items

Meteor.publish('allItems', function() {
  return Items.find();
});

// Publish a single item

Meteor.publish('singleItem', function(id) {
  return Items.find(id);
});


Meteor.publish('allPlayers', function() {
    return Players.find();
});


Meteor.publish('allGames', function() {
    return Games.find();
});


Meteor.publish('gameActions', function(gameId) {

    console.log()
    //return Actions.find();
    return Actions.find({game:gameId});
});