/* eslint-disable import/no-cycle */
import * as THREE from 'three';
import Experience from './Experience';
import { PointSize, RayCasterThreshold } from '../Constant/Constant';
import StarTexture from '../Assets/star.png';

export default class World {
  private experience: Experience;

  private mouse!: THREE.Vector2;

  private rayCaster!: THREE.Raycaster;

  private index!: number | undefined;

  private topLeft!: THREE.Vector2;

  constructor() {
    this.experience = new Experience();
    this.mouse = new THREE.Vector2();
    this.topLeft = new THREE.Vector2();

    this.init();
    this.setWorld();

    const points = this.generateIndexedPointcloud(new THREE.Color(1, 1, 1), 1000);
    this.experience.scene.add(points);
  }

  private init(): void {
    this.rayCaster = new THREE.Raycaster();
    this.rayCaster.params.Points = {
      threshold: RayCasterThreshold
    };
    window.addEventListener('pointermove', this.onMouseMove.bind(this), false);
    window.addEventListener('pointermove', this.onClick.bind(this), false);
  }

  public getMousePosition(): THREE.Vector2 {
    return this.topLeft;
  }

  private onClick(): void {
    this.rayCaster.setFromCamera(this.mouse, this.experience.camera.instance);
    const intersects = this.rayCaster.intersectObjects(this.experience.scene.children);

    const intersect = intersects.length > 0 ? intersects[0] : null;

    if (intersect) {
      this.index = intersect.index;
    } else {
      this.index = undefined;
    }
  }

  public getIndex(): number | undefined {
    return this.index;
  }

  private onMouseMove(event: any): void {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this.topLeft.x = event.clientX;
    this.topLeft.y = event.clientY;
  }

  private generatePointCloudGeometry(color: THREE.Color, length: number): THREE.BufferGeometry {
    const geometry = new THREE.BufferGeometry();
    const numPoints = length;

    const positions = new Float32Array(numPoints * 3);
    const colors = new Float32Array(numPoints * 3);

    for (let i = 0; i < length; i += 1) {
      const x = Math.random() * 10;
      const y = Math.random() * 10;
      const z = Math.random() * -20;

      positions[3 * i] = x;
      positions[3 * i + 1] = y;
      positions[3 * i + 2] = z;

      const intensity = Math.random() * 5;
      colors[3 * i] = color.r * intensity;
      colors[3 * i + 1] = color.g * intensity;
      colors[3 * i + 2] = color.b * intensity;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    return geometry;
  }

  private generateIndexedPointcloud(color: THREE.Color, length: number): THREE.Points {
    const geometry = this.generatePointCloudGeometry(color, length);
    const indices = new Uint16Array(length);

    for (let j = 0; j < length; j += 1) {
      indices[j] = j;
    }

    geometry.setIndex(new THREE.BufferAttribute(indices, 1));

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(StarTexture);
    const material = new THREE.PointsMaterial({
      size: PointSize, vertexColors: true, map: texture, blending: THREE.AdditiveBlending
    });

    return new THREE.Points(geometry, material);
  }

  private setWorld(): void {
  }

  public update(): void {
    // console.log(this.mouse);
  }
}
