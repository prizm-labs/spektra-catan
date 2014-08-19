/**
 * Created by dodeca on 8/7/14.
 */
Babylon.DynamicTexture.prototype.drawCanvas = function (canvas, x, y, clearColor, invertY) {
    var size = this.getSize();
//    if (clearColor) {
//        this._context.fillStyle = clearColor;
//        this._context.fillRect(0, 0, size.width, size.height);
//    }

    //TODO center embedded canvas
    this._context.clearRect(0,0,800,600);
    //http://stackoverflow.com/questions/4405336/how-to-copy-contents-of-one-canvas-to-another-canvas-locally
    this._context.drawImage(canvas,0,0,800,600);

    this.update(invertY);
};

Template.board.rendered = function(){
    console.log('board rendered');





//    Crafty.init(500,350, document.getElementById('game'));
//    Crafty.e('2D, Canvas, Color').attr({x: 0, y: 0, w: 100, h: 100}).color('#F00');

    //http://docs.phaser.io/Phaser.Game.html
    var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser', { preload: preload, create: create, update: update }, true);
    var sprite;

    var engine,canvas;

    function preload () {
        game.load.image('logo', 'phaser.png');
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
        });

    }

    function update() {

        sprite.angle += 1;
    }



    function createScene() {

        var scene = new Babylon.Scene(engine);
        var camera = new Babylon.ArcRotateCamera("Camera", 0, 0, 10, new Babylon.Vector3(0, 0, 0), scene);
        camera.setPosition(new Babylon.Vector3(20, 200, 400));
        camera.attachControl(canvas);


        camera.lowerBetaLimit = 0.1;
        camera.upperBetaLimit = (Math.PI / 2) * 0.99;
        camera.lowerRadiusLimit = 150;

        scene.clearColor = new Babylon.Color3(0, 0, 0);

        var light1 = new Babylon.PointLight("omni", new Babylon.Vector3(0, 50, 0), scene);
        var light2 = new Babylon.PointLight("omni", new Babylon.Vector3(0, 50, 0), scene);
        var light3 = new Babylon.PointLight("omni", new Babylon.Vector3(0, 50, 0), scene);

        light1.diffuse = Babylon.Color3.Red();
        light2.diffuse = Babylon.Color3.Green();
        light3.diffuse = Babylon.Color3.Blue();

        // Define states
        light1.state = "on";
        light2.state = "on";
        light3.state = "on";

        // Ground
//        var ground = Babylon.Mesh.CreateGround("ground", 1000, 1000, 1, scene, false);
//        var groundMaterial = new Babylon.StandardMaterial("ground", scene);
//        groundMaterial.specularColor = Babylon.Color3.Black();
//        ground.material = groundMaterial;

        // Dynamic Ground
        var ground = Babylon.Mesh.CreateGround("ground", 1000, 1000, 1, scene, false);
        var groundMaterial = new Babylon.StandardMaterial("ground", scene);
        //groundMaterial.specularColor = Babylon.Color3.Black();
        ground.material = groundMaterial;

        var backgroundTexture = new Babylon.DynamicTexture("dynamic texture", 512, scene, true);
        ground.material.diffuseTexture = backgroundTexture;
        ground.material.specularColor = new Babylon.Color3(0, 0, 0);
        ground.material.backFaceCulling = false;


        var playgroundSize = 100;
// Background
        var background = Babylon.Mesh.CreatePlane("background", playgroundSize, scene, false);
        background.material = new Babylon.StandardMaterial("background", scene);
        background.scaling.y = 0.5;
        background.position.z = playgroundSize / 2 - 0.5;
        background.position.y = playgroundSize / 4;

        background.material.diffuseTexture = backgroundTexture;
        background.material.specularColor = new Babylon.Color3(0, 0, 0);
        background.material.backFaceCulling = false;


        // Boxes
        var redBox = Babylon.Mesh.CreateBox("red", 20, scene);
        var redMat = new Babylon.StandardMaterial("ground", scene);
        redMat.diffuseColor = new Babylon.Color3(0.4, 0.4, 0.4);
        redMat.specularColor = new Babylon.Color3(0.4, 0.4, 0.4);
        redMat.emissiveColor = Babylon.Color3.Red();
        redBox.material = redMat;
        redBox.position.x -= 100;

        var greenBox = Babylon.Mesh.CreateBox("green", 20, scene);
        var greenMat = new Babylon.StandardMaterial("ground", scene);
        greenMat.diffuseColor = new Babylon.Color3(0.4, 0.4, 0.4);
        greenMat.specularColor = new Babylon.Color3(0.4, 0.4, 0.4);
        greenMat.emissiveColor = Babylon.Color3.Green();
        greenBox.material = greenMat;
        greenBox.position.z -= 100;

        var blueBox = Babylon.Mesh.CreateBox("blue", 20, scene);
        var blueMat = new Babylon.StandardMaterial("ground", scene);
        blueMat.diffuseColor = new Babylon.Color3(0.4, 0.4, 0.4);
        blueMat.specularColor = new Babylon.Color3(0.4, 0.4, 0.4);
        blueMat.emissiveColor = Babylon.Color3.Blue();
        blueBox.material = blueMat;
        blueBox.position.x += 100;

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

        // Animations
        var alpha = 0;

        scene.registerBeforeRender(function () {
            donut.position.x = 100 * Math.cos(alpha);
            donut.position.y = 5;
            donut.position.z = 100 * Math.sin(alpha);
            alpha += 0.01;


            backgroundTexture.drawText("Eternalcoding", null, 80, "bold 70px Helvetica", "white", "#555555");
            backgroundTexture.drawText("- browsers statistics -", null, 250, "35px Helvetica", "white", null);

            if (game.context) {
                //console.log(game.context);
                backgroundTexture.drawCanvas(game.canvas, null, null, null, null);
            }

        });

        return scene;
    }
}

