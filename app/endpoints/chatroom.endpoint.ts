import { Injectable } from '@angular/core';
import { ApiClient } from '../utils';
import { Endpoint, EndpointOptions } from '../engine/endpoint';
import { Chatroom } from '../models';

@Injectable()
export class ChatroomEndpoint extends Endpoint<Chatroom> {

  constructor(
    protected _apiClient: ApiClient,
    protected _endpointOptions: EndpointOptions
  ) {
    super(
      _apiClient,
      _endpointOptions,
      Chatroom,
      './chatrooms'
    );
  }
}
