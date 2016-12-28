import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Me, FriendRequest } from '../models';
import { CollectionStore } from '../engine/store';
import { MeStore } from './me.store';
import * as _ from 'lodash';

@Injectable()
export class FriendRequestStore extends CollectionStore<FriendRequest> {
  constructor(
    private _meStore: MeStore
  ) {
    super(FriendRequest);
  }

  get friendRequests$(): Observable<Array<FriendRequest>> {
    return this.state$;
  }

  get inboundFriendRequests$(): Observable<Array<FriendRequest>> {
    let meSource = this._meStore.me$;
    let friendRequestsSource = this.friendRequests$;

    let source = meSource.combineLatest(friendRequestsSource, (me: Me, friendRequests: Array<FriendRequest>): Array<FriendRequest> => {
      return _.filter(friendRequests, {'requesteeId': me.id, 'state': 'pending'});
    });

    return source;
  }

  get outboundFriendRequests$(): Observable<Array<FriendRequest>> {
    let meSource = this._meStore.me$;
    let friendRequestsSource = this.friendRequests$;
    let source = meSource.combineLatest(friendRequestsSource, (me: Me, friendRequests: Array<FriendRequest>): Array<FriendRequest> => {
      return _.filter(friendRequests, {'requesterId': me.id});
    });

    return source;
  }

  get pendingFriendRequests$(): Observable<Array<FriendRequest>> {
    return this.state$.map((friendRequests: Array<FriendRequest>): Array<FriendRequest> => {
        return _.filter(friendRequests, ['state', 'pending']);
      });
  }
}
