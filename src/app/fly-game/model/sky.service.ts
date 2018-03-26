import { Component, OnInit } from '@angular/core';
declare var THREE: any;

export class SkyService {
    get mesh() {
        const mesh = new THREE.Object3D();
        mesh.name = 'cloud';
        const geom = new THREE.CubeGeometry(20, 20, 20);
        const mat = new THREE.MeshPhongMaterial({
            color: 0xd8d0d1,
        });

        const nBlocs = 3 + Math.floor(Math.random() * 3);
        for (let i = 0; i < nBlocs; i++) {
            const m = new THREE.Mesh(geom.clone(), mat);
            m.position.x = i * 15;
            m.position.y = Math.random() * 10;
            m.position.z = Math.random() * 10;
            m.rotation.z = Math.random() * Math.PI * 2;
            m.rotation.y = Math.random() * Math.PI * 2;
            const s = .1 + Math.random() * .9;
            m.scale.set(s, s, s);
            m.castShadow = true;
            m.receiveShadow = true;
            mesh.add(m);
        }
        return mesh;
    }
    get skyMesh() {
        const mesh = new THREE.Object3D();
        const nClouds = 20;
        const clouds = [];
        const stepAngle = Math.PI * 2 / nClouds;
        for (let i = 0; i < nClouds; i++) {
            const c = this.mesh;
            const a = stepAngle * i;
            const h = 750 + Math.random() * 200;
            c.position.y = Math.sin(a) * h;
            c.position.x = Math.cos(a) * h;
            c.position.z = -400 - Math.random() * 400;
            c.rotation.z = a + Math.PI / 2;
            const s = 1 + Math.random() * 2;
            c.scale.set(s, s, s);
            mesh.add(c);
        }
        return mesh;
    }
}
