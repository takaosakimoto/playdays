import { Injectable } from '@angular/core';

export class ApiClientOptions {
  baseUrl: string;
};

@Injectable()
export class DefaultApiClientOptions extends ApiClientOptions {
  public baseUrl: string = './consumer/v1';
}
