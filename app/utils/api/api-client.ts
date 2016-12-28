import { Injectable } from '@angular/core';
import {
  Http,
  Headers,
  RequestOptionsArgs,
  RequestMethod,
  Response
} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ApiClientOptions } from './api-client-options';

// TODO auth token
// TODO HTTP error handling

@Injectable()
export class ApiClient {

  constructor(private _http: Http, private _options: ApiClientOptions) {
    console.debug('ApiClientOptions:', _options);
    if (_options.baseUrl === undefined || _options.baseUrl.length <= 0) {
      throw 'baseUrl in ApiClientOptions must be set';
    }
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._makeRequest({ url: url, method: RequestMethod.Get }, options);
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._makeRequest({ url: url, body: body, method: RequestMethod.Post }, options);
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._makeRequest({ url: url, body: body, method: RequestMethod.Put }, options);
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._makeRequest({ url: url, method: RequestMethod.Delete }, options);
  }

  patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._makeRequest({ url: url, body: body, method: RequestMethod.Patch }, options);
  }

  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this._makeRequest({ url: url, method: RequestMethod.Head }, options);
  }

  private _makeRequest(
    requestArgs: RequestOptionsArgs,
    additionalOptions: RequestOptionsArgs
  ): Observable<Response> {

    additionalOptions = additionalOptions || {};
    additionalOptions.method = additionalOptions.method || requestArgs.method;
    additionalOptions.body = additionalOptions.body || requestArgs.body;
    additionalOptions.url = additionalOptions.url || `${this._options.baseUrl}/${requestArgs.url}`;
    additionalOptions.headers = additionalOptions.headers || new Headers();
    additionalOptions.headers.append('Content-Type', 'application/json');
    return this._http.request(requestArgs.url, additionalOptions);
  }
}
