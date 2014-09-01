/**
 * Created by michaelgarrido on 8/23/14.
 */
manifest3D = [
    ['road', 'models/road-model.js', null, 15],
    ['settlement','models/settlement-model.js',null, 15],
    ['city','models/city-model.js',null, 15]
];

manifest2D = [
    ["robber","robber.png"],
    ["numberToken",{
        2: "count-2.png",
        3: "count-3.png",
        4: "count-4.png",
        5: "count-5.png",
        6: "count-6.png",
        7: "count-7.png",
        8: "count-8.png",
        9: "count-9.png",
        10: "count-10.png",
        11: "count-11.png",
        12: "count-12.png"
    }],
    ["terrain",{
        "mountains": "terrain-mountains.png",
        "hills": "terrain-hills.png",
        "forest": "terrain-forest.png",
        "pasture": "terrain-pasture.png",
        "desert": "terrain-desert.png",
        "fields": "terrain-fields.png"
    }],
    ["resourceCard",{
        "back": "resource-back.png",
        "ore": "resource-ore.png",
        "sheep": "resource-sheep.png",
        "grain": "resource-wheat.png",
        "lumber": "resource-wood.png",
        "brick": "resource-brick.png"
    }],
    ["developmentCard",{
        "back": "dev-back.png",
        "monopoly": "dev-monopoly.png",
        "palace": "dev-palace.png",
        "knight": "dev-knight.png",
        "yearOfPlenty": "dev-plenty.png",
        "roadBuilding": "dev-road.png",
        "market": "dev-market.png",
        "library": "dev-library.png",
        "university": "dev-university.png"
    }],
    ["port",{
        "grain": "port-grain.png",
        "lumber": "port-lumber.png",
        "brick": "port-brick.png",
        "ore": "port-ore.png",
        "wool": "port-wool.png",
        "any": "port-any.png"
    }]
];

soundManifest = {
    files: [
        [ 'brick', 'sounds/brick', ['wav','m4a'] ],
        [ 'city', 'sounds/city', ['wav','m4a'] ],
        [ 'dice', 'sounds/dice', ['wav','m4a'] ],
        [ 'ore', 'sounds/ore', ['wav','m4a']],
        [ 'settlement', 'sounds/settlement', ['wav','m4a'] ],
        [ 'sheep', 'sounds/sheep', ['wav','m4a'] ],
        [ 'steal-card', 'sounds/steal-card', ['wav','m4a'] ],
        [ 'wheat', 'sounds/wheat', ['wav','m4a'] ],
        [ 'wood', 'sounds/wood', ['wav','m4a'] ],
        [ 'background', 'sounds/background', ['wav','m4a'] ]
        //[ '', '', '' ],
    ]
};

SYSTEM = {
    paths: {
        sprites: 'sprites/',
        images: 'img/',
        models: 'models/'
    }
};

MANIFEST = {
    D2: {
        spritesheets: [
            { name: 'terrainSprite', path: 'terrain-sprite.png', width: 182, height: 210, frames: 6 },
            { name: 'portSprite', path: 'port-sprite.png'},
            { name: 'resourceCardSprite', path: 'resource-sprite.png'},
            { name: 'developmentCardSprite', path: 'development-sprite.png'},
            { name: 'numberToken', path: 'counter-sprite.png'}

        ]
    },
    D3: {
        models: [
            "models.babylon"
        ]
    }

};

ATLAS = {
    entities: {

        // BOARD
        terrain: {
            size: { x:182, y:210 },
            sprite: 'terrainSprite',
            animations: {
                "fields": [0],
                "forest": [1],
                "desert": [2],
                "hills": [3],
                "pasture": [4],
                "mountains": [5]
            }

        },
        numberToken: {
            size: { x:78, y:76 },
            sprite: 'numberToken'
        },
        port: {
            size: { x:104, y:90 },
            sprite: 'portSprite'
        },

        // MARKERS
        location: {
            size: { x:42, y:42 },
            sprite: 'location-valid.png'
        },
        playerMarker: {
            size: { x:96, y:96 },
            sprite: 'player-marker.png'
        },

        // PIECES
        road: {
            size: { x:20, y:85 },
            sprite: 'roadSprite.png',
            model: 'road'
        },
        city: {
            size: { x:44, y:52 },
            sprite: 'citySprite.png',
            model: 'city'
        },
        settlement: {
            size: { x:30, y:37 },
            sprite: 'settlementSprite.png',
            model: 'settlement'
        },
        robber: {
            size: { x:49, y:102 },
            sprite: 'robber.png'
        },

        // CARDS
        resourceCard: {
            size: { x:90, y:133 },
            sprite: 'resourceCardSprite'
        },
        developmentCard: {
            size: { x:90, y:133 },
            sprite: 'developmentCardSprite'
        },
        badge: {
            size: { x:90, y:133 },
            sprite: 'badge-sprite.png'
        }

    }
};