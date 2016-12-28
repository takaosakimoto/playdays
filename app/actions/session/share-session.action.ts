import { Injectable } from '@angular/core';
import { Action } from '../../engine/action';
import { SessionEndpoint } from '../../endpoints';
import { IShareSessionRequest } from '../../interfaces';

@Injectable()
export class ShareSessionAction extends Action<IShareSessionRequest, Boolean> {

  constructor(
    private _sessionEndpoint: SessionEndpoint
  ) {
    super();
  }

  onExecute(request:IShareSessionRequest):void {
    this._sessionEndpoint.share(request)
      .subscribe(
        r => this.success$.next(r),
        e => this.error$.next(e)
      );
  }
}
