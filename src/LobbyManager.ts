import { Lobby } from "./Lobby";
import { WebSocket } from "ws";
import { User } from "./User";
import { CREATELOBBY, DISCONNECTLOBBY, JOINLOBBY } from "./messages";


export class LobbyManager {
    private lobbies: Lobby[];

    constructor() {
        this.lobbies = [];
    }

    newUser(username: String, socket: WebSocket) {
        //create UserObject
        const user = new User(username, socket);
        this.addHandler(user, socket)
    }

    private addHandler(user: User, socket: WebSocket) {
        //Wait for NEW LOBBY on JOIN LOBBY
        socket.on('message', (data) => {
            const message = JSON.parse(data.toString());

            if (message.type === CREATELOBBY) {
                const lobby = new Lobby();
                this.lobbies.push(lobby);
                lobby.addUser(user);

                socket.send("username " + user.getUsername() + " lobbyId" + lobby.getLobbyId());
            }
            if (message.type === JOINLOBBY) {
                this.lobbies.forEach((lobby) => {
                    if (lobby.getLobbyId() == message.lobbyId) {
                        lobby.addUser(user);

                        socket.send("username " + user.getUsername() + " lobbyId" + lobby.getLobbyId());
                        lobby.getUsers().forEach((user) => {
                            socket.send("username " + user.getUsername());
                        });
                    }
                });
            }
            if (message.type === DISCONNECTLOBBY) {
                this.lobbies.some((lobby) => {
                    if (lobby.getLobbyId() === message.lobbyId) {
                        
                            lobby.removeUser(user);
                            
                            lobby.getUsers().forEach((user) => {
                                socket.send("username " + user.getUsername());
                            });

                            if (lobby.getUsers().length === 0){
                                socket.send("empty lobby");
                                this.lobbies = this.lobbies.filter((lobby)=> lobby.getLobbyId() != message.lobbyId);
                            }
                        
                    }
                })
                this.lobbies.forEach((lobby)=>{
                    socket.send(lobby.getLobbyId())
                })
            }
        })
    }
}