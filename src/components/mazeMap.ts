import {MeshBuilder, Scene, StandardMaterial, Texture, Vector3} from "@babylonjs/core";
import {TextureId} from "../consts";

enum Cell {
    Wall = 1,
    Ground = 0,
    PlayerStart = 2,
}

const cellSize = 1.5;
const wallHeight = 2;

export class MazeMap {
    public readonly playerStartPosition: Vector3 = new Vector3(0, 0, 0);
    public constructor(scene: Scene, source: Cell[]) {
        this.generateMap(scene, source);
    }
    private generateMap(scene: Scene, source: Cell[]): void {
        const mapSize = Math.sqrt(source.length);
        const mapWidth = mapSize * cellSize;
        const mapHeight = mapSize * cellSize;
        //Ground
        const groundMaterial = new StandardMaterial("ground-material", scene)
        const groundTexture = scene.getTextureByName(TextureId.Ground) as Texture;
        groundTexture.uScale = 20;
        groundTexture.vScale = 20;
        groundMaterial.diffuseTexture = scene.getTextureByName(TextureId.Ground);
        //Walls
        const wallMaterial = new StandardMaterial("wall-material", scene)
        const wallTexture = scene.getTextureByName(TextureId.Wall) as Texture;
        wallMaterial.diffuseTexture = scene.getTextureByName(TextureId.Wall);

        const ground = MeshBuilder.CreateGround("ground", { width: mapWidth, height: mapHeight }, scene);
        ground.material = groundMaterial;


            for (let i = 0; i < source.length; i++) {
                const column = i % mapSize;
                const row = Math.floor(i / mapSize);
                const cellType = source[i];
                const position = new Vector3(mapWidth * 0.5 -cellSize * 0.5 -cellSize * column,
                    0,
                    -mapHeight * 0.5 +cellSize * 0.5 +cellSize * row);
                if(cellType === Cell.Wall) {
                    const wall = MeshBuilder.CreateBox(`wall-${i}`, {width: cellSize, depth: cellSize, height: wallHeight}, scene);
                    wall.material = wallMaterial;
                    wall.position.set(
                        position.x,
                        wallHeight * 0.5,
                        position.z
                    )
                }
            }
    }
}
