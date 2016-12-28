import { Observable } from 'rxjs/Rx';
import { TrialClass } from '../models';
import { CollectionStore } from '../engine/store';

export class TrialClassStore extends CollectionStore<TrialClass> {
  constructor() {
    super(TrialClass);
  }

  get trialClasses$(): Observable<Array<TrialClass>> {
    return this.state$;
  }
}
