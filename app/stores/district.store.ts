import { Observable } from 'rxjs/Rx';
import { District } from '../models';
import { CollectionStore } from '../engine/store';

export class DistrictStore extends CollectionStore<District> {
  constructor() {
    super(District);
  }

  get districts$(): Observable<Array<District>> {
    return this.state$;
  }
}
