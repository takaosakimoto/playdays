import { Injectable } from '@angular/core';
import { ApiClient } from '../utils';
import { Endpoint, EndpointOptions } from '../engine/endpoint';
import { Category } from '../models';

@Injectable()
export class CategoryEndpoint extends Endpoint<Category> {

  constructor(
    protected _apiClient: ApiClient,
    protected _endpointOptions: EndpointOptions
  ) {
    super(
      _apiClient,
      _endpointOptions,
      Category,
      './categories'
    );
  }
}
