import { Injectable } from '@angular/core';
import { ApiClient } from '../utils';
import { Endpoint, EndpointOptions } from '../engine/endpoint';
import { TrialClass } from '../models';

@Injectable()
export class TrialClassEndpoint extends Endpoint<TrialClass> {

  constructor(
    protected _apiClient: ApiClient,
    protected _endpointOptions: EndpointOptions
  ) {
    super(
      _apiClient,
      _endpointOptions,
      TrialClass,
      './trial_classes'
    );
  }
}
