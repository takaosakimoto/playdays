import { Injectable } from '@angular/core';
import { Action } from '../../engine/action';
import { SessionEndpoint } from '../../endpoints';
import { SessionStore } from '../../stores';
import { Session } from '../../models';

@Injectable()
export class CreateSessionAction extends Action<Number, Session> {

  constructor(
    private _createSessionEndpoint: SessionEndpoint,
    private _sessionStore: SessionStore
  ) {
    super();
  }

  onExecute(timeSlotId:number):void {
    this._createSessionEndpoint.create({time_slot_id: timeSlotId})
    .subscribe(
      (session:Session): void => {
        this._sessionStore.saveOne(session);
        this.success$.next(session);
      },
        e => this.error$.next(e)
      );
  }
}
