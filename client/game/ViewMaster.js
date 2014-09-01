/**
 * Created by michaelgarrido on 9/1/14.
 */
ViewMaster = {





    init: function( ){



    },

    activateUI: function(){

        uiManager = new PRIZM.UIManager( factory, "hitarea" );
        uiManager.bindStageTarget('hand');

        boxTgt = uiManager.addBoxTarget(0,0,1200,1200,'hand');
        boxTgt.setBehavior( 'tap', null, null, function( event ){
            console.log('box tap stop',event);
        });
        boxTgt.setBehavior( 'pan',
            function( event ){
                console.log('box pan start',event);
            },
            function( event ){
                console.log('box pan update',event);
                //b1.place( b1.x+event.deltaX, b1.y+event.deltaY );
                b1.place( event.center.x, event.center.y, 0 );
            },
            function( event ){
                console.log('box pan stop',event);
            });

        boxTgt.activate();

    }

}