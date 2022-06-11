/* eslint-disable consistent-return */
/* eslint-disable import/no-cycle */
/* eslint-disable no-constructor-return */

import * as THREE from 'three';
import Renderer from './Renderer';
import Camera from './Camera';
import World from './World';
import { Config } from '../Utils/Config';

export default class Experience {
  static _instance:Experience;

  public renderer! : Renderer;

  public scene! : THREE.Scene;

  public camera! : Camera;

  public config! : Config;

  public targetElement! : HTMLElement | null;

  public world! : World;

  constructor() {
    if (Experience._instance) {
      return Experience._instance;
    }

    Experience._instance = this;

    this.targetElement = document.getElementById('viewer3d');

    this.setConfig();
    this.setScene();
    this.setCamera();
    this.setRenderer();
    this.setWorld();

    window.addEventListener('resize', () => {
      this.resize();
    });
    // @ts-ignore
    window.experience = this;
  }

  private resize(): void {
    this.config.width = window.innerWidth;
    this.config.height = window.innerHeight;
    this.config.pixelRatio = window.devicePixelRatio;

    this.camera.resize();

    this.renderer.resize();
  }

  private setConfig() : void {
    // this.config.debug = false;
    // pixel ratio
    const pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2);
    // width and height
    this.config = {
      debug: false,
      pixelRatio,
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  private setScene() : void {
    this.scene = new THREE.Scene();
  }

  private setCamera() : void {
    this.camera = new Camera();
  }

  private setRenderer(): void {
    this.renderer = new Renderer();
  }

  private setWorld(): void {
    this.world = new World();
  }

  public update() : void {
    this.camera.update();

    if (this.renderer) { this.renderer.update(); }

    window.requestAnimationFrame(() => {
      this.update();
    });
  }
}
