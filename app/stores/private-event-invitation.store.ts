import { Observable } from 'rxjs/Rx';
import { CollectionStore } from '../engine/store';
import { PrivateEventInvitation} from '../models';
import * as _ from 'lodash';

export class PrivateEventInvitationStore extends CollectionStore<PrivateEventInvitation> {
  constructor() {
    super(PrivateEventInvitation);
  }

  get privateEventInvitations$(): Observable<Array<PrivateEventInvitation>> {
    return this.state$;
  }

  chatroom$(id: number): Observable<PrivateEventInvitation> {
    return this.state$.map((privateEventInvitations: Array<PrivateEventInvitation>): PrivateEventInvitation => {
      return _.find(privateEventInvitations, (p) => p.id === id);
    });
  }
}
