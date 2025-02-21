import { Mesh, PhysicsBody, PhysicsMotionType, Scene } from "@babylonjs/core";

export class PhysicsBodyManager {
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    createPhysicsBody(boxes: Mesh[], disablePreStep: boolean): PhysicsBody[] {
        const aggregates = boxes.map((box) => {
            const agg = new PhysicsBody(box, PhysicsMotionType.DYNAMIC, false, this.scene);
            agg.disablePreStep = disablePreStep;

            return agg;
        });
        return aggregates;
    }
}