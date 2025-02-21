import { ArcRotateCamera, Scene, Vector3 } from "@babylonjs/core";

export class CameraManager {
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    setupCamera() {
        const camera = new ArcRotateCamera('arcCam', Math.PI / 2, Math.PI / 2, 10, Vector3.Zero(), this.scene);
        camera.setPosition(new Vector3(0, 5, -5));
        camera.attachControl(this.scene, true);
    }
}
