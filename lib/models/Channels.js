/**
 * Created by michaelgarrido on 9/1/14.
 */
Channels = new Meteor.Collection("channels");

// Allow/Deny

Channels.allow({
//    insert: function(userId, doc){
//        return can.createItem(userId);
//    },
    update:  function(){
        return true;
    }
//    remove:  function(userId, doc){
//        return can.removeItem(userId, doc);
//    }
});

// Methods

//    createItem: function(item){
//        if(can.createItem(Meteor.user()))
//            Items.insert(item);
//    },
//    removeItem: function(item){
//        if(can.removeItem(Meteor.user(), item)){
//            Items.remove(item._id);
//        }else{
//            throw new Meteor.Error(403, 'You do not have the rights to delete this item.')
//        }
//    }