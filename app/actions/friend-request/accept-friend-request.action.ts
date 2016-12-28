import { Injectable } from '@angular/core';
import { Action } from '../../engine/action';
import { IAcceptFriendInvitationRequest } from '../../interfaces';
import { FriendRequest } from '../../models';
import { FriendRequestEndpoint } from '../../endpoints';
import { FriendRequestStore } from '../../stores';


@Injectable()
export class AcceptFriendRequestAction extends Action<IAcceptFriendInvitationRequest, FriendRequest> {

  constructor(
    private _friendRequestEndpoint: FriendRequestEndpoint,
    private _friendRequestStore: FriendRequestStore
  ) {
    super();
  }

  onExecute(request: IAcceptFriendInvitationRequest): void {
    this._friendRequestEndpoint.update(request.id, request.params)
      .subscribe(
        (fr: FriendRequest): void => {
          this._friendRequestStore.saveOne(fr);
          this.success$.next(fr);
        },
        e => this.error$.next(e)
      );
  }
}
