import { Injectable } from '@angular/core';
import { LogoutEndpoint } from '../../endpoints';
import { Action } from '../../engine/action';
import { ILogoutRequest, ISigninRequest } from '../../interfaces';
import { Me } from '../../models';

@Injectable()
export class LogoutAction extends Action<ILogoutRequest, Me> {

  constructor(
    private _logoutEndpoint: LogoutEndpoint
  ) {
    super();
  }

  onExecute(params: ILogoutRequest): void {
    this._logoutEndpoint.create(params)
      .subscribe(
        (r: Me): void => {
          this.success$.next(r);
        },
        e => this.error$.next(e)
      );
  }
}
