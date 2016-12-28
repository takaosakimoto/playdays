import { Observable } from 'rxjs/Rx';
import { CollectionStore } from '../engine/store';
import { User } from '../models';

export class UserStore extends CollectionStore<User> {
  constructor() {
    super(User);
  }

  get searchResults$(): Observable<Array<User>> {
    return this.state$;
  }
}
