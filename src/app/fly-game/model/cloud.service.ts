import { Component, OnInit } from '@angular/core';
declare var THREE: any;

export class CloudService {
    get mesh(){
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
}
