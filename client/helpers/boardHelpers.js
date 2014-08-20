/**
 * Created by dodeca on 8/7/14.
 */

ARENA = {}

ARENA.size = {
    width: 1200,
    length: 1200,
    height: 1400
}

ENTITIES = {
    card: {
        size: {
            width: 91,
            height: 135
        }
    }
}

//ARENA.size = {
//    width: 300,
//    length: 300,
//    height: 1000
//}

var BABYLON = Babylon;

var willDrawBoardLayer = true;

Babylon.DynamicTexture.prototype.drawCanvas = function (canvas, width, height, clearColor, invertY) {

    if (!willDrawBoardLayer) return;
    else willDrawBoardLayer = false;

    var size = this.getSize();

//    console.log('texture size',size);
//    console.log('canvas size',this._canvas);
//    if (clearColor) {
//        this._context.fillStyle = clearColor;
//        this._context.fillRect(0, 0, size.width, size.height);
//    }

    //TODO center embedded canvas
    //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D#drawImage()

    this._context.clearRect(0,0,size.width,size.height);

    //http://stackoverflow.com/questions/4405336/how-to-copy-contents-of-one-canvas-to-another-canvas-locally

    //this._context.drawImage(canvas,0,0);
    //this._context.drawImage(canvas,0,0,600,600);
    //this._context.drawImage(canvas,0,0,ARENA.size.length,ARENA.size.width);

    this._context.drawImage(canvas,
        0,0,
        height,width,
        0,0,
        size.width,size.height);


    this.update(invertY);
};

