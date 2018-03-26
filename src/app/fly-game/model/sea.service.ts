import { Component, OnInit } from '@angular/core';
declare var THREE: any;

export class SeaService {
    get waves(){
        const l = this.geom.vertices.length;

        const waves: any = [];

        for (let i = 0; i < l; i++) {
            const v = this.geom.vertices[i];
            waves.push({
                y: v.y,
                x: v.x,
                z: v.z,
                ang: Math.random() * Math.PI * 2,
                amp: 15 + Math.random() * 15,
                speed: 0.016 + Math.random() * 0.032
            });
        }
        return waves;
    }
    get mat (){
        const mat = new THREE.MeshPhongMaterial({
            color: 0x68c3c0,
            transparent: true,
            opacity: .8,
            shading: THREE.FlatShading,

        });
        return mat;
    }
    get geom(){
        const geom = new THREE.CylinderGeometry(600, 600, 800, 40, 10);
        geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
        geom.mergeVertices();
        return geom;
    }

    get mesh(){
        const mesh = new THREE.Mesh(this.geom, this.mat);
        return mesh;
    }

}
