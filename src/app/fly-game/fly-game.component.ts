import { Component, OnInit } from '@angular/core';
import { FlyGameService } from './fly-game.service';
import { GameModel, GameModelSet } from './fly-game.model';
import { SeaService, CloudService, SkyService, AirPlaneServive } from './model';
declare var THREE: any;

@Component({
    selector: 'app-fly-game',
    templateUrl: './fly-game.component.html',
    styleUrls: ['./fly-game.component.scss'],
    providers: [FlyGameService, SeaService, CloudService, SkyService, AirPlaneServive]
})
export class FlyGameComponent implements OnInit {

    constructor(public _fly: FlyGameService,
        public _sea: SeaService,
        public _cloud: CloudService,
        public _sky: SkyService,
        public _airplane: AirPlaneServive) {
    }
    scene: any;
    camera: any;
    render: any;
    renderer: any;
    container: any;
    gameModelSet: any;
    gameModel: any;

    HEIGHT: number;
    WIDTH: number;
    mousePos = { x: 0, y: 0 };
    ngOnInit() {
        this.sceneSet();
        this.lightSet();
        this.modelSet();
        this.modelDraw();
        this.renderRun();
    }

    sceneSet() {
        // 场景
        this.HEIGHT = window.innerHeight;
        this.WIDTH = window.innerWidth;
        // scence
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

        // camera
        const aspectRatio = this.WIDTH / this.HEIGHT;
        const fieldOfView = 60;
        const nearPlane = 1;
        const farPlane = 10000;

        this.camera = new THREE.PerspectiveCamera(
            fieldOfView,
            aspectRatio,
            nearPlane,
            farPlane
        );
        this.camera.position.x = 0;
        this.camera.position.z = 200;
        this.camera.position.y = 100;

        // renderer
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(this.WIDTH, this.HEIGHT);
        this.renderer.shadowMapEnabled = true;

        this.container = document.getElementById('world');
        this.container.appendChild(this.renderer.domElement);

        window.addEventListener('resize', () => {
            this.handleWindowResize();
        });
    }
    lightSet() {
        const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);
        const shadowLight = new THREE.DirectionalLight(0xffffff, .9);
        const ambientLight = new THREE.AmbientLight(0xdc8874, .5);
        shadowLight.position.set(150, 350, 350);
        shadowLight.castShadow = true;
        shadowLight.shadowCameraLeft = -400;
        shadowLight.shadowCameraRight = 400;
        shadowLight.shadowCameraTop = 400;
        shadowLight.shadowCameraBottom = -400;
        shadowLight.shadowCameraNear = 1;
        shadowLight.shadowCameraFar = 1000;
        shadowLight.shadowMapSizeWidth = 2048;
        shadowLight.shadowMapSizeHeight = 2048;

        this.scene.add(hemisphereLight);
        this.scene.add(shadowLight);
    }
    handleWindowResize() {
        this.HEIGHT = window.innerHeight;
        this.WIDTH = window.innerWidth;
        this.renderer.setSize(this.WIDTH, this.HEIGHT);
        this.camera.aspect = this.WIDTH / this.HEIGHT;
        this.camera.updateProjectionMatrix();
    }

    handleMouseMove(event: any) {
        const tx = -1 + (event.clientX / this.WIDTH) * 2;
        const ty = 1 - (event.clientY / this.HEIGHT) * 2;
        this.mousePos = { x: tx, y: ty };

    }

    modelSet() {
        this.gameModelSet = new GameModelSet();
        this.gameModel = new GameModel();
        const waves = this._sea.waves;
        this.moveWaves(waves);
        this.gameModel.sea = this._sea.mesh;
        this.gameModel.sea.receiveShadow = true;
        this.gameModel.sky = this._sky.skyMesh;
        this.gameModel.airplane = this._airplane.mesh;
    }

    moveWaves(waves: any) {
        if (this.gameModel.sea) {
            const verts = this.gameModel.sea.geometry.vertices;
            const len = verts.length;
            for (let i = 0; i < len; i++) {
                const v = verts[i];
                const vprops = waves[i];
                v.x = vprops.x + Math.cos(vprops.ang) * vprops.amp;
                v.y = vprops.y + Math.sin(vprops.ang) * vprops.amp;
                vprops.ang += vprops.speed;
            }
            this.gameModel.sea.geometry.verticesNeedUpdate = true;
            this.gameModel.sea.rotation.z += .005;
        }
    }

    modelDraw() {
        this.gameModel.sea.position.y = -600;
        this.scene.add(this.gameModel.sea);

        this.gameModel.sky.position.y = -600;
        this.scene.add(this.gameModel.sky);

        this.gameModel.airplane.scale.set(.25, .25, .25);
        this.gameModel.airplane.position.y = 100;
        this.scene.add(this.gameModel.airplane);
    }

    renderRun() {
        const waves = this._sea.waves;
        this.render = () => {
            window.requestAnimationFrame(this.render);
            this.updatePlane();
            this.gameModel.sea.rotation.z += .005;
            this.gameModel.sky.rotation.z += .01;
            this.moveWaves(waves);

            this.renderer.render(this.scene, this.camera);
        };
        this.render();
    }

    updatePlane() {

        const targetY = this.normalize(this.mousePos.y, -.75, .75, 25, 175);
        const targetX = this.normalize(this.mousePos.x, -.75, .75, -100, 100);
        this.gameModel.airplane.position.y += (targetY - this.gameModel.airplane.position.y) * 0.1;
        this.gameModel.airplane.rotation.z = (targetY - this.gameModel.airplane.position.y) * 0.0128;
        this.gameModel.airplane.rotation.x = (this.gameModel.airplane.position.y - targetY) * 0.0064;
        this.gameModel.airplane.children[5].rotation.x += 0.3;
    }

    normalize(v: any, vmin: any, vmax: any, tmin: any, tmax: any) {

        const nv = Math.max(Math.min(v, vmax), vmin);
        const dv = vmax - vmin;
        const pc = (nv - vmin) / dv;
        const dt = tmax - tmin;
        const tv = tmin + (pc * dt);
        return tv;

    }
}


