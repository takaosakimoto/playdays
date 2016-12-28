/// <reference path="../typings/globals/node/index.d.ts" />

import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig {

  public apiBaseUrl: string;
  public websocketUrl: string;

  constructor() {
    const APP_CONFIG = process.env['APP_CONFIG'];
    this.apiBaseUrl = APP_CONFIG.apiBaseUrl;
    this.websocketUrl = APP_CONFIG.websocketUrl;
  }
}
