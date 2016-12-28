import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { ApiClient } from '../utils';
import { Endpoint, EndpointOptions } from '../engine/endpoint';
import { Reminder } from '../models';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ReminderEndpoint extends Endpoint<Reminder> {

  constructor(
    protected _apiClient: ApiClient,
    protected _endpointOptions: EndpointOptions
  ) {
    super(
      _apiClient,
      _endpointOptions,
      Reminder,
      './reminders'
    );
  }

  archive(id: number): Observable<Reminder> {
    let o = this._apiClient
      .put(`./reminders/${id}/archive`, "", this._options.get())
      .map(res => this._reminderEndpointParseResponseData(res))
      .map(json => this._reminderEndpointCreateInstance(json))
      .share();

    o.subscribe(
      t => this._created$.next(t),
      e => console.error('error updating data', e)
    );

    return o;
  }

  markAsRead(id: number): Observable<Reminder> {
    let o = this._apiClient
      .put(`./reminders/${id}/mark_read`, "", this._options.get())
      .map(res => this._reminderEndpointParseResponseData(res))
      .map(json => this._reminderEndpointCreateInstance(json))
      .share();

    o.subscribe(
      t => this._created$.next(t),
      e => console.error('error updating data', e)
    );

    return o;
  }

  private _reminderEndpointCreateInstance(json: any): Reminder {
    var instance = new this._jsonNewFn(json);
    instance.deserializeFromJson(json);
    return instance;
  }

  private _reminderEndpointParseResponseData(res: Response): any {
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
