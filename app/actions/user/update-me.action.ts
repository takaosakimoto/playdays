import { Injectable } from '@angular/core';
import { Action } from '../../engine/action';
import { IUpdateMeRequest } from '../../interfaces';
import { Me } from '../../models';
import { MeEndpoint } from '../../endpoints';
import { MeStore } from '../../stores';

@Injectable()
export class UpdateMeAction extends Action<IUpdateMeRequest, Me> {

  constructor(
    private _meEndpoint: MeEndpoint,
    private _meStore: MeStore
  ) {
    super();
  }

  onExecute(request: IUpdateMeRequest): void {
    this._meEndpoint.update(null, request)
      .subscribe(
        (me: Me): void => {
          this._meStore.update(me);
          this.success$.next(me);
        },
        e => this.error$.next(e)
      );
  }
}
