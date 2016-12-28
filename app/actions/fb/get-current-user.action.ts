import { Injectable } from '@angular/core';
import { ActionNoPayload } from '../../engine/action';
import { FBClient } from '../../utils';
import { IFBCurrentUser } from '../../interfaces';
import { MeStore } from '../../stores';




@Injectable()
export class GetFBCurrentUserAction extends ActionNoPayload<IFBCurrentUser> {

  constructor(
    private _fbClient: FBClient,
    private _meStore: MeStore
  ) {
    super();
  }

  onExecute(): void {
    this._fbClient.api('/me?fields=id,name,email')
      .then((result: IFBCurrentUser) => {
        this._meStore.update({
          fbCurrentUser: result
        });
        this.success$.next(result);
      }, (error) => {
        console.debug(error);
        this.error$.next(error);
      });
  }
}
