/* eslint-disable import/no-cycle */
import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import Experience from './Experience';

export default class Renderer {
  private experience: Experience;

  private instance! : THREE.WebGLRenderer;

  public controls! : TrackballControls;

  constructor() {
    this.experience = new Experience();
    this.setInstance();
  }

  private setInstance() : void {
    this.instance = new THREE.WebGLRenderer({
      alpha: false,
      antialias: true,
      canvas: this.experience.targetElement as HTMLCanvasElement
    });

    // Make renderer background transparent
    this.instance.setClearColor(0x000000, 0);
    this.instance.setSize(this.experience.config.width, this.experience.config.height);
    this.instance.setPixelRatio(this.experience.config.pixelRatio);
    this.instance.physicallyCorrectLights = true;
    this.instance.outputEncoding = THREE.sRGBEncoding;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.autoUpdate = false;
    this.instance.shadowMap.needsUpdate = this.instance.shadowMap.enabled;

    this.controls = new TrackballControls(this.experience.camera.instance, this.experience.targetElement!);
  }

  public resize() : void {
    this.instance.setSize(this.experience.config.width, this.experience.config.height);
    this.instance.setPixelRatio(this.experience.config.pixelRatio);
  }

  public update() : void {
    this.controls.update();
    this.instance.render(this.experience.scene, this.experience.camera.instance);
  }
}
