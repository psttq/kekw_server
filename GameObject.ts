type Position = {
    x: number,
    y: number
};

export type SerializedGameObject = {
    id: number;
    position: Position;
};


export class GameObject{
    id: number;
    position: Position;

    constructor(id: number, position: Position){
        this.id = id;
        this.position = position;
    }

    serialize() : SerializedGameObject{
        return {id: this.id, position: this.position};
    }
}