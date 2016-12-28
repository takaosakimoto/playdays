import { Injectable } from '@angular/core';
import { Friend } from '../../models';
import { FriendEndpoint } from '../../endpoints';
import { FriendStore } from '../../stores';
import { ActionNoPayload } from '../../engine/action';

@Injectable()
export class GetFriendsAction extends ActionNoPayload<Array<Friend>> {

  constructor(
    private _friendEndpoint: FriendEndpoint,
    private _friendStore: FriendStore
  ) {
    super();
  }

  onExecute() {
    this._friendEndpoint.fetchMultiple()
      .subscribe(
        (friends: Array<Friend>) => {
          this._friendStore.saveMany(friends);
          this.success$.next(friends);
        },
        e => this.error$.next(e)
      );
  }
}
