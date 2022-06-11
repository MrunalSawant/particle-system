/* eslint-disable import/no-cycle */
import * as THREE from 'three';
import Experience from './Experience';
import { PointSize, RayCasterThreshold } from '../Constant/Constant';
import StarTexture from '../Assets/star.jpg';

export default class World {
  private experience: Experience;

  private mouse!: THREE.Vector2;

  private rayCaster!: THREE.Raycaster;

  constructor() {
    this.experience = new Experience();
    this.mouse = new THREE.Vector2();
    this.init();
    this.setWorld();

    const points = this.generateIndexedPointcloud(new THREE.Color(1, 1, 1), 1000);
    this.experience.scene.add(points);
    // this.setLight();
  }

  private init(): void {
    this.rayCaster = new THREE.Raycaster();
    this.rayCaster.params.Points = {
      threshold: RayCasterThreshold
    };
    window.addEventListener('pointermove', this.onMouseMove.bind(this), false);
    window.addEventListener('click', this.onClick.bind(this), false);
  }

  private onClick(): void {
    this.rayCaster.setFromCamera(this.mouse, this.experience.camera.instance);
    const intersects = this.rayCaster.intersectObjects(this.experience.scene.children);

    const intersect = intersects.length > 0 ? intersects[0] : null;

    if (intersect) {
      console.log(intersect.index);
    }
  }

  private onMouseMove(event: any): void {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  private generatePointCloudGeometry(color: THREE.Color, length: number): THREE.BufferGeometry {
    const geometry = new THREE.BufferGeometry();
    const numPoints = length;

    const positions = new Float32Array(numPoints * 3);
    const colors = new Float32Array(numPoints * 3);

    let k = 0;

    for (let i = 0; i < length; i += 1) {
      const x = Math.random() * 10;
      const y = Math.random() * 10;
      const z = Math.random() * -10;

      positions[3 * k] = x;
      positions[3 * k + 1] = y;
      positions[3 * k + 2] = z;

      const intensity = Math.random() * 5;
      colors[3 * k] = color.r * intensity;
      colors[3 * k + 1] = color.g * intensity;
      colors[3 * k + 2] = color.b * intensity;

      k += 1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.computeBoundingBox();

    return geometry;
  }

  private generateIndexedPointcloud(color: THREE.Color, length: number): THREE.Points {
    const geometry = this.generatePointCloudGeometry(color, length);
    const numPoints = length;
    const indices = new Uint16Array(numPoints);

    let k = 0;

    for (let j = 0; j < length; j += 1) {
      indices[k] = k;
      k += 1;
    }

    geometry.setIndex(new THREE.BufferAttribute(indices, 1));

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(StarTexture);
    const material = new THREE.PointsMaterial({ size: PointSize, vertexColors: true, map: texture });

    return new THREE.Points(geometry, material);
  }

  private setWorld(): void {
    // const geometry = new THREE.PlaneGeometry(1, 1, 1);
    // const material = new THREE.PointsMaterial({ color: 0x00ff00, size: 0.5 });
    // const cube = new THREE.Points(geometry, material);

    // const edges = new THREE.EdgesGeometry(geometry);
    // const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
    // this.experience.scene.add(cube);
    // this.experience.scene.add(line);
  }

  private setLight(): void {
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

  public update(): void {
    // console.log(this.mouse);

  }
}
