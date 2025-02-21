import { HavokPlugin, MeshBuilder, Physics6DoFConstraint, PhysicsConstraintAxis, Scene, Vector3 } from "@babylonjs/core";
import { MeshManager } from "./MeshManager";
import { PhysicsBodyManager } from "./PhysicsBodyManager";
import { PointerInteraction } from "./PointerInteraction";
import { PhysicsBody, PhysicsHelper, PhysicsImpostor, PhysicsMotionType } from "@babylonjs/core/Physics";
import HavokPhysics from '@babylonjs/havok';

export class PhysicsManager {
    private scene: Scene;
    private readonly meshManager: MeshManager;
    private readonly bodyManager: PhysicsBodyManager;
    private readonly pointerManager: PointerInteraction;
    constructor(scene: Scene) {
        this.scene = scene;
        this.meshManager = new MeshManager(scene);
        this.bodyManager = new PhysicsBodyManager(scene);
        this.pointerManager = new PointerInteraction(scene);
    }

    async enableHavokPhysics(scene: Scene) {
        try {
            const havokInstance = await HavokPhysics();
            const hk = new HavokPlugin(true, havokInstance);
            scene.enablePhysics(new Vector3(0, 0, 0), hk);
        } catch (error) {
            console.error("Failed to load HavokPhysics:", error);
        }
    }

    async activatePhysics(scene: Scene) {
        await this.enableHavokPhysics(scene);

        // const ground = this.meshManager.createGround('ground', { width: 20, height: 20 }, scene);
        // const groundBoy = this.bodyManager.createPhysicGround(ground);
        // groundBoy.setMassProperties({ mass: 10000 })
        // ground.physicsBody = groundBoy;

        const boxes = this.meshManager.createBoxes(4, scene);
        const aggregates = this.bodyManager.createPhysicsBody(boxes);

        // for (let i = 0; i < boxes.length; i++) {
        //     aggregates[i].setMassProperties({ mass: 10 });
        //     boxes[i].physicsBody = aggregates[i];
        // }

        for (let i = 0; i < boxes.length - 1; i++) {
            const sixDoF = new Physics6DoFConstraint(
                {
                    pivotA: new Vector3(0, 0, 0),
                    axisA: new Vector3(0, 0, 0),
                    pivotB: new Vector3(0, 0, 0),
                    axisB: new Vector3(0, 0, 0),
                    collision: true
                },
                [
                    {
                        axis: PhysicsConstraintAxis.LINEAR_X,
                        minLimit: 1,
                        maxLimit: 1.2
                    },
                    {
                        axis: PhysicsConstraintAxis.LINEAR_Y, 
                        minLimit: 0,
                        maxLimit: 0.2
                    },
                    {
                        axis: PhysicsConstraintAxis.LINEAR_Z, 
                        minLimit: 0,
                        maxLimit: 0
                    },
                    {
                        axis: PhysicsConstraintAxis.ANGULAR_X, 
                        minLimit: 0,
                        maxLimit: 0
                    },
                    {
                        axis: PhysicsConstraintAxis.ANGULAR_Y, 
                        minLimit: 0,
                        maxLimit: 0
                    },
                    {
                        axis: PhysicsConstraintAxis.ANGULAR_Z, 
                        minLimit: 0,
                        maxLimit: 0
                    }
                ],
                scene
            );
            aggregates[i].addConstraint(aggregates[i + 1], sixDoF);
        }   
        this.pointerManager.setupPointerDrag(boxes, aggregates);
    }
}