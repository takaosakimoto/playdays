import { Injectable } from '@angular/core';
import { BaseChannel } from '../engine/channel';
import { SocketClient } from '../utils';

@Injectable()
export class ChatroomChannel extends BaseChannel {

  constructor(_socket: SocketClient) {
    super(_socket);
  }
}
