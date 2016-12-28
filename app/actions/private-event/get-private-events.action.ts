import { Injectable } from '@angular/core';
import { PrivateEvent } from '../../models';
import { PrivateEventEndpoint } from '../../endpoints';
import { PrivateEventStore } from '../../stores';
import { ActionNoPayload } from '../../engine/action';

@Injectable()
export class GetPrivateEventsAction extends ActionNoPayload<Array<PrivateEvent>> {

  constructor(
    private _privateEventEndpoint: PrivateEventEndpoint,
    private _privateEventStore: PrivateEventStore
  ) {
    super();
  }

  onExecute() {
    this._privateEventEndpoint.fetchMultiple()
      .subscribe(
        (privateEvents: Array<PrivateEvent>) => {
          this._privateEventStore.saveMany(privateEvents);
          this.success$.next(privateEvents);
        },
        e => this.error$.next(e)
      );
  }
}
