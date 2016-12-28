import { Injectable } from '@angular/core';
import { LoginEndpoint } from '../../endpoints';
import { MeStore } from '../../stores';
import { Action } from '../../engine/action';
import { ISigninRequest } from '../../interfaces';
import { Me } from '../../models';

@Injectable()
export class SigninAction extends Action<ISigninRequest, Me> {

  constructor(
    private _loginEndpoint: LoginEndpoint,
    private _meStore: MeStore
  ) {
    super();
  }

  onExecute(params: ISigninRequest): void {
    this._loginEndpoint.create(params)
      .subscribe(
        (r: Me): void => {
          this._meStore.update(r);
          this.success$.next(r);
        },
        e => this.error$.next(e)
      );
  }
}
