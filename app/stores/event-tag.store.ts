import { Observable } from 'rxjs/Rx';
import { EventTag } from '../models';
import { CollectionStore } from '../engine/store';

export class EventTagStore extends CollectionStore<EventTag> {
  constructor() {
    super(EventTag);
  }

  get tags$(): Observable<Array<EventTag>> {
    return this.state$;
  }
}
