import { Injectable } from '@angular/core';
import { ApiClient } from '../utils';
import { Endpoint, EndpointOptions } from '../engine/endpoint';
import { ChatParticipation } from '../models';

@Injectable()
export class ChatParticipationEndpoint extends Endpoint<ChatParticipation> {

  constructor(
    protected _apiClient: ApiClient,
    protected _endpointOptions: EndpointOptions
  ) {
    super(
      _apiClient,
      _endpointOptions,
      ChatParticipation,
      './chat_participations'
    );
  }
}
