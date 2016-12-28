import { Injectable } from '@angular/core';
import { Session } from '../../models';
import { SessionEndpoint } from '../../endpoints';
import { SessionStore } from '../../stores';
import { ActionNoPayload } from '../../engine/action';

@Injectable()
export class GetSessionsAction extends ActionNoPayload<Array<Session>> {

  constructor(
    private _sessionEndpoint: SessionEndpoint,
    private _sessionStore: SessionStore
  ) {
    super();
  }

  onExecute() {
    this._sessionEndpoint.fetchMultiple()
      .subscribe(
        (sessions: Array<Session>) => {
          this._sessionStore.saveMany(sessions);
          this.success$.next(sessions);
        },
        e => this.error$.next(e)
      );
  }
}
