import { Observable } from 'rxjs/Rx';
import { Region } from '../models';
import { CollectionStore } from '../engine/store';

export class RegionStore extends CollectionStore<Region> {
  constructor() {
    super(Region);
  }

  get regions$(): Observable<Array<Region>> {
    return this.state$;
  }
}
