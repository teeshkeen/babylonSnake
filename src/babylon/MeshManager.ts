import { Mesh, MeshBuilder, Scene, Vector3 } from "@babylonjs/core";
import { MaterialManager } from "./MaterialManager";

export class MeshManager {
    private scene: Scene;
    private readonly materialManager: MaterialManager;

    constructor(scene: Scene) {
        this.scene = scene;
        this.materialManager = new MaterialManager(scene);
    }

    createBoxes(count: number, scene: Scene): Mesh[] {
        const boxes: Mesh[] = [];
        const material = this.materialManager.createDefaultColor();
        for (let i = 0; i < count; i++) {
            const box = this.createBoxMesh(`box${i + 1}`, { width: 1, height: 0.5, depth: 0.5 }, scene);
            box.position = new Vector3(i + 1, 1, 0);
            box.scaling = new Vector3(1, 1, 1);
            box.material = material;
            box.metadata = `box${i + 1}`;
            boxes.push(box);
        }

        return boxes;
    }

    createBoxMesh(name: string, size: any, scene: Scene): Mesh {
        const mesh = MeshBuilder.CreateBox(name, size, scene);
        return mesh;
    }

    createGround(name: string, size: any, scene: Scene): Mesh {
        const ground = MeshBuilder.CreateGround(name, size, scene);

        return ground;
    }

}

