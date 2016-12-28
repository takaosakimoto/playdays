import { Subject, Observable} from 'rxjs/Rx';
import { Response, URLSearchParams } from '@angular/http';
import { JsonConstructable } from './interfaces';
import { ISerializable } from '../store';
import { EndpointOptions } from './endpoint-options';
import * as _ from 'lodash';

import {ApiClient} from '../../utils';

export abstract class Endpoint<T extends ISerializable<any>> {

  protected _single$ = new Subject<T>();
  protected _created$ = new Subject<T>();
  protected _multiple$ = new Subject<Array<T>>();
  protected _isSingleton: boolean = false;
  protected _responseDataRoot: string = 'data';

  constructor(
    protected _apiClient: ApiClient,
    protected _options: EndpointOptions,
    protected _jsonNewFn: JsonConstructable<T>,
    protected _dataUrl: string
  ) {
  }

  fetchSingle(id?: number | string): Observable<T> {
    let o = this._apiClient
      .get(this._singularUrl(id), this._options.get())
      .map(res => this._parseResponseData(res))
      .map(json => this._createInstance(json))
      .share();

    o.subscribe(
      t => this._single$.next(t),
      e => console.error('error fetching data')
    );
    return o;
  }

  fetchMultiple(queryParams?: any): Observable<Array<T>> {
    if (this._isSingleton) {
      throw 'Singleton resource cannot fetch multiple data';
    }

    let optionArgs = this._options.get();
    if (queryParams) {
      let x = _.reduce(queryParams, (qs, val, key) => {
        if (key) {
          if (qs !== '') {
            qs += `&`;
          }
          qs += `${key}=${val}`;
        }
        return qs;
      }, '');
      optionArgs.search = new URLSearchParams(x);
    }

    let o = this._apiClient
      // .get(this._pluralUrl(), this._options.get())
      .get(this._pluralUrl(), optionArgs)
      .map(res => this._parseResponseData(res))
      .map(jsonArray => jsonArray.map((json: any) => this._createInstance(json)))
      .share();

    o.subscribe(
      t => this._multiple$.next(t),
      e => console.error('error fetching data', e)
    );
    return o;
  }

  fetchMultipleWithParams(params: any): Observable<Array<T>> {
    if (this._isSingleton) {
      throw 'Singleton resource cannot fetch multiple data';
    }
    let url = `${this._pluralUrl()}/${this._queryString(params)}`;
    let o = this._apiClient
      .get(url, this._options.get())
      .map(res => this._parseResponseData(res))
      .map(jsonArray => jsonArray.map((json: any) => this._createInstance(json)))
      .share();

    o.subscribe(
      t => this._multiple$.next(t),
      e => console.error('error fetching data', e)
    );
    return o;
  }

  create(params: any): Observable<T> {
    console.log(JSON.stringify(params));
    let o = this._apiClient
      .post(this._pluralUrl(), JSON.stringify(params), this._options.get())
      .map((res): Object => this._parseResponseData(res))
      .map((json: Object): T => this._createInstance(json))
      .share();
    o.subscribe(
      t => this._created$.next(t),
      e => console.error('error creating data', e)
    );

    return o;
  }

  update(id: number | string, params: any): Observable<T> {
    let o = this._apiClient
      .put(this._singularUrl(id), JSON.stringify(params), this._options.get())
      .map(res => this._parseResponseData(res))
      .map(json => this._createInstance(json))
      .share();

    o.subscribe(
      t => this._created$.next(t),
      e => console.error('error updating data', e)
    );

    return o;
  }

  destroy(id?: number | string): Observable<boolean> {
    return this._apiClient
      .delete(this._singularUrl(id), this._options.get())
      .map(res => this._parseResponseData(res))
      .map(json => true)
      .share();
  }

  get single$(): Observable<T> {
    return this._single$;
  }

  get multiple$(): Observable<Array<T>> {
    return this._multiple$;
  }

  private _createInstance(json: any): T {
    var instance = new this._jsonNewFn(json);
    instance.deserializeFromJson(json);
    return instance;
  }

  private _singularUrl(id?: number | string): string {
    return (this._isSingleton || !id) ? `${this._dataUrl}` : `${this._dataUrl}/${id}`;
  }

  private _pluralUrl(): string {
    return `${this._dataUrl}`;
  }

  private _queryString(params): string {
    let keys = Object.keys(params);
    let queryString = keys
                       .reduce((a, k) => {
                         let query =  `${k}=${encodeURIComponent(params[k])}`;
                         a.push(query);
                         return a;
                       }, [])
                       .join('&');


    return `?${queryString}`;

  }

  private _parseResponseData(res: Response): any {
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
