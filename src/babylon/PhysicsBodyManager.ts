import { Mesh, PhysicsBody, PhysicsMotionType, Scene } from "@babylonjs/core";

export class PhysicsBodyManager {
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    createPhysicsBody(boxes: Mesh[]): PhysicsBody[] {
        const aggregates = boxes.map((box) => {
            const agg = new PhysicsBody(box, PhysicsMotionType.DYNAMIC, false, this.scene);
            return agg;
        });
        return aggregates;
    }

    createPhysicGround(ground: Mesh): PhysicsBody {
        const body = new PhysicsBody(ground, PhysicsMotionType.DYNAMIC, true, this.scene);
        return body;
    }
    
}