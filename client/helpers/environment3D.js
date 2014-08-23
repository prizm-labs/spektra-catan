/**
 * Created by michaelgarrido on 8/22/14.
 */
var BABYLON = Babylon;

Environment3D = Environment;

function Environment(){
    this.fpsLabel = null;
    this.engine = null;
    this.canvas = null;
    this.contexts2D = {};
    this.willRenderContext2D = true;
}

Environment.prototype.setFpsLabel = function(id) {
    this.fpsLabel = document.getElementById(id);
};

Environment.prototype.setCanvas = function(id) {
    this.canvas = document.getElementById(id);
};

Environment.prototype.setContext2D = function(key,context) {
  this.contexts2D[key] = context;
};

Environment.prototype.init = function () {

    this.engine = new Babylon.Engine(this.canvas, true);

    var scene = new Babylon.Scene(this.engine);
    //var scene = createScene();

    this.preload(scene);
    //babylonRender(scene);
};

Environment.prototype.preload = function(scene) {
    var self = this;

    BABYLON.SceneLoader.ImportMesh(null, "models/", "models.babylon", scene, function (newMeshes, particleSystems) {

        console.log('new meshes:',newMeshes);

        scene = self.createScene(scene,newMeshes,self.contexts2D['board']);
        self.render(scene);
    });
};

Environment.prototype.render = function(scene){
    var self = this;
    this.engine.runRenderLoop(function () {
        scene.render();

        self.fpsLabel.innerHTML = BABYLON.Tools.GetFps().toFixed() + " fps";
    });

};

Environment.prototype.createScene = function(scene, imports, context2D) {
    var self = this;

    var meshes = [];

    var city, settlement, road;
    var scaleFactor = 25;

    _.each(imports,function(mesh){

        var entity = mesh;
        entity.material = new Babylon.StandardMaterial("default", scene);
        entity.scaling.x =entity.scaling.x*scaleFactor;
        entity.scaling.y =entity.scaling.y*scaleFactor;
        entity.scaling.z =entity.scaling.z*scaleFactor;

        meshes.push(entity);
    });

    console.log(meshes);

    meshes[0].position.x = 50;
    meshes[1].position.x = 150;
    meshes[2].position.x = 250;

    var camera = new Babylon.ArcRotateCamera("Camera", 0, 0, 10, new Babylon.Vector3(0, 0, 0), scene);
    //var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 0, 0), scene);
    camera.setPosition(new BABYLON.Vector3(0, ARENA.size.height, -1));
    camera.attachControl(this.canvas);


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



    // TEST card
    var card = createCard(ENTITIES.card.size,{x:0,y:75,z:0},scene);



    var cubeWidth = 35;

    // Boxes
//        for (var i=1;i<10;i++) {
//            var redBox = Babylon.Mesh.CreateBox("red", cubeWidth, scene);
//            var redMat = new Babylon.StandardMaterial("ground", scene);
//            redMat.diffuseColor = new Babylon.Color3(0.4, 0.4, 0.4);
//            redMat.specularColor = new Babylon.Color3(0.4, 0.4, 0.4);
//            redMat.emissiveColor = Babylon.Color3.Red();
//            redBox.material = redMat;
//            redBox.position.x -= 100*i;
//
//            var greenBox = Babylon.Mesh.CreateBox("green", cubeWidth, scene);
//            var greenMat = new Babylon.StandardMaterial("ground", scene);
//            greenMat.diffuseColor = new Babylon.Color3(0.4, 0.4, 0.4);
//            greenMat.specularColor = new Babylon.Color3(0.4, 0.4, 0.4);
//            greenMat.emissiveColor = Babylon.Color3.Green();
//            greenBox.material = greenMat;
//            greenBox.position.z -= 100*i;
//
//            var blueBox = Babylon.Mesh.CreateBox("blue", cubeWidth, scene);
//            var blueMat = new Babylon.StandardMaterial("ground", scene);
//            blueMat.diffuseColor = new Babylon.Color3(0.4, 0.4, 0.4);
//            blueMat.specularColor = new Babylon.Color3(0.4, 0.4, 0.4);
//            blueMat.emissiveColor = Babylon.Color3.Blue();
//            blueBox.material = blueMat;
//            blueBox.position.x += 100*i;
//        }



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

        card.root.rotation.x += 0.01;
    }

    scene.registerBeforeRender(function () {

        runAnimations();


        // Check if Phaser 2D canvases are rendered before drawing to plane
        if (context2D.context) {
            self.willRenderContext2D = backgroundTexture.drawCanvas(context2D.canvas, ARENA.size.length, ARENA.size.width, true);
        }

    });

    return scene;
};

function createCard(size,position,scene) {

    var card = {};

//        size.width = size.width/2;
//        size.height = size.height/2;

    // Parent
    card.root = Babylon.Mesh.CreateSphere("sphere", 1, 1, scene);
    var r = card.root;
    r.isVisible = false;
    r.position.y = position.y;
    r.position.x = position.x;
    r.position.z = position.z;

    // Back
    card.back = Babylon.Mesh.CreatePlane("card", size.width, scene, false);
    var b = card.back;
    b.material = new Babylon.StandardMaterial("card", scene);
    b.material.diffuseColor = new Babylon.Color3(0.1, 0.1, 0.1);
    b.material.specularColor = new Babylon.Color3(0.1, 0.1, 0.1);

    b.material.diffuseTexture = new BABYLON.Texture("/img/resource-back.png", scene);
    b.material.diffuseTexture.hasAlpha = true;
    b.material.backFaceCulling = true;

    b.scaling.y = size.height/size.width;
    b.position.z = 2;
    b.position.y = 0;

    // Front
    card.front = Babylon.Mesh.CreatePlane("card", size.width, scene, false);
    var f = card.front;
    f.material = new Babylon.StandardMaterial("card", scene);
    f.material.diffuseColor = new Babylon.Color3(0.1, 0.1, 0.1);
    f.material.specularColor = new Babylon.Color3(0.1, 0.1, 0.1);

    f.material.diffuseTexture = new BABYLON.Texture("/img/resource-ore.png", scene);
    f.material.diffuseTexture.hasAlpha = true;
    f.material.backFaceCulling = true;

    f.scaling.y = size.height/size.width;
    f.position.z = 0;
    f.position.y = 0;
    f.rotation.y = Math.PI;

    // Hierarchy
    card.back.parent = card.root;
    card.front.parent = card.root;

    r.scaling.x = r.scaling.x*0.5;
    r.scaling.y = r.scaling.y*0.5;
    r.scaling.z = r.scaling.z*0.5;

    return card;
}


