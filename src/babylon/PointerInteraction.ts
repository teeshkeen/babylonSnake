import { Mesh, PhysicsBody, PhysicsMotionType, PointerDragBehavior, Scene, Vector3 } from "@babylonjs/core";

export class PointerInteraction {
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    setupPointerDrag(boxes: Mesh[], aggregates: PhysicsBody[]) {
        const pointerDragBehavior = new PointerDragBehavior({ dragPlaneNormal: new Vector3(0, 1, 0) });
        pointerDragBehavior.useObjectOrientationForDragging = true;
        pointerDragBehavior.moveAttached = true;
        pointerDragBehavior.onDragObservable.add((event) => {
            boxes.forEach((i) => {
                i.position.addInPlace(event.delta);
            });
        });

        pointerDragBehavior.onDragStartObservable.add(() => {
            aggregates.forEach((agg) => {
                agg.setMotionType(PhysicsMotionType.STATIC);
            });
        });

        pointerDragBehavior.onDragEndObservable.add(() => {
            aggregates.forEach((agg) => {
                agg.setAngularVelocity(Vector3.Zero());
                agg.setLinearVelocity(Vector3.Zero());
                agg.setMotionType(PhysicsMotionType.DYNAMIC);
            });
        });

        boxes[0].addBehavior(pointerDragBehavior);
    }
}