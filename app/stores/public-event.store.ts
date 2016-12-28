import { Observable } from 'rxjs/Rx';
import { PublicEvent } from '../models';
import { CollectionStore } from '../engine/store';

export class PublicEventStore extends CollectionStore<PublicEvent> {
  constructor() {
    super(PublicEvent);
  }

  get publicEvents$(): Observable<Array<PublicEvent>> {
    return this.state$;
  }

  get isFeaturedEvents$(): Observable<Array<PublicEvent>> {
    return this.state$.map((publicEvents: Array<PublicEvent>): Array<PublicEvent> => {
      return _.filter(publicEvents, ['isFeatured', true]);
    });
  }
}
