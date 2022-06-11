/* eslint-disable import/no-cycle */
import * as THREE from 'three';
import Experience from './Experience';

export default class World {
  private experience: Experience;

  constructor() {
    this.experience = new Experience();
    this.setWorld();
    this.setLight();
  }

  private setWorld() : void {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
    this.experience.scene.add(cube);
    this.experience.scene.add(line);
  }

  private setLight() : void {
    const hemisphereLight = new THREE.HemisphereLight(0xddeeff, 0x0f0e0d, 0.5);
    hemisphereLight.position.set(20, 20, 20);
    hemisphereLight.castShadow = false;

    const pointLight = new THREE.PointLight(0xffffff, 1.5, 80000, 10);
    pointLight.position.set(-200, 400, 200);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 1024;
    pointLight.shadow.mapSize.height = 1024;
    pointLight.shadow.radius = 1;

    this.experience.scene.add(hemisphereLight);
    this.experience.scene.add(pointLight);
  }
}
