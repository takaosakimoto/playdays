import { Observable } from 'rxjs/Rx';
import { TimeSlot } from '../models';
import { CollectionStore } from '../engine/store';
import { filter } from 'lodash';

export class TimeSlotStore extends CollectionStore<TimeSlot> {
  constructor() {
    super(TimeSlot);
  }

  get timeSlots$(): Observable<Array<TimeSlot>> {
    return this.state$;
  }
}
