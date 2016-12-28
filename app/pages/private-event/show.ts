import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Subscription, Subject } from 'rxjs/Rx';
import { IUpdatePrivateEventInvitationRequest } from '../../interfaces';
import { GetRemindersAction, UpdatePrivateEventInvitationAction } from '../../actions';
import { PrivateEvent, PrivateEventInvitation } from '../../models';
import { PlaceItemComponent } from '../../components';
import * as moment from 'moment';

@Component({
  templateUrl: 'build/pages/private-event/show.html',
  providers: [GetRemindersAction, UpdatePrivateEventInvitationAction],
  directives: [
    PlaceItemComponent
  ],
})

export class PrivateEventShowPage {
  isLoading: boolean = false;
  public privateEvent: PrivateEvent;
  protected acceptButtonClicked$ = new Subject<PrivateEventInvitation>();
  private _acceptButtonSubscription: Subscription;

  constructor(
    private _nav: NavController,
    private _navParams: NavParams,
    private _getRemindersAction: GetRemindersAction,
    private _updatePrivateEventInvitationAction: UpdatePrivateEventInvitationAction
  ) {
    this.privateEvent = this._navParams.data.privateEvent;
  }

  ngOnInit(): void {
    console.debug('PrivateEventShowPage OnInit');
    this._acceptButtonSubscription = this._initAcceptButton();
  }

  ionViewDidunload() {
    console.debug('PrivateEventShowPage ionViewDidunload');
    this._acceptButtonSubscription.unsubscribe();
  }

  public dateFormat(date: Date): string {
    return moment(date).format('DD-MM-YYYY');
  }

  public timeFormate(time: Date): string {
    return moment(time).format('hh:mm A');
  }

  private _initAcceptButton(): Subscription {
    let subscription =
    this.acceptButtonClicked$
    .filter(invitation => invitation.state === 'pending')
    .map(invitation => ({
      id: invitation.id,
      params: {
        action_type: 'accept'
      }
    }))
    .switchMap((requestParams: IUpdatePrivateEventInvitationRequest)  =>
      this._updatePrivateEventInvitationAction.execute(requestParams)
        .do(
          (invitation: PrivateEventInvitation) => {
            //
            this._getRemindersAction.execute();
          },
          (e): void => {
            console.debug(e);
          }
        )
    ).subscribe();

    return subscription;
  }


}
