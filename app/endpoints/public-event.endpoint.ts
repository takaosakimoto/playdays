import { Injectable } from '@angular/core';
import { ApiClient } from '../utils';
import { Endpoint, EndpointOptions } from '../engine/endpoint';
import { PublicEvent } from '../models';

@Injectable()
export class PublicEventEndpoint extends Endpoint<PublicEvent> {

  constructor(
    protected _apiClient: ApiClient,
    protected _endpointOptions: EndpointOptions
  ) {
    super(
      _apiClient,
      _endpointOptions,
      PublicEvent,
      './events'
    );
  }
}
