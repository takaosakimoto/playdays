import { Injectable } from '@angular/core';
import { ActionNoPayload } from '../../engine/action';
import { FBClient } from '../../utils';
import { IFBAuthenticationStatus } from '../../interfaces';
import { MeStore } from '../../stores';


@Injectable()
export class FBAuthenticationAndSignupAction extends ActionNoPayload<IFBAuthenticationStatus> {

  constructor(
    private _fbClient: FBClient,
    private _meStore: MeStore
  ) {
    super();
  }

  onExecute(): void {
    this._fbClient.login()
      .then((result: IFBAuthenticationStatus) => {
        this._meStore.update({
          fbAuthenticationStatus: result
        });
        this.success$.next(result);
      }, (error) => {
        console.debug(error);
        this.error$.next(error);
      });
  }
}
