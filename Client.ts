import { GameObject } from "./GameObject.ts";

export class Client{
    socket: WebSocket;
    gameObject: GameObject | undefined;

    constructor(socket: WebSocket, gameObject: GameObject | undefined){
        this.socket = socket;
        this.gameObject = gameObject;
    }
}