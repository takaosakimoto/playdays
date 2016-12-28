import {Injectable} from '@angular/core';
import {Socket} from 'phoenix-channels-client';
import {SocketClientOptions} from './socket-client-options';

@Injectable()
export class SocketClient extends Socket {

  constructor(private _options: SocketClientOptions) {
    super(_options.endpointUrl);
  }

}
