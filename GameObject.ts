import * as Matter from "matter-js";

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
    body: Matter.Body;

    constructor(id: number, position: Position){
        this.id = id;
        this.setPosition(position);
        let width = 50;
        let height = 50;
        let radius = (width + height) / 4;
        this.body = Matter.Bodies.circle(0, 0, radius);
    }

    setPosition(position: Matter.Vector) {
        Matter.Body.setPosition(this.body, position);
    }

    update(){
    if (this.body.position.x < 0) {
        Matter.Body.applyForce(this.body, this.body.position, { x: 5, y: 0 });
        }
        if (this.body.position.y < 0) {
        Matter.Body.applyForce(this.body, this.body.position, { x: 0, y: 5 });
        }
        if (this.body.position.x > 600) {
        Matter.Body.applyForce(this.body, this.body.position, { x: -5, y: 0 });
        }
        if (this.body.position.y > 600) {
        Matter.Body.applyForce(this.body, this.body.position, { x: 0, y: -5 });
        }
    }

    serialize() : SerializedGameObject{
        return {id: this.id, position: this.body.position};
    }
}