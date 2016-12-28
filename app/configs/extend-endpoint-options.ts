import { Injectable } from '@angular/core';
import { Device } from 'ionic-native';
import { EndpointOptions } from '../engine/endpoint';
import { MeStore } from '../stores';
import { Headers, RequestOptionsArgs } from '@angular/http';
//import { IFBAuthenticationStatus } from '../interfaces';
import { IAuthenticationStatus } from '../interfaces';

@Injectable()
export class ExtendEndpointOptions extends EndpointOptions {
  //private _fbAuthenticationStatus: IFBAuthenticationStatus;
  private _authenticationStatus: IAuthenticationStatus;

  constructor(
    private _meStore: MeStore
  ) {
    super();
    //this._meStore.fbAuthenticationStatus$.subscribe(
    //  data => this._fbAuthenticationStatus = data
    //);
    this._meStore.authenticationStatus$.subscribe(
      data => this._authenticationStatus = data
    );
  }

  //get(): RequestOptionsArgs {
  //  let requestOptions;
  //  let deviceUUID = Device.device.uuid;
  //  if (this._fbAuthenticationStatus) {
  //    let authResponse = this._fbAuthenticationStatus.authResponse;
  //    let userID = authResponse.userID;
  //    let accessToken = authResponse.accessToken;
  //   requestOptions = {
  //      headers: new Headers({
  //        'x-device-uuid': deviceUUID,
  //        'x-fb-user-id': userID,
  //        'x-fb-access-token': accessToken,
  //      })
  //    };
  //  } else {
  //    requestOptions = {
  //      headers: new Headers({
  //        'x-device-uuid': deviceUUID,
  //      })
  //   };
  //  }
  //  return requestOptions;
  //}

  get(): RequestOptionsArgs {
    let requestOptions;
    let deviceUUID = Device.device.uuid;

    if(window.localStorage.getItem('authorized')=='activated'){
      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
      requestOptions = {
        headers: new Headers({
          'x-device-uuid': deviceUUID,
          'x-user-id': window.localStorage.getItem('userID'),
          'x-access-token': window.localStorage.getItem('token'),
        })
      };
    }else{
      requestOptions = {
        headers: new Headers({
          'x-device-uuid': deviceUUID,
        })
      };
    }
    return requestOptions;
  }
}
