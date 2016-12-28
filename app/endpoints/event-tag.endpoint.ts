import { Injectable } from '@angular/core';
import { ApiClient } from '../utils';
import { Endpoint, EndpointOptions } from '../engine/endpoint';
import { EventTag } from '../models';

@Injectable()
export class EventTagEndpoint extends Endpoint<EventTag> {

  constructor(
    protected _apiClient: ApiClient,
    protected _endpointOptions: EndpointOptions
  ) {
    super(
      _apiClient,
      _endpointOptions,
      EventTag,
      './event_tags'
    );
  }
}
