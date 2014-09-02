/**
 * Created by dodeca on 8/5/14.
 */

// Server startup

Meteor.startup(function () {

    Nodes = new Meteor.Collection('nodes');

    Meteor.publish('nodes', function(){
        return Nodes.find();
    });

    Meteor.methods({
        setupGameWorld: function(){

            console.log('server setupGameWorld');
        },
        insertNode: function( nodeId, fields ){

            return Nodes.insert( fields );
        },
        updateNode: function( nodeId, fields ){

            Nodes.update( nodeId, fields );
        }
    })

});
