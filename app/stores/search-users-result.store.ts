import { Observable } from 'rxjs/Rx';
import { User } from '../models';
import { CollectionStore } from '../engine/store';

export class SearchUsersResultStore extends CollectionStore<User> {
  constructor() {
    super(User);
  }

  get results$(): Observable<Array<User>> {
    return this.state$;
  }
}
