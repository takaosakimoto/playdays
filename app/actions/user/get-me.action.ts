import { Injectable } from '@angular/core';
import { Me } from '../../models';
import { MeEndpoint } from '../../endpoints';
import { MeStore } from '../../stores';
import { Action } from '../../engine/action';

@Injectable()
export class GetMeAction extends Action<number, Me> {

  constructor(
    private _meEndpoint: MeEndpoint,
    private _meStore: MeStore
  ) {
    super();
  }

  onExecute(id: number) {
    this._meEndpoint.fetchSingle(id)
      .subscribe(
        (me: Me): void => {
          this._meStore.update(me);
          this.success$.next(me);
        },
        e => this.error$.next(e)
      );
  }
}
