import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer() server: Server;
  @SubscribeMessage('listen-box')
  message(@ConnectedSocket() socket: Socket) {
    socket.join('listen-box');
  }

  async addItemBox(id: number) {
    this.server.to('listen-box').emit('add-item', id);
  }
}
