import { Injectable} from '@angular/core';
import { SocketClientOptions } from '../utils';
import { AppConfig } from '../app.config';

@Injectable()
export class ConfigSocketClientOptions extends SocketClientOptions {

  constructor(appConfig: AppConfig) {
    super();
    this.endpointUrl = appConfig.websocketUrl;
  }
}
