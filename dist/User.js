"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(username, socket) {
        this.username = username;
        this.socket = socket;
        console.log("username constructor" + username);
    }
    getUsername() {
        return this.username;
    }
}
exports.User = User;
