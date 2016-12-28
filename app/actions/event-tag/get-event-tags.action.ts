import { Injectable } from '@angular/core';
import { EventTag } from '../../models';
import { EventTagEndpoint } from '../../endpoints';
import { EventTagStore } from '../../stores';
import { ActionNoPayload } from '../../engine/action';

@Injectable()
export class GetEventTagsAction extends ActionNoPayload<Array<EventTag>> {

  constructor(
    private _eventTagEndpoint: EventTagEndpoint,
    private _eventTagStore: EventTagStore
  ) {
    super();
  }

  onExecute() {
    this._eventTagEndpoint.fetchMultiple()
      .subscribe(
        (event_tags: Array<EventTag>) => {
          this._eventTagStore.saveMany(event_tags);
          this.success$.next(event_tags);
        },
        e => this.error$.next(e)
      );
  }
}
