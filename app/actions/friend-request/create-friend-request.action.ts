import { Injectable } from '@angular/core';

import { Action } from '../../engine/action';
import { ICreateFriendInvitationRequest } from '../../interfaces';
import { FriendRequest } from '../../models';
import { FriendRequestEndpoint } from '../../endpoints';
import { FriendRequestStore } from '../../stores';


@Injectable()
export class CreateFriendRequestAction extends Action<ICreateFriendInvitationRequest, FriendRequest> {

  constructor(
    private _friendRequestEndpoint: FriendRequestEndpoint,
    private _friendRequestStore: FriendRequestStore
  ) {
    super();
  }

  onExecute(params: ICreateFriendInvitationRequest): void {
    this._friendRequestEndpoint.create(params)
      .subscribe(
        (fr: FriendRequest): void => {
          this._friendRequestStore.saveOne(fr);
          this.success$.next(fr);
        },
        e => this.error$.next(e)
      );
  }
}
