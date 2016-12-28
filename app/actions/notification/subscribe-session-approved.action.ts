import { Injectable } from '@angular/core';
import { NotificationChannel } from '../../channels';
import { Session } from '../../models';
import { SessionStore } from '../../stores';
import { Action } from '../../engine/action';

interface Request {
  consumerId: number;
}

@Injectable()
export class SubscribeSessionApprovedNotificationAction extends Action<Request, Session> {

  constructor(
    private _notificationChannel: NotificationChannel,
    private _sessionStore: SessionStore
  ) {
    super();
  }

  onExecute(r: Request) {
    const topic = `consumer_notifications:${r.consumerId}`;
    const eventName = 'session:approved';
    this._notificationChannel.join(topic)
      .filter(o => o)
      .flatMap(o => this._notificationChannel.subscribe(topic, eventName))
      .subscribe(
        (rf: Session) => {
          console.debug('NotificationChannel session approved', rf);
          let session = new Session(rf);
          session.deserializeFromJson(rf);
          this._sessionStore.saveOne(session);
          this.success$.next(session);
        },
        reason => console.error('FAILED to connect to NotificationChannel', reason)
      );
  }
}
