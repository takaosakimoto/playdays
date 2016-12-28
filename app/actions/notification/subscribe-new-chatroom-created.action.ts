import { Injectable } from '@angular/core';
import { NotificationChannel } from '../../channels';
import { Chatroom } from '../../models';
import { ChatroomStore } from '../../stores';
import { Action } from '../../engine/action';

interface Request {
  consumerId: number;
}

@Injectable()
export class SubscribeNewChatroomCreatedNotificationAction extends Action<Request, Chatroom> {

  constructor(
    private _notificationChannel: NotificationChannel,
    private _chatroomStore: ChatroomStore
  ) {
    super();
  }

  onExecute(r: Request) {
    const topic = `consumer_notifications:${r.consumerId}`;
    const eventName = 'chatroom:created';
    this._notificationChannel.join(topic)
      .filter(o => o)
      .flatMap(o => this._notificationChannel.subscribe(topic, eventName))
      .subscribe(
        (rf: Chatroom) => {
          console.debug('NotificationChannel new chatroom created', rf);
          let chatroom = new Chatroom(rf);
          chatroom.deserializeFromJson(rf);
          this._chatroomStore.saveOne(chatroom);
          this.success$.next(chatroom);
        },
        reason => console.error('FAILED to connect to NotificationChannel', reason)
      );
  }
}
