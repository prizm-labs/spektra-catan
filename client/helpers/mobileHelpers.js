
Template.handView.rendered = function() {
    console.log('hand view rendered');

    dep = new Deps.Dependency;

    manifest3D = [
        ['road', 'models/road-model.js', null, 0.5],
        ['settlement','models/settlement-model.js',null, 0.5],
        ['city','models/city-model.js',null, 0.5]
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

    ctx2D = new PRIZM.Context2D('handContext', 'canvas', 800, 800);
    ctx2D.init();

    ctx3D = new PRIZM.Context3D('fieldContext', 800, 800);
    ctx3D.init();

    factory = new PRIZM.Factory( ctx2D, ctx3D );
    factory.loadTemplates3D(manifest3D);
    factory.loadTemplates2D( 'atlas/atlas.json', manifest2D );

};