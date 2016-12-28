import { Observable } from 'rxjs/Rx';
import { Reminder } from '../models';
import { CollectionStore } from '../engine/store';

export class ReminderStore extends CollectionStore<Reminder> {
  constructor() {
    super(Reminder);
  }

  get reminders$(): Observable<Array<Reminder>> {
    return this.state$;
  }
}
