import { Component, OnInit } from '@angular/core';
declare var THREE: any;

export class AirPlaneServive {
    get cockpit() {
        const geomCockpit = new THREE.BoxGeometry(80, 50, 50, 1, 1, 1);
        const matCockpit = new THREE.MeshPhongMaterial({ color: 0xf25346, shading: THREE.FlatShading });

        geomCockpit.vertices[4].y -= 10;
        geomCockpit.vertices[4].z += 20;
        geomCockpit.vertices[5].y -= 10;
        geomCockpit.vertices[5].z -= 20;
        geomCockpit.vertices[6].y += 30;
        geomCockpit.vertices[6].z += 20;
        geomCockpit.vertices[7].y += 30;
        geomCockpit.vertices[7].z -= 20;

        const cockpit = new THREE.Mesh(geomCockpit, matCockpit);
        cockpit.castShadow = true;
        cockpit.receiveShadow = true;
        return cockpit;
    }
    get engine() {
        const geomEngine = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1);
        const matEngine = new THREE.MeshPhongMaterial({ color: 0xd8d0d1, shading: THREE.FlatShading });
        const engine = new THREE.Mesh(geomEngine, matEngine);
        engine.position.x = 40;
        engine.castShadow = true;
        engine.receiveShadow = true;
        return engine;
    }
    get tail() {
        const geomTailPlane = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
        const matTailPlane = new THREE.MeshPhongMaterial({ color: 0xf25346, shading: THREE.FlatShading });
        const tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
        tailPlane.position.set(-35, 25, 0);
        tailPlane.castShadow = true;
        tailPlane.receiveShadow = true;
        return tailPlane;
    }
    get wing() {
        const geomSideWing = new THREE.BoxGeometry(40, 8, 150, 1, 1, 1);
        const matSideWing = new THREE.MeshPhongMaterial({ color: 0xf25346, shading: THREE.FlatShading });
        const sideWing = new THREE.Mesh(geomSideWing, matSideWing);
        sideWing.position.set(20, 10, 0);
        sideWing.castShadow = true;
        sideWing.receiveShadow = true;
        return sideWing;
    }
    get windshield() {
        const geomWindshield = new THREE.BoxGeometry(3, 15, 20, 1, 1, 1);
        const matWindshield = new THREE.MeshPhongMaterial({ color: 0xd8d0d1, transparent: true, opacity: .3, shading: THREE.FlatShading });
        const windshield = new THREE.Mesh(geomWindshield, matWindshield);
        windshield.position.set(5, 27, 0);
        windshield.castShadow = true;
        windshield.receiveShadow = true;
        return windshield;
    }

    get Propeller() {

        const geomPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
        geomPropeller.vertices[4].y -= 5;
        geomPropeller.vertices[4].z += 5;
        geomPropeller.vertices[5].y -= 5;
        geomPropeller.vertices[5].z -= 5;
        geomPropeller.vertices[6].y += 5;
        geomPropeller.vertices[6].z += 5;
        geomPropeller.vertices[7].y += 5;
        geomPropeller.vertices[7].z -= 5;
        const matPropeller = new THREE.MeshPhongMaterial({ color: 0x59332e, shading: THREE.FlatShading });
        const propeller = new THREE.Mesh(geomPropeller, matPropeller);

        propeller.castShadow = true;
        propeller.receiveShadow = true;

        const geomBlade = new THREE.BoxGeometry(1, 100, 20, 1, 1, 1);
        const matBlade = new THREE.MeshPhongMaterial({ color: 0x59332e, shading: THREE.FlatShading });

        const blade = new THREE.Mesh(geomBlade, matBlade);
        blade.position.set(8, 0, 0);
        blade.castShadow = true;
        blade.receiveShadow = true;
        propeller.add(blade);
        propeller.position.set(50, 0, 0);
        return propeller;
    }
    get wheelProtecR() {
        const wheelProtecGeom = new THREE.BoxGeometry(30, 15, 10, 1, 1, 1);
        const wheelProtecMat = new THREE.MeshPhongMaterial({ color: 0xf25346, shading: THREE.FlatShading });
        const wheelProtecR = new THREE.Mesh(wheelProtecGeom, wheelProtecMat);
        wheelProtecR.position.set(25, -20, 25);
        return wheelProtecR;
    }
    get wheelTireR() {
        const wheelTireGeom = new THREE.BoxGeometry(24, 24, 4);
        const wheelTireMat = new THREE.MeshPhongMaterial({ color: 0xf25346, shading: THREE.FlatShading });
        const wheelTireR = new THREE.Mesh(wheelTireGeom, wheelTireMat);
        wheelTireR.add(this.wheelAxis);
        return wheelTireR;
    }
    get wheelAxis() {
        const wheelAxisGeom = new THREE.BoxGeometry(10, 10, 6);
        const wheelAxisMat = new THREE.MeshPhongMaterial({ color: 0x59332e, shading: THREE.FlatShading });
        const wheelAxis = new THREE.Mesh(wheelAxisGeom, wheelAxisMat);
        return wheelAxis;
    }
    get suspension() {
        const suspensionGeom = new THREE.BoxGeometry(4, 20, 4);
        suspensionGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 10, 0));
        const suspensionMat = new THREE.MeshPhongMaterial({ color: 0xf25346, shading: THREE.FlatShading });
        const suspension = new THREE.Mesh(suspensionGeom, suspensionMat);
        suspension.position.set(-35, -5, 0);
        suspension.rotation.z = -.3;
        return suspension;
    }
    get mesh() {
        const mesh = new THREE.Object3D();
        mesh.add(this.cockpit);
        mesh.add(this.engine);
        mesh.add(this.tail);
        mesh.add(this.wing);
        mesh.add(this.windshield);
        mesh.add(this.Propeller);
        mesh.add(this.suspension);
        mesh.add(this.wheelProtecR);
        mesh.add(this.wheelTireR);
        const wheelProtecL = this.wheelProtecR.clone();
        wheelProtecL.position.z = -this.wheelProtecR.position.z;
        mesh.add(wheelProtecL);

        const wheelTireL = this.wheelTireR.clone();
        wheelTireL.position.z = -this.wheelTireR.position.z;
        mesh.add(wheelTireL);

        const wheelTireB = this.wheelTireR.clone();
        wheelTireB.scale.set(.5, .5, .5);
        wheelTireB.position.set(-35, -5, 0);
        mesh.add(wheelTireB);

        mesh.add(this.suspension);
        return mesh;
    }
}
