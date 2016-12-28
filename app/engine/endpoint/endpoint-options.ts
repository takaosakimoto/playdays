import { Injectable } from '@angular/core';
import { Headers, RequestOptionsArgs } from '@angular/http';

@Injectable()

export abstract class EndpointOptions {

  get(): RequestOptionsArgs {
    return {
      headers: new Headers()
    };
  }
}
