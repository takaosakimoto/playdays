import { Injectable } from '@angular/core';
import { ApiClient } from '../utils';
import { Endpoint, EndpointOptions } from '../engine/endpoint';
import { ChatMessage } from '../models';

@Injectable()
export class ChatMessageEndpoint extends Endpoint<ChatMessage> {

  constructor(
    protected _apiClient: ApiClient,
    protected _endpointOptions: EndpointOptions
  ) {
    super(
      _apiClient,
      _endpointOptions,
      ChatMessage,
      './chat_messages'
    );
  }
}
