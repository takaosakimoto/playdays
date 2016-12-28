import { Injectable } from '@angular/core';
import { ApiClient } from '../utils';
import { Endpoint, EndpointOptions} from '../engine/endpoint';
import { VerifiedAccessToken, Me } from '../models';
import * as _ from 'lodash';

class VerifyToken extends VerifiedAccessToken {
  public me: Me
  deserializeFromJson(json: any): VerifyToken {
    super.deserializeFromJson(json);
    this.me = _.get(json, 'me', null);
    return this;
  }
}

@Injectable()
export class VerifyAccessTokenEndpoint extends Endpoint<VerifyToken> {

  constructor(
    protected _apiClient: ApiClient,
    protected _endpointOptions: EndpointOptions
  ) {
    super(
      _apiClient,
      _endpointOptions,
      VerifyToken,
      './verify_access_tokens'
    );
  }
}
