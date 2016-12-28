import { Injectable } from '@angular/core';
import { PublicEvent } from '../../models';
import { PublicEventEndpoint } from '../../endpoints';
import { PublicEventStore } from '../../stores';
import { ActionNoPayload } from '../../engine/action';

@Injectable()
export class GetPublicEventsAction extends ActionNoPayload<Array<PublicEvent>> {

  constructor(
    private _publicEventEndpoint: PublicEventEndpoint,
    private _publicEventStore: PublicEventStore
  ) {
    super();
  }

  onExecute() {
    this._publicEventEndpoint.fetchMultiple()
      .subscribe(
        (publicEvents: Array<PublicEvent>) => {
          this._publicEventStore.saveMany(publicEvents);
          this.success$.next(publicEvents);
        },
        e => this.error$.next(e)
      );
  }
}
