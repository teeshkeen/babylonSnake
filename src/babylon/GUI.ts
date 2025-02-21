import { Engine, StandardMaterial, Mesh, Color3, Scene } from "@babylonjs/core";
import { AdvancedDynamicTexture, Button, Control, InputText, Rectangle, StackPanel } from "@babylonjs/gui";

export class GUI {
    private scene: Scene;
    private engine: Engine;
    private adt: AdvancedDynamicTexture;
    private materials: string[];
    private meshes: Mesh[] = [];
    private currentMesh: Mesh | null = null;
    private metadataInput!: InputText;

    constructor(scene: Scene, engine: Engine) {
        this.scene = scene;
        this.engine = engine;
        this.adt = AdvancedDynamicTexture.CreateFullscreenUI("UI");
        this.materials = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ffa500"];
    }

    public createButton(text: string) {
        const button = Button.CreateSimpleButton("button", text);
        button.width = "150px";
        button.height = "40px";
        button.cornerRadius = 20;
        button.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        button.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        button.color = "white";
        button.background = "green";
        button.onPointerUpObservable.add(() => {
            this.toggleColorPicker();
        });
        this.adt.addControl(button);
    }

    public toggleColorPicker() {
        const colorPicker = this.adt.getControlByName("colorPicker") as Control;
        if (!colorPicker) {
            this.createColorPicker();
        } else {
            colorPicker.isVisible = !colorPicker.isVisible;
        }
    }

    public createColorPicker() {
        const panel = new StackPanel();
        panel.isVertical = false;
        panel.width = "200px";
        panel.height = "120px";
        panel.background = "rgba(255, 255, 255, 0.7)";
        panel.isVisible = true;
        panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        panel.top = "80px";

        for (let i = 0; i < this.materials.length; i++) {
            const rect = new Rectangle;
            rect.width = "40px";
            rect.height = "40px";
            rect.thickness = 0;
            rect.top = `-40px`;
            rect.background = this.materials[i];
            rect.onPointerDownObservable.add(() => {
                this.changeMeshColor(rect.background);
            });
            panel.addControl(rect);
        }

        this.adt.addControl(panel);
        panel.name = "colorPicker";
    }

    public changeMeshColor(hexColor: string) {
        if (this.currentMesh) {
            const material = new StandardMaterial("mat", this.scene);
            material.diffuseColor = Color3.FromHexString(hexColor);
            this.currentMesh.material = material;
        }
    }

    public addMetadataInput() {
        this.metadataInput = new InputText();
        this.metadataInput.width = "200px";
        this.metadataInput.height = "40px";
        this.metadataInput.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.metadataInput.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        this.metadataInput.placeholderText = "Metadata";
        this.metadataInput.isReadOnly = true;
        this.metadataInput.color = "black";
        this.metadataInput.background = "white";
        this.adt.addControl(this.metadataInput);
    }

    public setCurrentMesh(mesh: Mesh, color: string) {
        this.currentMesh = mesh;
        this.changeMeshColor(color);
        this.updateMetadataInput();
    }

    public updateMetadataInput() {
        if (this.currentMesh) {
            this.metadataInput.text = this.currentMesh.metadata || "";
        } else {
            this.metadataInput.text = "";
        }
    }
}