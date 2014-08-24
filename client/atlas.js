/**
 * Created by michaelgarrido on 8/23/14.
 */


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