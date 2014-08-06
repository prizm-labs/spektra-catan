/**
 * Created by dodeca on 8/5/14.
 */
Actions = new Meteor.Collection('actions');

// Allow/Deny

Actions.allow({
    insert: function(userId, doc){
        return true;
        //return can.createItem(userId);
    },
    update:  function(userId, doc, fieldNames, modifier){
        return true;
        //return can.editItem(userId, doc);
    },
    remove:  function(userId, doc){
        return can.removeItem(userId, doc);
    }
});