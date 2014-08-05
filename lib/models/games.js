/**
 * Created by dodeca on 8/4/14.
 */
Games = new Meteor.Collection('games');


// Allow/Deny

Games.allow({
    insert: function(userId, doc){
        return can.createItem(userId);
    },
    update:  function(userId, doc, fieldNames, modifier){
        return true;
        //return can.editItem(userId, doc);
    },
    remove:  function(userId, doc){
        return can.removeItem(userId, doc);
    }
});