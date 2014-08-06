/* ---------------------------------------------------- +/

## Client Router ##

Client-side Router.

/+ ---------------------------------------------------- */

// Config

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

// Filters

var filters = {

  myFilter: function () {
    // do something
  },

  isLoggedIn: function() {
    if (!(Meteor.loggingIn() || Meteor.user())) {
      alert('Please Log In First.')
      this.stop();
    }
  }

}

Router.onBeforeAction(filters.myFilter, {only: ['items']});

// Routes

Router.map(function() {

    // Pages

    this.route('homepage', {
        path: '/',
        waitOn: function(){
            return Meteor.subscribe('allGames');
        },
        action: function () {
            if (this.ready()) {

                this.render();

                var currentGame = Session.get('currentGame') || null;

                if (currentGame){
                    GS.loadGame(currentGame);
                } else {
                    console.log("No game set");
                }

                var currentPlayer = Session.get('currentPlayer') || null;

                if (currentPlayer){
                    GS.setPlayer(currentPlayer);
                } else {
                    console.log("No player set");
                }

            }
        },
        data: function(){
            return {
                game: GS.game,
                player: GS.player,

                games: Games.find().fetch(),
                players: Players.find().fetch()
            }
        }
    });

  // Items

  this.route('items', {
    waitOn: function () {
      return Meteor.subscribe('allItems');
    },
    data: function () {
      return {
        items: Items.find()
      }
    }
  });

  this.route('item', {
    path: '/items/:_id',
    waitOn: function () {
      return Meteor.subscribe('singleItem', this.params._id);
    },
    data: function () {
      return {
        item: Items.findOne(this.params._id)
      }
    }
  });




  this.route('content');

  // Users

  this.route('login');

  this.route('signup');

  this.route('forgot');

});
