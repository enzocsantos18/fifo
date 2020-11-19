import io, { Socket } from 'socket.io';
import { Server } from 'http';
import { ISubscribeMessage } from './types';

export function createSocket(server: Server) {
    const socket = new io.Server(server, {
        cors: {
            origin: '*',
        },
    });

    socket.on('connection', (client: Socket) => {
        client.on('subscribe', ({ room }: ISubscribeMessage) => {
            if (room) {
                client.join(room);
            }
        });
    });

    return socket;
}