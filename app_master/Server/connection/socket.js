import {Server} from 'socket.io';
import jwt from 'jsonwebtoken';
import {config} from '../config.js';

class Socket {
    constructor(server){
        this.io = new Server(server, {
            cors:{
                origin : '*'
            }
        });

        this.io.use ((socket, next)=>{
            const token = socket.handshake.auth.token;
            if(!token){
                return next(new Error('Authentication error'));
            }
            jwt.verify(token, config.jwt.secret,(error, decoded) =>{
                if(error){
                    return next(new Error('Authentication error'));
                }
                next();
            });
        });
        this.io.on('connection', (socket)=>{
            console.log('socket Client connected!!!!!!!');
        })
    }
}

let socket;
export function initSocket(server){
    if(!socket){
        socket = new Socket(server)
    }
}


export function getSocketIO(){
    if(!socket){
        throw new Error('init를 먼저 호출해주세요!')
    }
    return socket.io
}



