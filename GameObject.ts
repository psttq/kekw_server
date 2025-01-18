import {default as Matter} from "matter-js";


export type Position = {
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
        let width = 50;
        let height = 50;
        let radius = (width + height) / 4;
        this.body = Matter.Bodies.circle(0, 0, radius);

        this.setPosition(position);
    }

    setPosition(position: Matter.Vector) {
        if(this.body)
            Matter.Body.setPosition(this.body, position);
    }

    update(){
    if (this.body.position.x < 0) {
        Matter.Body.applyForce(this.body, this.body.position, { x: 0.001, y: 0 });
        }
        if (this.body.position.y < 0) {
        Matter.Body.applyForce(this.body, this.body.position, { x: 0, y: 0.001 });
        }
        if (this.body.position.x > 600) {
        Matter.Body.applyForce(this.body, this.body.position, { x: -0.001, y: 0 });
        }
        if (this.body.position.y > 600) {
        Matter.Body.applyForce(this.body, this.body.position, { x: 0, y: -0.001 });
        }
    }

    serialize() : SerializedGameObject{
        return {id: this.id, position: this.body.position};
    }
}