import { WebSocket } from "ws";

export class User{
    public username: String;
    public socket : WebSocket;

    constructor(username:String, socket:WebSocket){
        this.username = username;
        this.socket = socket;
        console.log("username constructor" + username);
    }
    getUsername(){
        return this.username;
    }
}