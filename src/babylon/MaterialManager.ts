import { Color3, Scene, StandardMaterial } from "@babylonjs/core";

export class MaterialManager {
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    createDefaultColor(): StandardMaterial {
        const material = new StandardMaterial('color', this.scene, true);
        material.diffuseColor = new Color3(1, 2, 0);

        return material;
    }

    createSelectedColor(): StandardMaterial {
        const material = new StandardMaterial('color', this.scene, true);
        material.diffuseColor = new Color3(0, 0, 0);

        return material
    }
}