Template.board.rendered = function(){
    console.log('board rendered');





//    Crafty.init(500,350, document.getElementById('game'));
//    Crafty.e('2D, Canvas, Color').attr({x: 0, y: 0, w: 100, h: 100}).color('#F00');

    //http://docs.phaser.io/Phaser.Game.html
    var game = new Phaser.Game(ARENA.size.length, ARENA.size.width, Phaser.CANVAS, 'phaser', { preload: preload, create: create, update: update }, true);
    var sprite;

    var engine,canvas;

    var fpsLabel = document.getElementById("fpsLabel");

    function preload () {
        game.load.image('logo', 'img/terrain-desert.png');
    }

    function create () {
        sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
        sprite.anchor.setTo(0.5, 0.5);
        console.log(game.context);
        console.log(game.canvas);



        canvas = document.getElementById("babylon");
        engine = new Babylon.Engine(canvas, true);

        var scene = createScene();

        engine.runRenderLoop(function () {
            scene.render();
            fpsLabel.innerHTML = BABYLON.Tools.GetFps().toFixed() + " fps";
        });

    }

    function update() {

        //sprite.angle += 1;
    }



    function createScene() {



        var scene = new Babylon.Scene(engine);
        var camera = new Babylon.ArcRotateCamera("Camera", 0, 0, 10, new Babylon.Vector3(0, 0, 0), scene);
        //var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 0, 0), scene);
        camera.setPosition(new BABYLON.Vector3(0, ARENA.size.height, -1));
        camera.attachControl(canvas);


        camera.lowerBetaLimit = 0.1;
        camera.upperBetaLimit = (Math.PI / 2) * 0.99;
        //camera.lowerRadiusLimit = 150;
        camera.maxZ = 9999;

        scene.clearColor = new BABYLON.Color4(0,0,0,0.0000000000000001);


        // Lights
//        var light1 = new Babylon.PointLight("omni", new Babylon.Vector3(0, 150, 0), scene);
//        var light2 = new Babylon.PointLight("omni", new Babylon.Vector3(0, 150, 0), scene);
//        var light3 = new Babylon.PointLight("omni", new Babylon.Vector3(0, 150, 0), scene);
//
//        light1.diffuse = Babylon.Color3.Red();
//        light2.diffuse = Babylon.Color3.Green();
//        light3.diffuse = Babylon.Color3.Blue();
//
//        // Define states
//        light1.state = "on";
//        light2.state = "on";
//        light3.state = "on";

        var light0 = new Babylon.HemisphericLight("Hemi0", new Babylon.Vector3(0, 1, 0), scene);
        light0.diffuse = new Babylon.Color4(1, 1, 1, 0.15);
        light0.specular = new Babylon.Color4(1, 1, 1, 0.15);
        light0.groundColor = new Babylon.Color3(0, 0, 0);

//        var light1 = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(0, -100, 0), scene);
//        light1.diffuse = new BABYLON.Color3(1, 1, 1);
//        light1.specular = new BABYLON.Color3(1, 1, 1);

        // Ground
//        var ground = Babylon.Mesh.CreateGround("ground", 1000, 1000, 1, scene, false);
//        var groundMaterial = new Babylon.StandardMaterial("ground", scene);
//        groundMaterial.specularColor = Babylon.Color3.Black();
//        ground.material = groundMaterial;

        // Dynamic Ground
        var ground = Babylon.Mesh.CreateGround("ground", ARENA.size.length/2,ARENA.size.width/2, 1, scene, false);
        var groundMaterial = new Babylon.StandardMaterial("ground", scene);
        //groundMaterial.specularColor = Babylon.Color3.Black();
        ground.material = groundMaterial;

        var backgroundTexture = new Babylon.DynamicTexture("boardLayer", {
            width: ARENA.size.length,
            height: ARENA.size.width
        }, scene, false);



        ground.material.diffuseTexture = backgroundTexture;
        ground.material.diffuseTexture.hasAlpha = true;
//        ground.material.diffuseTexture.uOffset = 0;
//        ground.material.diffuseTexture.vOffset = 0;
//        ground.material.diffuseTexture.uScale = 2;
//        ground.material.diffuseTexture.vSacle = 2;

        ground.material.specularColor = new Babylon.Color3(0, 0, 0);
        ground.material.backFaceCulling = false;


        var size = ENTITIES.card.size;
        // Card
        var card = Babylon.Mesh.CreatePlane("card", size.width, scene, false);
        card.material = new Babylon.StandardMaterial("card", scene);
        card.material.diffuseColor = new Babylon.Color3(0.1, 0.1, 0.1);
        card.material.specularColor = new Babylon.Color3(0.1, 0.1, 0.1);

        card.material.diffuseTexture = new BABYLON.Texture("/img/resource-back.png", scene);
        card.material.diffuseTexture.hasAlpha = true;
        card.material.backFaceCulling = true;

        card.scaling.y = size.height/size.width;
        card.position.z = 2;
        card.position.y = 75;

        //https://github.com/BabylonJS/Babylon.js/wiki/How-to-handle-rotations-and-translations
        //card.rotation.x = Math.PI/2;
        //card.rotation = new BABYLON.Vector3(90, 0, 0); // Euler
        //card.rotationQuaternion = new BABYLON.Quaternion(10, 0, 0, 0); // Quaternion



        var cardFront = Babylon.Mesh.CreatePlane("card", size.width, scene, false);
        cardFront.material = new Babylon.StandardMaterial("card", scene);
        cardFront.material.diffuseColor = new Babylon.Color3(0.1, 0.1, 0.1);
        cardFront.material.specularColor = new Babylon.Color3(0.1, 0.1, 0.1);

        cardFront.material.diffuseTexture = new BABYLON.Texture("/img/resource-ore.png", scene);
        cardFront.material.diffuseTexture.hasAlpha = true;
        cardFront.material.backFaceCulling = true;

        cardFront.scaling.y = size.height/size.width;
        cardFront.position.z = 0;
        cardFront.position.y = 75;
        cardFront.rotation.y = Math.PI;



        var cubeWidth = 35;

        // Boxes
        for (var i=1;i<10;i++) {
            var redBox = Babylon.Mesh.CreateBox("red", cubeWidth, scene);
            var redMat = new Babylon.StandardMaterial("ground", scene);
            redMat.diffuseColor = new Babylon.Color3(0.4, 0.4, 0.4);
            redMat.specularColor = new Babylon.Color3(0.4, 0.4, 0.4);
            redMat.emissiveColor = Babylon.Color3.Red();
            redBox.material = redMat;
            redBox.position.x -= 100*i;

            var greenBox = Babylon.Mesh.CreateBox("green", cubeWidth, scene);
            var greenMat = new Babylon.StandardMaterial("ground", scene);
            greenMat.diffuseColor = new Babylon.Color3(0.4, 0.4, 0.4);
            greenMat.specularColor = new Babylon.Color3(0.4, 0.4, 0.4);
            greenMat.emissiveColor = Babylon.Color3.Green();
            greenBox.material = greenMat;
            greenBox.position.z -= 100*i;

            var blueBox = Babylon.Mesh.CreateBox("blue", cubeWidth, scene);
            var blueMat = new Babylon.StandardMaterial("ground", scene);
            blueMat.diffuseColor = new Babylon.Color3(0.4, 0.4, 0.4);
            blueMat.specularColor = new Babylon.Color3(0.4, 0.4, 0.4);
            blueMat.emissiveColor = Babylon.Color3.Blue();
            blueBox.material = blueMat;
            blueBox.position.x += 100*i;
        }



        // Sphere
        var sphere = Babylon.Mesh.CreateSphere("sphere", 16, 20, scene);
        var sphereMat = new Babylon.StandardMaterial("ground", scene);
        sphereMat.diffuseColor = new Babylon.Color3(0.4, 0.4, 0.4);
        sphereMat.specularColor = new Babylon.Color3(0.4, 0.4, 0.4);
        sphereMat.emissiveColor = Babylon.Color3.Purple();
        sphere.material = sphereMat;
        sphere.position.z += 100;

        // Rotating donut
        var donut = Babylon.Mesh.CreateTorus("donut", 20, 8, 16, scene);


        function setupActions() {
            // On pick interpolations
            var prepareButton = function (mesh, color, light) {
                var goToColorAction = new Babylon.InterpolateValueAction(Babylon.ActionManager.OnPickTrigger, light, "diffuse", color, 1000, null, true);

                mesh.actionManager = new Babylon.ActionManager(scene);
                mesh.actionManager.registerAction(
                    new Babylon.InterpolateValueAction(Babylon.ActionManager.OnPickTrigger, light, "diffuse", Babylon.Color3.Black(), 1000))
                    .then(new Babylon.CombineAction(Babylon.ActionManager.NothingTrigger, [ // Then is used to add a child action used alternatively with the root action.
                        goToColorAction,                                                 // First click: root action. Second click: child action. Third click: going back to root action and so on...
                        new Babylon.SetValueAction(Babylon.ActionManager.NothingTrigger, mesh.material, "wireframe", false)
                    ]));
                mesh.actionManager.registerAction(new Babylon.SetValueAction(Babylon.ActionManager.OnPickTrigger, mesh.material, "wireframe", true))
                    .then(new Babylon.DoNothingAction());
                mesh.actionManager.registerAction(new Babylon.SetStateAction(Babylon.ActionManager.OnPickTrigger, light, "off"))
                    .then(new Babylon.SetStateAction(Babylon.ActionManager.OnPickTrigger, light, "on"));
            }

            prepareButton(redBox, Babylon.Color3.Red(), light1);
            prepareButton(greenBox, Babylon.Color3.Green(), light2);
            prepareButton(blueBox, Babylon.Color3.Blue(), light3);

            // Conditions
            sphere.actionManager = new Babylon.ActionManager(scene);
            var condition1 = new Babylon.StateCondition(sphere.actionManager, light1, "off");
            var condition2 = new Babylon.StateCondition(sphere.actionManager, light1, "on");

            sphere.actionManager.registerAction(new Babylon.InterpolateValueAction(Babylon.ActionManager.OnLeftPickTrigger, camera, "alpha", 0, 500, condition1));
            sphere.actionManager.registerAction(new Babylon.InterpolateValueAction(Babylon.ActionManager.OnLeftPickTrigger, camera, "alpha", Math.PI, 500, condition2));

            // Over/Out
            var makeOverOut = function (mesh) {
                mesh.actionManager.registerAction(new Babylon.SetValueAction(Babylon.ActionManager.OnPointerOutTrigger, mesh.material, "emissiveColor", mesh.material.emissiveColor));
                mesh.actionManager.registerAction(new Babylon.SetValueAction(Babylon.ActionManager.OnPointerOverTrigger, mesh.material, "emissiveColor", Babylon.Color3.White()));
                mesh.actionManager.registerAction(new Babylon.InterpolateValueAction(Babylon.ActionManager.OnPointerOutTrigger, mesh, "scaling", new Babylon.Vector3(1, 1, 1), 150));
                mesh.actionManager.registerAction(new Babylon.InterpolateValueAction(Babylon.ActionManager.OnPointerOverTrigger, mesh, "scaling", new Babylon.Vector3(1.1, 1.1, 1.1), 150));
            }

            makeOverOut(redBox);
            makeOverOut(greenBox);
            makeOverOut(blueBox);
            makeOverOut(sphere);

            // scene's actions
            scene.actionManager = new Babylon.ActionManager(scene);

            var rotate = function (mesh) {
                scene.actionManager.registerAction(new Babylon.IncrementValueAction(Babylon.ActionManager.OnEveryFrameTrigger, mesh, "rotation.y", 0.01));
            }

            rotate(redBox);
            rotate(greenBox);
            rotate(blueBox);

            // Intersections
            donut.actionManager = new Babylon.ActionManager(scene);

            donut.actionManager.registerAction(new Babylon.SetValueAction(
                { trigger: Babylon.ActionManager.OnIntersectionEnterTrigger, parameter: sphere },
                donut, "scaling", new Babylon.Vector3(1.2, 1.2, 1.2)));

            donut.actionManager.registerAction(new Babylon.SetValueAction(
                { trigger: Babylon.ActionManager.OnIntersectionExitTrigger, parameter: sphere }
                , donut, "scaling", new Babylon.Vector3(1, 1, 1)));

        }

        // Animations
        var alpha = 0;

        function runAnimations(){
            donut.position.x = 100 * Math.cos(alpha);
            donut.position.y = 5;
            donut.position.z = 100 * Math.sin(alpha);
            alpha += 0.01;

            card.rotation.x += 0.01;
            cardFront.rotation.x -= 0.01;
        }

        scene.registerBeforeRender(function () {

            runAnimations();

            //backgroundTexture.drawText("Eternalcoding", null, 80, "bold 70px Helvetica", "white", "#555555");
            //backgroundTexture.drawText("- browsers statistics -", null, 250, "35px Helvetica", "white", null);

            if (game.context) {
                //console.log(game.context);
                backgroundTexture.drawCanvas(game.canvas, ARENA.size.length, ARENA.size.width, null, null);
            }

        });

        return scene;
    }
}

