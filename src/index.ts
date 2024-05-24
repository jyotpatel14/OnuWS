import { WebSocketServer } from 'ws';
import { LobbyManager } from './LobbyManager';
import { NEWUSER } from './messages';

const wss = new WebSocketServer({ port:8080 });

const lobbyManager = new LobbyManager();

wss.on('connection', function connection(ws){

    ws.send('something');

    ws.on('message', (data)=>{
        const message = JSON.parse(data.toString());

        if (message.type === NEWUSER){
            lobbyManager.newUser(message.username,ws);
        }
    })

    ws.on('close',()=>{
        
    })
})