"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LobbyManager = void 0;
const Lobby_1 = require("./Lobby");
const User_1 = require("./User");
const messages_1 = require("./messages");
class LobbyManager {
    constructor() {
        this.lobbies = [];
    }
    newUser(username, socket) {
        //create UserObject
        const user = new User_1.User(username, socket);
        this.addHandler(user, socket);
    }
    addHandler(user, socket) {
        //Wait for NEW LOBBY on JOIN LOBBY
        socket.on('message', (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === messages_1.CREATELOBBY) {
                const lobby = new Lobby_1.Lobby();
                this.lobbies.push(lobby);
                lobby.addUser(user);
                socket.send("username " + user.getUsername() + " lobbyId" + lobby.getLobbyId());
            }
            if (message.type === messages_1.JOINLOBBY) {
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
            if (message.type === messages_1.DISCONNECTLOBBY) {
                this.lobbies.some((lobby) => {
                    if (lobby.getLobbyId() === message.lobbyId) {
                        lobby.removeUser(user);
                        lobby.getUsers().forEach((user) => {
                            socket.send("username " + user.getUsername());
                        });
                        if (lobby.getUsers().length === 0) {
                            socket.send("empty lobby");
                            this.lobbies = this.lobbies.filter((lobby) => lobby.getLobbyId() != message.lobbyId);
                        }
                    }
                });
                this.lobbies.forEach((lobby) => {
                    socket.send(lobby.getLobbyId());
                });
            }
        });
    }
}
exports.LobbyManager = LobbyManager;
