import { User } from "./User";

export class Lobby {
    private users: User[] = [];
    private lobbyId: String = '';

    constructor(lobbyId?: String) {
        if (lobbyId){
            this.setLobbyId(lobbyId);
        }
        else {
            this.lobbyId = this.getRandomAlphanumericString();
        }
    }

    addUser(user: User){
        this.users.push(user);
    }
    removeUser(remUser: User){
        this.users = this.users.filter((user)=> user != remUser);
    }

    getUsers(){
        return this.users;
    }


    setLobbyId(lobbyId: String) {
        this.lobbyId = lobbyId;
    }
    getLobbyId() {
        return this.lobbyId;
    }

    getRandomAlphanumericString = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }

        return result;
    }

}