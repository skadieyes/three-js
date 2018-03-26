import { Component, OnInit } from '@angular/core';
declare var THREE: any;

export class EnnemyService {
    get mesh() {
        const geom = new THREE.TetrahedronGeometry(8, 2);
        const mat = new THREE.MeshPhongMaterial({
            color: 0xf25346,
            shininess: 0,
            specular: 0xffffff,
            shading: THREE.FlatShading
        });
        const mesh = new THREE.Mesh(geom, mat);
        mesh.castShadow = true;
        const angle = 0;
        const dist = 0;
        return mesh;
    }
}
