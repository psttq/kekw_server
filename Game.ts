import { GameObject, SerializedGameObject } from "./GameObject.ts";

type SerializedGame = {
    gameObjects: SerializedGameObject[]
}

export class Game{
    gameObjects: GameObject[];
    game_width: number = 300;
    game_height: number = 300;
    constructor(){
        this.gameObjects = [];
    }
    
    addGameObject(gameObject: GameObject){
        this.gameObjects.push(gameObject);
    }

    serialize() : SerializedGame{
        const data: SerializedGame = {gameObjects: []};
        for(const gameObject of this.gameObjects){
            data.gameObjects.push(gameObject.serialize());
        }
        return data;
    }
}