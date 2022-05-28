
import {
    HemisphericLight,
    Engine,
    Scene,
    Vector3,
    ArcRotateCamera,
    MeshBuilder,
    StandardMaterial, Texture
} from "@babylonjs/core";

export abstract class GameBase {
    protected readonly engine: Engine;
    protected readonly canvas: HTMLCanvasElement;
    protected readonly scene: Scene;

    public constructor() {
        this.canvas = this.createCanvas();
        this.engine = this.createEngine(this.canvas);
        this.scene = this.createScene(this.engine);
        this.createCamera(this.scene);
        this.createLight(this.scene);
        this.createSphere(this.scene)
        this.addContent();
        window.addEventListener("resize", this.onResize);
        this.engine.runRenderLoop(this.onRender);
    }
    public start(): void {
        this.onResize();
    }
    protected createCanvas(): HTMLCanvasElement {
        document.body.style.overflow = "hidden";
        const canvas = document.createElement("canvas");
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        document.body.appendChild(canvas);
        return canvas;
    }
    protected createEngine(canvas: HTMLCanvasElement): Engine {
        return new Engine(canvas, true, {}, true);
    }
    protected createScene(engine: Engine): Scene {
        return new Scene(engine, {});
    }
    protected createCamera(scene: Scene) {
        const camera = new ArcRotateCamera("camera", -Math.PI  * 0.5, Math.PI * 0.25, 12, Vector3.Zero(), scene);
        camera.attachControl();
    }
    protected createLight(scene: Scene) {
        const lights = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    }

    protected createSphere(scene: Scene) {
        const sphere = MeshBuilder.CreateSphere("sphere", {}, scene)
        const material = new StandardMaterial("material", scene)
        sphere.material = material;

        material.diffuseTexture = new Texture("https://www.babylonjs-playground.com/textures/bloc.jpg", scene)
    }


    protected abstract addContent(): void;
    private onRender = () => {
        this.scene.render();
    }
    private onResize = () =>  {
        this.engine.resize();
    }
}
