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


function Factory3D ( scene ) {
    this.scene = scene;
    this.meshes = {};
    this.scaleFactor = 1;
}

Factory3D.prototype.make = function(meshKey,material){

    var clone = this.meshes[meshKey].clone(meshKey+'_'+Date.now());

    clone.isVisible = true;

    console.log(clone);

    return clone;
};

Factory3D.prototype.load = function(imports, scaleFactor){
    var self = this;

    if (scaleFactor) this.scaleFactor = scaleFactor;


    _.each(imports,function(mesh){

        var clone = mesh;
        clone.material = new Babylon.StandardMaterial("default", self.scene);
        clone.scaling.x = clone.scaling.x*self.scaleFactor;
        clone.scaling.y = clone.scaling.y*self.scaleFactor;
        clone.scaling.z = clone.scaling.z*self.scaleFactor;
        clone.position.x = 0;
        clone.position.y = 0;
        clone.position.z = 0;
        clone.isVisible = false;

        self.meshes[mesh.id] = clone;
    });

    console.log('factory load'+self.meshes);
};


function Environment(){

    this.scenes = {};

}



Environment.prototype.setCanvas = function( scene, id ) {
    this.scenes[scene].canvas = document.getElementById(id);
};


Environment.prototype.addScene = function( name, canvas, onCreatedCallback ) {
    this.scenes[name] = new Scene( canvas );
    this.scenes[name].onCreatedCallback = onCreatedCallback;
};

Environment.prototype.setContext2D = function( scene, key, context ) {
    this.scenes[scene].contexts2D[key] = context;
};

Environment.prototype.init = function( scene ) {

    var s = this.scenes[scene];
    s.setFpsLabel('fpsLabel');
    s.preload("models/", "models.babylon", 25 );
};

function Scene( canvas ){

    this.canvas = document.getElementById(canvas);
    this.engine = new Babylon.Engine(this.canvas, true);
    this.scene = new Babylon.Scene(this.engine);


    this.contexts2D = {};
    this.textures = {};
    this.mappings2D = [];

    this.factory = null;

    this.onCreatedCallback = null;

    this.fpsLabel = null;
}

Scene.prototype.setFpsLabel = function(id) {
    this.fpsLabel = document.getElementById(id);
};

Scene.prototype.setTexture = function(key,texture) {
    this.textures[key] = texture;
};

Scene.prototype.preload = function( path, file, scaleFactor ) {
    var self = this;

    BABYLON.SceneLoader.ImportMesh( null, path, file, this.scene,
        function (imports, particleSystems) {

            console.log('new meshes:',imports);

            self.factory = new Factory3D( self.scene );
            self.factory.load( imports, scaleFactor );

            self.scene = self.create();

            self.setupActions();
            self.registerBeforeRender();
            self.render();
        }
    );
};

Scene.prototype.registerBeforeRender = function(){
    var self = this;

    self.scene.registerBeforeRender(function(){
        _.each(self.mappings2D,function(mapping){
            mapping.update();
        });
    });

    //TODO other animations
    //runAnimations();
};

Scene.prototype.render = function(){
    var self = this;
    this.engine.runRenderLoop(function () {
        self.scene.render();

        self.fpsLabel.innerHTML = BABYLON.Tools.GetFps().toFixed() + " fps";
    });
};

Scene.prototype.make = {
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

Scene.prototype.create = function () {
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





    var tabletop = self.make.tabletop.call(self,ARENA.size.length,ARENA.size.width,'tabletop');
    var mapping = new Mapping2D(this.textures['tabletop'],this.contexts2D['tabletop'],ARENA.size.length, ARENA.size.width);
    this.mappings2D.push(mapping);

    // TEST OBJECTS
//    var city = self.factory.make('city',null);
//    var card = self.make.card.call(self,ENTITIES.card.size,{x:0,y:75,z:0},"/img/resource-ore.png","/img/resource-back.png");

    this.onCreatedCallback();

    return scene;
};


Scene.prototype.setupActions = function() {

    this.scene.actionManager = new BABYLON.ActionManager(this.scene);

    this.scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnKeyUpTrigger,
            function (evt) {

                console.log('event',evt);

                if (evt.sourceEvent.key == "r") {

                }
            }));

}

