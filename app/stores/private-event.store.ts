import { Observable } from 'rxjs/Rx';
import { CollectionStore } from '../engine/store';
import { PrivateEvent } from '../models';
import * as _ from 'lodash';

export class PrivateEventStore extends CollectionStore<PrivateEvent> {
  constructor() {
    super(PrivateEvent);
  }

  get privateEvents$(): Observable<Array<PrivateEvent>> {
    return this.state$;
  }

  chatroom$(id: number): Observable<PrivateEvent> {
    return this.state$.map((privateEvents: Array<PrivateEvent>): PrivateEvent => {
      return _.find(privateEvents, (p) => p.id === id);
    });
  }
}
