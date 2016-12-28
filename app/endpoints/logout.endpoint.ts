import { Injectable } from '@angular/core';
import { ApiClient } from '../utils';
import { Endpoint, EndpointOptions } from '../engine/endpoint';
import { Me } from '../models';

@Injectable()
export class LogoutEndpoint extends Endpoint<Me> {

  constructor(
    protected _apiClient: ApiClient,
    protected _endpointOptions: EndpointOptions
  ) {
    super(
      _apiClient,
      _endpointOptions,
      Me,
      './auth/logout'
    );
  }
}
