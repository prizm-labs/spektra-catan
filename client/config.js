/**
 * Created by michaelgarrido on 8/23/14.
 */
//4 player setup
//---------------------------------------------------

WORLDS = { //size, position of game world & objects
    MACRO: { //console
        canvas2D: [1080,1080],
        canvas3D: [1200,1200]
    },
    MICRO: { //mobile

    }
};

VIEWS = { //screen dimension profiles
    MACRO: {
        "1900x1200": {

        },
        "1920x1080": {

        },
        "1600x1200": {

        }
    },
    MICRO: {
        "960x640": { //iPhone5

        },
        "1024x768": { //iPadMini

        },
        "2048x1536": { //iPad

        }
    }
};

CONTEXTS = {
    D2: {

    },
    D3: {

    }
};



VARIANTS = {
    "threeToFourPlayers": {
        rows: [3, 4, 5, 4, 3],
        terrainMap: {
            desert: 1,
            hills: 3,
            mountains: 3,
            fields: 4,
            pasture: 4,
            forest: 4
        },
        edgeMap: [
            {i:0,e:[4,5,0]},
            {i:1,e:[5,0]},
            {i:2,e:[5,0,1]},
            {i:6,e:[0,1]},
            {i:11,e:[0,1,2]},
            {i:15,e:[1,2]},
            {i:18,e:[1,2,3]},
            {i:17,e:[2,3]},
            {i:16,e:[2,3,4]},
            {i:12,e:[3,4]},
            {i:7,e:[3,4,5]},
            {i:3,e:[4,5]}
        ],
        numberTokens: [5,2,6,3,8,10,9,12,11,4,8,10,9,4,5,6,3,11],
        portList: ['brick','sheep','ore','wheat','wood','any','any','any','any'],
        harborEdgeIndex: [0,3,6,10,13,16,20,23,26],
        zones: {
            board: {
                dimensions: {
                    size: {
                        x: 1080,
                        y: 1,
                        z: 1080
                    },
                    gridSpacing: {x:91,y:105} // half dimensions of terrain sprite
                }


            }
        }
    },
    "fiveToSixPlayers": {
        numberTokens: [2,5,4,6,3,9,8,11,11,10,6,3,8,4,8,10,11,12,10,5,4,9,5,9,12,3,2,6]
    }
};