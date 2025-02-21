import { HemisphericLight, Scene, Vector3 } from "@babylonjs/core";

export class LightManager {
    private scene: Scene

    constructor(scene: Scene) {
        this.scene = scene;
    }

    turnOnLight() {
        const light = new HemisphericLight('light', new Vector3(0, 1, 0), this.scene);
        light.intensity = 0.7;
    }
}