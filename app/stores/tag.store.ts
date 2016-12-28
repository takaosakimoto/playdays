import { Observable } from 'rxjs/Rx';
import { Tag } from '../models';
import { CollectionStore } from '../engine/store';

export class TagStore extends CollectionStore<Tag> {
  constructor() {
    super(Tag);
  }

  get tags$(): Observable<Array<Tag>> {
    return this.state$;
  }
}
