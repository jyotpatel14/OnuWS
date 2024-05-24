"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lobby = void 0;
class Lobby {
    constructor(lobbyId) {
        this.users = [];
        this.lobbyId = '';
        this.getRandomAlphanumericString = () => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < 6; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                result += characters[randomIndex];
            }
            return result;
        };
        if (lobbyId) {
            this.setLobbyId(lobbyId);
        }
        else {
            this.lobbyId = this.getRandomAlphanumericString();
        }
    }
    addUser(user) {
        this.users.push(user);
    }
    removeUser(remUser) {
        this.users = this.users.filter((user) => user != remUser);
    }
    getUsers() {
        return this.users;
    }
    setLobbyId(lobbyId) {
        this.lobbyId = lobbyId;
    }
    getLobbyId() {
        return this.lobbyId;
    }
}
exports.Lobby = Lobby;
