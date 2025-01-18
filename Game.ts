import { GameObject, SerializedGameObject } from "./GameObject.ts";
import {default as Matter} from "matter-js";

type SerializedGame = {
    gameObjects: SerializedGameObject[]
}

export class Game{
    matter_engine: Matter.Engine;

    gameObjects: GameObject[];
    game_width: number = 300;
    game_height: number = 300;

    currentIDStack: number = 0;

    constructor(){
        this.gameObjects = [];
        this.matter_engine = Matter.Engine.create();
        this.matter_engine.world.gravity.y = 0;

        for(let i = 0; i < 10; i++){
            let ball = new GameObject(this.currentIDStack, {x: 100+i%5*100, y: 300+i/5*100})
            this.addGameObject(ball);
        }
    }
    
    addGameObject(gameObject: GameObject){
        this.gameObjects.push(gameObject);
        this.currentIDStack += 1;
        Matter.Composite.add(this.matter_engine.world, gameObject.body);
    }

    removeGameObject(gameObject: GameObject){
        this.gameObjects = this.gameObjects.filter((x) => x !== gameObject);
        Matter.Composite.remove(this.matter_engine.world, gameObject.body);
    }

    update(deltaTime: number){
        Matter.Engine.update(this.matter_engine, deltaTime);
        for(let go of this.gameObjects){
            go.update();
        }
    }

    serialize() : SerializedGame{
        const data: SerializedGame = {gameObjects: []};
        for(const gameObject of this.gameObjects){
            data.gameObjects.push(gameObject.serialize());
        }
        return data;
    }
}