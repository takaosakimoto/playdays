import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ApiClient } from '../utils';
import { Endpoint, EndpointOptions } from '../engine/endpoint';
import { Session } from '../models';


@Injectable()
export class SessionEndpoint extends Endpoint<Session> {

  constructor(
    protected _apiClient: ApiClient,
    protected _endpointOptions: EndpointOptions
  ) {
    super(
      _apiClient,
      _endpointOptions,
      Session,
      './sessions'
    );
  }

  share(params:any): Observable<boolean> {
    return this._apiClient
      .post('./share_session', JSON.stringify(params), this._options.get())
      .map(res => this._sessionEndpointParseResponseData(res))
      .map(json => true)
      .share();
  }

  private _sessionEndpointParseResponseData(res: Response): any {
    if (res.status === 204) {
      return {};
    }
    let resJson = res.json();
    if (this._responseDataRoot && this._responseDataRoot !== '') {
      if (!(this._responseDataRoot in resJson)) {
        throw `'${this._responseDataRoot}' not appear as root of response json data`;
      }
      resJson = resJson[this._responseDataRoot];
    }
    return resJson;
  }
}
