// root fsm

PhaseMaster = {

    init: function(){





    }

};

rootFsm = new PRIZM.StateMachine.Fsm({
//    applicationOffline: function() {
//        var offline = false;
//        // checks window.navigator.online and more, sets the offline value
//        return offline;
//    },
//
//    verifyState: function( payload ) {
//        if( applicationOffline() && this.state !== "offline" ) {
//            this.offlineMarkerTime = new Date();
//            this.transition("offline");
//            return false;
//        }
//        else if ( !applicationOffline() && this.state === "offline" ) {
//            this.transition( "online" );
//            return false;
//        }
//        return true;
//    },

    initialState: "offline",

    states : {
        "openTurn": {
//            _onEnter: function() {
//                this.handle("sync.customer");
//            },
//
//            "save.customer" : function( payload ) {
//                if( this.verifyState() ) {
//                    //storage.saveToRemote( payload );
//                }
//            },
//
//            "sync.customer" : function() {
//
//                    var unsynced = false;
//                    //var unsynced = storage.getFromLocal( { startTime: this.offlineMarkerTime } );
//                    // Big assumption here!  In the real world,
//                    // we'd batch this sync in reasonable chunks.
//                    //storage.saveBatchToRemote( unsynced );
//                    this.emit( "CustomerSyncComplete", { customers: unsynced } );
//
//            }
        },

        "pendingTurn": {
//            "save.customer" : function( payload ) {
//                if( verifyState() ) {
//                    //storage.saveToLocal( payload );
//                }
//            }
        }
    }
});

//rootFsm.on( "CustomerSyncComplete", function ( data ) {
//    console.log('CustomerSyncComplete', data);
//} );