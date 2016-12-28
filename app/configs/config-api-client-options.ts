import { Injectable } from '@angular/core';
import { ApiClientOptions } from '../utils';
import { AppConfig } from '../app.config';

@Injectable()
export class ConfigApiClientOptions extends ApiClientOptions {

  constructor(appConfig: AppConfig) {
    super();
    this.baseUrl = appConfig.apiBaseUrl;
  }
}
