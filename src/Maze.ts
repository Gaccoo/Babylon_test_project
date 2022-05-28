import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";

import { GameBase } from "./common/GameBase";
import {MazeMap} from "./components/mazeMap";
import maze from "../assets/maze.json";
import {AssetsManager} from "@babylonjs/core";
import {TextureId} from "./consts";

export class Maze extends GameBase {
    protected addContent(): void {
        this.boot()
            .then(() => {
                const map = new MazeMap(this.scene, maze.maze);
            })
    }

    private boot(): Promise<void> {
        const assetManager = new AssetsManager(this.scene);
        assetManager.addTextureTask("load-ground", TextureId.Ground)
        assetManager.addTextureTask("load-wall", TextureId.Wall)
        return assetManager.loadAsync();
    }
}
