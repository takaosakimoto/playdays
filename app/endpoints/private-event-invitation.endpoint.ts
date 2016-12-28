import { Injectable } from '@angular/core';
import { ApiClient } from '../utils';
import { Endpoint, EndpointOptions } from '../engine/endpoint';
import { PrivateEventInvitation } from '../models';

@Injectable()
export class PrivateEventInvitationEndpoint extends Endpoint<PrivateEventInvitation> {

  constructor(
    protected _apiClient: ApiClient,
    protected _endpointOptions: EndpointOptions
  ) {
    super(
      _apiClient,
      _endpointOptions,
      PrivateEventInvitation,
      './private_event_invitations'
    );
  }
}
