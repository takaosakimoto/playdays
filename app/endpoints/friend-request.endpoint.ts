import { Injectable } from '@angular/core';
import { ApiClient } from '../utils';
import { Endpoint, EndpointOptions } from '../engine/endpoint';
import { FriendRequest } from '../models';

@Injectable()
export class FriendRequestEndpoint extends Endpoint<FriendRequest> {

  constructor(
    protected _apiClient: ApiClient,
    protected _endpointOptions: EndpointOptions
  ) {
    super(
      _apiClient,
      _endpointOptions,
      FriendRequest,
      './friend_requests'
    );
  }
}
