import { Injectable } from '@angular/core';
import { ApiClient } from '../utils';
import { Endpoint, EndpointOptions } from '../engine/endpoint';
import { PrivateEvent } from '../models';

@Injectable()
export class PrivateEventEndpoint extends Endpoint<PrivateEvent> {

  constructor(
    protected _apiClient: ApiClient,
    protected _endpointOptions: EndpointOptions
  ) {
    super(
      _apiClient,
      _endpointOptions,
      PrivateEvent,
      './private_events'
    );
  }
}
