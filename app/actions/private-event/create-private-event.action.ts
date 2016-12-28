import { Injectable } from '@angular/core';
import { Action } from '../../engine/action';
import { ICreatePrivateEventRequest } from '../../interfaces';
import { PrivateEvent } from '../../models';
import { PrivateEventEndpoint } from '../../endpoints';
import { PrivateEventStore } from '../../stores';


@Injectable()
export class CreatePrivateEventAction extends Action<ICreatePrivateEventRequest, PrivateEvent> {

  constructor(
    private _privateEventEndpoint: PrivateEventEndpoint,
    private _privateEventStore: PrivateEventStore
  ) {
    super();
  }

  onExecute(params: ICreatePrivateEventRequest): void {
    this._privateEventEndpoint.create(params)
      .subscribe(
        (pe: PrivateEvent): void => {
          this._privateEventStore.saveOne(pe);
          this.success$.next(pe);
        },
        e => this.error$.next(e)
      );
  }
}
