import { Injectable } from '@angular/core';
import { NotificationChannel } from '../../channels';
import { FriendRequest } from '../../models';
import { FriendRequestStore } from '../../stores';
import {Action} from '../../engine/action';

interface Request {
  consumerId: number;
}

@Injectable()
export class SubscribeFriendRequestAcceptedNotificationAction extends Action<Request, FriendRequest> {

  constructor(
    private _notificationChannel: NotificationChannel,
    private _friendRequestStore: FriendRequestStore
  ) {
    super();
  }

  onExecute(r: Request) {
    const topic = `consumer_notifications:${r.consumerId}`;
    const eventName = 'friend_request:accepted';
    this._notificationChannel.join(topic)
      .filter(o => o)
      .flatMap(o => this._notificationChannel.subscribe(topic, eventName))
      .subscribe(
        (rf: FriendRequest) => {
          console.debug('NotificationChannel friend request accepted', rf);
          let friendRequest = new FriendRequest(rf);
          friendRequest.deserializeFromJson(rf);
          this._friendRequestStore.saveOne(friendRequest);
          this.success$.next(friendRequest);
        },
        reason => console.error('FAILED to connect to NotificationChannel', reason)
      );
  }
}
