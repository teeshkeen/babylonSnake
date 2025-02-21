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
        // disable prestep false, only 1 static
        pointerDragBehavior.onDragStartObservable.add(() => {
            aggregates.forEach((agg, index) => {
                if (index === 0) {
                    console.log(index);
                    agg.setMotionType(PhysicsMotionType.STATIC);
                    agg.disablePreStep = false;
                }
            });
        });

        pointerDragBehavior.onDragEndObservable.add(() => {
            aggregates.forEach((agg, index) => {
                agg.setLinearVelocity(Vector3.Zero());
                agg.setAngularVelocity(Vector3.Zero());

                if (index === 0) {
                    agg.setMotionType(PhysicsMotionType.DYNAMIC);
                    agg.disablePreStep = true;
                }
            });
        });

        boxes[0].addBehavior(pointerDragBehavior);
    }
}