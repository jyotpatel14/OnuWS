"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const LobbyManager_1 = require("./LobbyManager");
const messages_1 = require("./messages");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const lobbyManager = new LobbyManager_1.LobbyManager();
wss.on('connection', function connection(ws) {
    ws.send('something');
    ws.on('message', (data) => {
        const message = JSON.parse(data.toString());
        if (message.type === messages_1.NEWUSER) {
            lobbyManager.newUser(message.username, ws);
        }
    });
    ws.on('close', () => {
    });
});
