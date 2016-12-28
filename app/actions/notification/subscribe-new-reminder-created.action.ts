import { Injectable } from '@angular/core';
import { NotificationChannel } from '../../channels';
import { Reminder } from '../../models';
import { ReminderStore } from '../../stores';
import { Action } from '../../engine/action';

interface Request {
  consumerId: number;
}

@Injectable()
export class SubscribeNewReminderCreatedNotificationAction extends Action<Request, Reminder> {

  constructor(
    private _notificationChannel: NotificationChannel,
    private _sessionStore: ReminderStore
  ) {
    super();
  }

  onExecute(r: Request) {
    const topic = `consumer_notifications:${r.consumerId}`;
    const eventName = 'reminder:created';
    this._notificationChannel.join(topic)
      .filter(o => o)
      .flatMap(o => this._notificationChannel.subscribe(topic, eventName))
      .subscribe(
        (r: Reminder) => {
          console.debug('NotificationChannel received new reminder', r);
          let session = new Reminder(r);
          session.deserializeFromJson(r);
          this._sessionStore.saveOne(session);
          this.success$.next(session);
        },
        reason => console.error('FAILED to connect to NotificationChannel', reason)
      );
  }
}
