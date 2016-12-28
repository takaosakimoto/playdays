import { Injectable } from '@angular/core';
import { Action } from '../../engine/action';
import { IUpdatePrivateEventInvitationRequest } from '../../interfaces';
import { PrivateEventInvitation } from '../../models';
import { PrivateEventInvitationEndpoint } from '../../endpoints';
import { PrivateEventInvitationStore } from '../../stores';


@Injectable()
export class UpdatePrivateEventInvitationAction extends Action<IUpdatePrivateEventInvitationRequest, PrivateEventInvitation> {

  constructor(
    private _privateEventInvitationEndpoint: PrivateEventInvitationEndpoint,
    private _privateEventInvitationStore: PrivateEventInvitationStore
  ) {
    super();
  }

  onExecute(request: IUpdatePrivateEventInvitationRequest): void {
    this._privateEventInvitationEndpoint.update(request.id, request.params)
      .subscribe(
        (pei: PrivateEventInvitation): void => {
          this._privateEventInvitationStore.saveOne(pei);
          this.success$.next(pei);
        },
        e => this.error$.next(e)
      );
  }
}
