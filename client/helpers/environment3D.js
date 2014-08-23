/**
 * Created by michaelgarrido on 8/22/14.
 */
var BABYLON = Babylon;

Environment3D = Environment;

function Mapping2D(texture,context,width,height){
    this.texture = texture;
    this.context2D = context;
    this.willUpdate = true;
    this.width = width;
    this.height = height;
}

Mapping2D.prototype.update = function(){
    // Check if Phaser 2D canvases are rendered before drawing to plane
    if (this.context2D.context) {
        this.willUpdate = this.texture.drawCanvas(this.context2D.canvas, this.width, this.height, this.willUpdate);
    }
};


function Environment(){

    this.engine = null;
    this.canvas = null;
    this.scene = null;

    this.contexts2D = {};
    this.textures = {};
    this.mappings2D = [];

    this.fpsLabel = null;
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

Environment.prototype.setTexture = function(key,texture) {
    this.textures[key] = texture;
};


Environment.prototype.init = function () {

    this.engine = new Babylon.Engine(this.canvas, true);

    this.scene = new Babylon.Scene(this.engine);
    //var scene = createScene();

    this.preload();
    //babylonRender(scene);
};

Environment.prototype.preload = function() {
    var self = this;

    BABYLON.SceneLoader.ImportMesh(null, "models/", "models.babylon", this.scene, function (newMeshes, particleSystems) {

        console.log('new meshes:',newMeshes);

        self.scene = self.create(newMeshes,self.contexts2D['tabletop']);

        self.registerBeforeRender();
        self.render();
    });
};

Environment.prototype.registerBeforeRender = function(){
    var self = this;

    self.scene.registerBeforeRender(function(){
        _.each(self.mappings2D,function(mapping){
            mapping.update();
        });
    });

    //TODO other animations
    //runAnimations();
};

Environment.prototype.render = function(){
    var self = this;
    this.engine.runRenderLoop(function () {
        self.scene.render();

        self.fpsLabel.innerHTML = BABYLON.Tools.GetFps().toFixed() + " fps";
    });
};

Environment.prototype.make = {
    camera: function (position,direction,maxZ,control) {
        console.log('make camera',this);

        var camera = new Babylon.ArcRotateCamera("Camera", 0, 0, 10, direction, this.scene);

        camera.setPosition(position);

        camera.attachControl(control);

        camera.lowerBetaLimit = 0.1;
        camera.upperBetaLimit = (Math.PI / 2) * 0.99;
        //camera.lowerRadiusLimit = 150;
        camera.maxZ = maxZ;

        return camera;
    },

    light: function (direction) {
        var light = new Babylon.HemisphericLight("Hemi0", direction, this.scene);
        light.diffuse = new Babylon.Color4(1, 1, 1, 0.15);
        light.specular = new Babylon.Color4(1, 1, 1, 0.15);
        light.groundColor = new Babylon.Color3(0, 0, 0);

        return light;
    },

    tabletop: function(width,height,textureKey) {
        var dynamicTexture = new Babylon.DynamicTexture("boardLayer", {
            width: width,
            height: height
        }, this.scene, false);

        var material = new Babylon.StandardMaterial("tabletop", this.scene);
        material.diffuseTexture = dynamicTexture;
        material.diffuseTexture.hasAlpha = true;
        material.specularColor = new Babylon.Color3(0, 0, 0);
        material.backFaceCulling = false;

        var plane = Babylon.Mesh.CreateGround("tabletop", width/2, height/2, 1, this.scene, false);
        plane.material = material;

        this.textures[textureKey] = dynamicTexture;

        return plane;
    },

    card: function (size, position, frontImg, backImg) {
        var scene = this.scene;

        var card = {};

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

        b.material.diffuseTexture = new BABYLON.Texture(backImg, scene);
        b.material.diffuseTexture.hasAlpha = true;
        b.material.backFaceCulling = true;

        b.scaling.y = size.height/size.width;
        b.position.z = 2;
        b.position.y = 0;

        // Front
        card.front = Babylon.Mesh.CreatePlane( "card", size.width, scene, false );
        var f = card.front;
        f.material = new Babylon.StandardMaterial( "card", scene );
        f.material.diffuseColor = new Babylon.Color3( 0.1, 0.1, 0.1 );
        f.material.specularColor = new Babylon.Color3( 0.1, 0.1, 0.1 );

        f.material.diffuseTexture = new BABYLON.Texture( frontImg, scene );
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
};

Environment.prototype.create = function (imports) {
    var self = this;

    var scene = this.scene;
    scene.clearColor = new BABYLON.Color4(0,0,0,0.0000000000000001);

    var light = self.make.light.call(self,new Babylon.Vector3(0, 1, 0));

    var camera = self.make.camera.apply(self,[
        new BABYLON.Vector3(0, ARENA.size.height, -1),
        new Babylon.Vector3(0, 0, 0),
        9999,
        this.canvas
    ]);

    var meshes = [];
    var scaleFactor = 25;
    _.each(imports,function(mesh){

        var entity = mesh;
        entity.material = new Babylon.StandardMaterial("default", scene);
        entity.scaling.x =entity.scaling.x*scaleFactor;
        entity.scaling.y =entity.scaling.y*scaleFactor;
        entity.scaling.z =entity.scaling.z*scaleFactor;

        meshes.push(entity);
    });

    meshes[0].position.x = 50;
    meshes[1].position.x = 150;
    meshes[2].position.x = 250;


    var tabletop = self.make.tabletop.call(self,ARENA.size.length,ARENA.size.width,'tabletop');
    var mapping = new Mapping2D(this.textures['tabletop'],this.contexts2D['tabletop'],ARENA.size.length, ARENA.size.width);
    this.mappings2D.push(mapping);

    // TEST card
    var card = self.make.card.call(self,ENTITIES.card.size,{x:0,y:75,z:0},"/img/resource-ore.png","/img/resource-back.png");

//
//
//    var cubeWidth = 35;

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

//
//
//    // Sphere
//    var sphere = Babylon.Mesh.CreateSphere("sphere", 16, 20, scene);
//    var sphereMat = new Babylon.StandardMaterial("ground", scene);
//    sphereMat.diffuseColor = new Babylon.Color3(0.4, 0.4, 0.4);
//    sphereMat.specularColor = new Babylon.Color3(0.4, 0.4, 0.4);
//    sphereMat.emissiveColor = Babylon.Color3.Purple();
//    sphere.material = sphereMat;
//    sphere.position.z += 100;
//
//    // Rotating donut
//    var donut = Babylon.Mesh.CreateTorus("donut", 20, 8, 16, scene);
//
//
//    function setupActions() {
//        // On pick interpolations
//        var prepareButton = function (mesh, color, light) {
//            var goToColorAction = new Babylon.InterpolateValueAction(Babylon.ActionManager.OnPickTrigger, light, "diffuse", color, 1000, null, true);
//
//            mesh.actionManager = new Babylon.ActionManager(scene);
//            mesh.actionManager.registerAction(
//                new Babylon.InterpolateValueAction(Babylon.ActionManager.OnPickTrigger, light, "diffuse", Babylon.Color3.Black(), 1000))
//                .then(new Babylon.CombineAction(Babylon.ActionManager.NothingTrigger, [ // Then is used to add a child action used alternatively with the root action.
//                    goToColorAction,                                                 // First click: root action. Second click: child action. Third click: going back to root action and so on...
//                    new Babylon.SetValueAction(Babylon.ActionManager.NothingTrigger, mesh.material, "wireframe", false)
//                ]));
//            mesh.actionManager.registerAction(new Babylon.SetValueAction(Babylon.ActionManager.OnPickTrigger, mesh.material, "wireframe", true))
//                .then(new Babylon.DoNothingAction());
//            mesh.actionManager.registerAction(new Babylon.SetStateAction(Babylon.ActionManager.OnPickTrigger, light, "off"))
//                .then(new Babylon.SetStateAction(Babylon.ActionManager.OnPickTrigger, light, "on"));
//        };
//
//        prepareButton(redBox, Babylon.Color3.Red(), light1);
//        prepareButton(greenBox, Babylon.Color3.Green(), light2);
//        prepareButton(blueBox, Babylon.Color3.Blue(), light3);
//
//        // Conditions
//        sphere.actionManager = new Babylon.ActionManager(scene);
//        var condition1 = new Babylon.StateCondition(sphere.actionManager, light1, "off");
//        var condition2 = new Babylon.StateCondition(sphere.actionManager, light1, "on");
//
//        sphere.actionManager.registerAction(new Babylon.InterpolateValueAction(Babylon.ActionManager.OnLeftPickTrigger, camera, "alpha", 0, 500, condition1));
//        sphere.actionManager.registerAction(new Babylon.InterpolateValueAction(Babylon.ActionManager.OnLeftPickTrigger, camera, "alpha", Math.PI, 500, condition2));
//
//        // Over/Out
//        var makeOverOut = function (mesh) {
//            mesh.actionManager.registerAction(new Babylon.SetValueAction(Babylon.ActionManager.OnPointerOutTrigger, mesh.material, "emissiveColor", mesh.material.emissiveColor));
//            mesh.actionManager.registerAction(new Babylon.SetValueAction(Babylon.ActionManager.OnPointerOverTrigger, mesh.material, "emissiveColor", Babylon.Color3.White()));
//            mesh.actionManager.registerAction(new Babylon.InterpolateValueAction(Babylon.ActionManager.OnPointerOutTrigger, mesh, "scaling", new Babylon.Vector3(1, 1, 1), 150));
//            mesh.actionManager.registerAction(new Babylon.InterpolateValueAction(Babylon.ActionManager.OnPointerOverTrigger, mesh, "scaling", new Babylon.Vector3(1.1, 1.1, 1.1), 150));
//        };
//
//        makeOverOut(redBox);
//        makeOverOut(greenBox);
//        makeOverOut(blueBox);
//        makeOverOut(sphere);
//
//        // scene's actions
//        scene.actionManager = new Babylon.ActionManager(scene);
//
//        var rotate = function (mesh) {
//            scene.actionManager.registerAction(new Babylon.IncrementValueAction(Babylon.ActionManager.OnEveryFrameTrigger, mesh, "rotation.y", 0.01));
//        }
//
//        rotate(redBox);
//        rotate(greenBox);
//        rotate(blueBox);
//
//        // Intersections
//        donut.actionManager = new Babylon.ActionManager(scene);
//
//        donut.actionManager.registerAction(new Babylon.SetValueAction(
//            { trigger: Babylon.ActionManager.OnIntersectionEnterTrigger, parameter: sphere },
//            donut, "scaling", new Babylon.Vector3(1.2, 1.2, 1.2)));
//
//        donut.actionManager.registerAction(new Babylon.SetValueAction(
//            { trigger: Babylon.ActionManager.OnIntersectionExitTrigger, parameter: sphere }
//            , donut, "scaling", new Babylon.Vector3(1, 1, 1)));
//
//    }
//
//    // Animations
//    var alpha = 0;
//
//    function runAnimations(){
//        donut.position.x = 100 * Math.cos(alpha);
//        donut.position.y = 5;
//        donut.position.z = 100 * Math.sin(alpha);
//        alpha += 0.01;
//
//        card.root.rotation.x += 0.01;
//    }


    return scene;
};


