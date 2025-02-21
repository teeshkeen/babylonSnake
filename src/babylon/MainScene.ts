import {
        Scene,
        Engine,
        Mesh,
        PointerEventTypes,
    } from '@babylonjs/core';
import { GUI } from './GUI';
import { CameraManager } from './CameraManager';
import { LightManager } from './LightManager';
import { PhysicsManager } from './PhysicsManager';

export class MainScene {
    private readonly scene: Scene;
    private readonly engine: Engine;
    private readonly cameraManager: CameraManager;
    private readonly lightManager: LightManager;
    private readonly physicsManager: PhysicsManager;
    private readonly guiManager: GUI;

    constructor(canvas: HTMLCanvasElement) {
        this.engine = new Engine(canvas, true);
        this.scene = new Scene(this.engine);

        this.physicsManager = new PhysicsManager(this.scene);
        this.physicsManager.enableHavokPhysics(this.scene);

        this.cameraManager = new CameraManager(this.scene);
        this.lightManager = new LightManager(this.scene);
        this.guiManager = new GUI(this.scene, this.engine);

        this.initScene();
        this.registerEvents();

        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }

    private initScene() {
        this.cameraManager.setupCamera();
        this.lightManager.turnOnLight();
        this.physicsManager.activatePhysics(this.scene);

        this.guiManager.createButton("Colors");
        this.guiManager.addMetadataInput();
    }

    private registerEvents() {
        this.scene.onPointerObservable.add((pointerInfo) => {
            switch (pointerInfo.type) {
                case PointerEventTypes.POINTERDOWN:
                    if (pointerInfo.pickInfo?.hit) {
                        const wasPickedMesh = pointerInfo.pickInfo.pickedMesh;
                        const material = "#3d23c5"
                        if (wasPickedMesh !== null && wasPickedMesh instanceof Mesh) {
                            this.guiManager.setCurrentMesh(wasPickedMesh, material);
                        }
                    }
                    break;
            }
        });
    }
}