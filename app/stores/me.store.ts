import { Observable } from 'rxjs/Rx';
import { ObjectStore } from '../engine/store';
import { Me } from '../models';
//import { IFBAuthenticationStatus } from '../interfaces';
import { IAuthenticationStatus } from '../interfaces';

export class MeStore extends ObjectStore<Me> {

  constructor() {
    super(Me);
  }

  public get loggedIn$(): Observable<boolean> {
    //return this._state$.map(s => !!s.id && !! s.fbUserId && s.fbAuthenticationStatus.status === 'connected');
    return this._state$.map(s => !!s.id && !! s.fbUserId && s.status === 'connected');
    //return this._state$.map(s=> false);
  }

  public get fbUserId$(): Observable<string> {
    return this._state$.map(s => s.fbUserId);
    //return this._state$.map(s=>'0');
  }

  public get fbAccessToken$(): Observable<string> {
    return this._state$.map(s => s.device.fbAccessToken);
  }

  //public get fbAuthenticationStatus$(): Observable<IFBAuthenticationStatus> {
  //  return this._state$.map((s): IFBAuthenticationStatus => s.fbAuthenticationStatus);
  //}

  public get authenticationStatus$(): Observable<IAuthenticationStatus> {
    return this._state$.map((s): IAuthenticationStatus => s.authenticationStatus);
  }

  public get me$(): Observable<Me> {
    return this.state$;
  }

}
