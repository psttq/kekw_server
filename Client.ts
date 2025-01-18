import { GameObject, Position } from "./GameObject.ts";

export class Client{
    socket: WebSocket;
    gameObject: GameObject | undefined;
    ballRadius: number = 50;

    ball: GameObject;

    constructor(socket: WebSocket, gameObject: GameObject | undefined, ball: GameObject){
        this.socket = socket;
        this.gameObject = gameObject;
        this.ball = ball
    }

    update(mouse_x: number, mouse_y: number){
        let vec_x = mouse_x - this.gameObject?.body.position.x;
        let vec_y = mouse_y - this.gameObject?.body.position.y;
  
        const length = Math.sqrt(vec_x * vec_x + vec_y * vec_y);
        vec_x /= length;
        vec_y /= length;
  
        const ball_position_x = this.gameObject?.body.position.x + vec_x * (this.ballRadius + 10);
        const ball_position_y = this.gameObject?.body.position.y + vec_y * (this.ballRadius + 10);
  
        if (Number.isNaN(ball_position_x) || Number.isNaN(ball_position_y)) return;
  
        this.ball.setPosition({x: ball_position_x, y: ball_position_y});
    }
}