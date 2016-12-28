import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IONIC_DIRECTIVES } from 'ionic-angular/index';
import { Subject, Subscription } from 'rxjs/Rx';
import { IUpdatePrivateEventInvitationRequest, IPrivateEventInvitationReminder } from '../../../interfaces/index'
import { PrivateEvent, PrivateEventInvitation } from '../../../models';
import { ArchiveReminderAction, GetRemindersAction, UpdatePrivateEventInvitationAction } from '../../../actions';

interface Reminder {
  content: IPrivateEventInvitationReminder;
  contentType: String;
  id: number;
  state: String;
}

@Component({
  selector: 'private-event-invitation-reminder[reminder]',
  templateUrl: 'build/pages/reminder-tab/dashboard-card-type/private-event-invitation.html',
  providers: [
    ArchiveReminderAction,
    GetRemindersAction,
    UpdatePrivateEventInvitationAction
  ],
  directives: [IONIC_DIRECTIVES]
})

export class PrivateEventInvitationReminderComponent {
  @Input() public reminder: Reminder;
  @Output() onClickViewDetailsButton = new EventEmitter<PrivateEvent>();
  protected acceptButtonClicked$ = new Subject<IPrivateEventInvitationReminder>();
  protected viewDetailsButtonClicked$ = new Subject<PrivateEvent>();

  private _acceptButtonOnClickSubscription: Subscription;
  private _viewDetailButtonOnClickSubscription: Subscription;

  constructor(
    private _archiveReminderAction: ArchiveReminderAction,
    private _getRemindersAction: GetRemindersAction,
    private _updatePrivateEventInvitationAction: UpdatePrivateEventInvitationAction
  ) {
    this._acceptButtonOnClickSubscription = this._initViewDetailButtonOnClickSubscription();
    this._viewDetailButtonOnClickSubscription = this._initViewDetailButtonClickSubscription();
  }

  ngOnInit(): void {
    console.debug('PrivateEventInvitationReminderComponent OnInit');
  }

  ngOnDestroy(): void {
    this._acceptButtonOnClickSubscription.unsubscribe();
    this._viewDetailButtonOnClickSubscription.unsubscribe();
  }

  public archive(ev:Event): void {
    ev.stopPropagation();
    this._archiveReminderAction.execute(this.reminder.id);
  }

  private _initViewDetailButtonOnClickSubscription(): Subscription {
    let s = this.acceptButtonClicked$
    .filter((r: IPrivateEventInvitationReminder) => r.state === 'pending')
    .map(r => ({
      id: r.id,
      params: {
        action_type: 'accept'
      }
    }))
    .switchMap((requestParams: IUpdatePrivateEventInvitationRequest) =>
      this._updatePrivateEventInvitationAction.execute(requestParams)
        .do(
          (invitation: PrivateEventInvitation) => {
            this._getRemindersAction.execute();
          },
          (e): void => {
            console.debug(e);
          }
        )
    ).subscribe();
    return s;
  }

  private _initViewDetailButtonClickSubscription(): Subscription {
    let s = this.viewDetailsButtonClicked$
    .do((p: PrivateEvent): void => {
      this.onClickViewDetailsButton.emit(p);
    })
    .subscribe();
    return s;
  }
}
