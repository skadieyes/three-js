import { Component, OnInit } from '@angular/core';
import { ControlModel } from './food.model';
declare var THREE: any;
@Component({
    selector: 'app-food',
    templateUrl: './food.component.html',
    styleUrls: ['./food.component.scss']
})

export class FoodComponent implements OnInit {

    constructor() { }
    scene: any;
    camera: any;
    stats: any;
    renderer: any;
    plane: any;
    controls: any;

    render: any;

    planeGeometry: any;
    planeMaterial: any;

    ngOnInit() {
        this.initStats();
        this.sceneSet();
        this.cameraSet();
        this.rendererSet();
        this.planeSet();
        this.lightSet();
        this.controlSet();
        this.guiSet();
        this.renderRun();
        document.getElementById('webgl').appendChild(this.renderer.domElement);

        const texture = new THREE.Texture();
        const loader2 = new THREE.ImageLoader();
        loader2.load('./../../assets/textures/Banana.png', function (image: any) {
            texture.image = image;
            texture.needsUpdate = true;
        });

        const loader = new THREE.OBJLoader();
        loader.load('./../../assets/obj/Banana.obj', (loadedMesh: any) => {
            console.log(loadedMesh);
            const material = new THREE.MeshLambertMaterial({
                color: 0xccc
            });
            loadedMesh.children.forEach((child: any) => {
                child.material.map = texture;
                child.geometry.computeFaceNormals();
                child.geometry.computeVertexNormals();
            });
            loadedMesh.scale.set(100, 100, 100);
            loadedMesh.rotation.x = -0.3;
            this.scene.add(loadedMesh);
        });

    }

    sceneSet() {
        this.scene = new THREE.Scene();
        // this.scene.fog = new THREE.Fog(0xffffff, 0.015, 100);
    }
    cameraSet() {
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.x = -30;
        this.camera.position.y = 40;
        this.camera.position.z = 30;
        this.camera.lookAt(this.scene.position);
    }

    rendererSet() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(new THREE.Color(0, 0, 0));
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMapEnabled = true;
    }
    planeSet() {
        this.planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
        this.planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
        this.plane = new THREE.Mesh(this.planeGeometry, this.planeMaterial);
        this.plane.receiveShadow = true;

        this.plane.rotation.x = -0.5 * Math.PI;
        this.plane.position.x = 0;
        this.plane.position.y = 0;
        this.plane.position.z = 0;

        // this.scene.add(this.plane);
    }
    lightSet() {

        const ambientLight = new THREE.AmbientLight(0x0c0c0c);
        this.scene.add(ambientLight);

        // add spotlight for the shadows
        const spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-40, 60, 20);
        spotLight.castShadow = true;
        this.scene.add(spotLight);
    }

    controlSet() {
        this.controls = new ControlModel();
        if (this.controls) {
            this.controls.rotationSpeed = 0.02;
            this.controls.numberOfObjects = this.scene.children.length;
            this.controls.removeCube = () => {
                const allChildren = this.scene.children;
                const lastObject = allChildren[allChildren.length - 1];
                if (lastObject instanceof THREE.Mesh) {
                    this.scene.remove(lastObject);
                    this.controls.numberOfObjects = this.scene.children.length;
                }
            };
            this.controls.addCube = () => {

                const cubeSize = Math.ceil((Math.random() * 3));
                const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
                const cubeMaterial = new THREE.MeshLambertMaterial({
                    color: Math.random() * 0xffffff
                });
                const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
                cube.castShadow = true;

                // position the cube randomly in the scene
                cube.position.x = -30 + Math.round((Math.random() * this.planeGeometry.parameters.width));
                cube.position.y = Math.round((Math.random() * 5));
                cube.position.z = -20 + Math.round((Math.random() * this.planeGeometry.parameters.height));

                // add the cube to the scene
                this.scene.add(cube);
                this.controls.numberOfObjects = this.scene.children.length;
            };
            this.controls.outputObjects = () => {
                console.log(this.scene);
            };
        }
    }

    guiSet() {
        const gui = new dat.GUI();
        gui.add(this.controls, 'rotationSpeed', 0, 0.5);
        gui.add(this.controls, 'addCube');
        gui.add(this.controls, 'removeCube');
        gui.add(this.controls, 'outputObjects');
        gui.add(this.controls, 'numberOfObjects').listen();
        console.log(gui);
    }

    renderRun(): void {
        this.renderer.render(this.scene, this.camera);
        this.render = () => {
            this.stats.update();
            window.requestAnimationFrame(this.render);
            this.scene.traverse((e: any) => {
                if (e instanceof THREE.Mesh && e !== this.plane) {

                    e.rotation.x += this.controls.rotationSpeed;
                    e.rotation.y += this.controls.rotationSpeed;
                    e.rotation.z += this.controls.rotationSpeed;
                }
            });
            this.renderer.render(this.scene, this.camera);
        };
        window.requestAnimationFrame(this.render);
    }

    initStats() {

        this.stats = Stats();

        this.stats.setMode(0); // 0: fps, 1: ms

        // Align top-left
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.left = '0px';
        this.stats.domElement.style.top = '0px';

        document.getElementById('stats').appendChild(this.stats.domElement);

        return this.stats;
    }
}
