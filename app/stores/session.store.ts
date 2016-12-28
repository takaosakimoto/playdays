import { Observable } from 'rxjs/Rx';
import { Session } from '../models';
import { CollectionStore } from '../engine/store';
import { filter } from 'lodash';

export class SessionStore extends CollectionStore<Session> {
  constructor() {
    super(Session);
  }

  get sessions$(): Observable<Array<Session>> {
    return this.state$;
  }

  get publicEvents$(): Observable<Array<Session>> {
    return this.state$.map(sessions => filter(sessions, 'timeSlot.publicEvent'));
  }

  get trialClasses$(): Observable<Array<Session>> {
    return this.state$.map(sessions => filter(sessions, 'timeSlot.trialClass'));
  }

}
