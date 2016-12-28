import { Injectable } from '@angular/core';
import { FriendRequest } from '../../models';
import { FriendRequestEndpoint } from '../../endpoints';
import { FriendRequestStore } from '../../stores';
import { ActionNoPayload } from '../../engine/action';

@Injectable()
export class GetFriendRequestsAction extends ActionNoPayload<Array<FriendRequest>> {

  constructor(
    private _friendRequestEndpoint: FriendRequestEndpoint,
    private _friendRequestStore: FriendRequestStore
  ) {
    super();
  }

  onExecute() {
    this._friendRequestEndpoint.fetchMultiple()
      .subscribe(
        (friendRequests: Array<FriendRequest>) => {
          this._friendRequestStore.saveMany(friendRequests);
          this.success$.next(friendRequests);
        },
        e => this.error$.next(e)
      );
  }
}
