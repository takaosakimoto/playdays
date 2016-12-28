import { Observable } from 'rxjs/Rx';
import { Friend } from '../models';
import { CollectionStore } from '../engine/store';

export class FriendStore extends CollectionStore<Friend> {
  constructor() {
    super(Friend);
  }

  get friends$(): Observable<Array<Friend>> {
    return this.state$;
  }
}
