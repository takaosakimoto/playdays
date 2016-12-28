import { Component, Input } from '@angular/core';
import { IONIC_DIRECTIVES, NavController } from 'ionic-angular/index';
import * as moment from 'moment';
import {
  IFriendRequestReminder,
  IAcceptedFriendRequestReminder,
  ITrialClassReminder,
  IJoinedPublicEventReminder,
  ISharedPublicEventReminder,
  IPrivateEventInvitationReminder,
  INewPrivateEventParticipationReminder,
} from '../../interfaces/index';
import { DASHBOARD_CARD_DIRECTIVES } from './dashboard-card-type/index';
import { PrivateEvent } from '../../models';
import { PrivateEventShowPage } from '../private-event/show';
import { IReminder } from '../../interfaces';
import * as _ from 'lodash';
import { CalendarPipe } from './calendar-pipe';

@Component({
  selector: 'dashboard-reminder-list[reminders]',
  directives: [IONIC_DIRECTIVES, DASHBOARD_CARD_DIRECTIVES],
  templateUrl: 'build/pages/reminder-tab/dashboard-reminder-list.html',
  pipes: [CalendarPipe],
})
export class DashboardReminderListComponent {
  @Input() public set reminders(reminders_input:Array<IReminder>) {
    this._reminders = _['orderBy'](reminders_input, 'createdAt', 'asc');
  };


  // private displayReminders: Array<Reminder>;

  constructor(
    private _nav: NavController
  ) {
  }


  public _reminders: Array<IReminder>;
  private showArchived:Boolean = false;
  // private displayReminders:Array<IReminder>;

  private onShowArchivedChange():void {
    // this.displayReminders =
    //   this.showArchived
    //     ? this.reminders
    //     : reject(this.reminders, ['state', 'archived']);
  }
  ngOnInit(): void {
    console.debug('DashboardReminderListComponent OnInit');
    // this.displayReminders = reject(this.reminders, ['state', 'archived']);
  }

  // ngOnChanges():void {
  //   this.onShowArchivedChange();
  // }

  public handleViewPrivateEventInvitationButonClicked(p: PrivateEvent): void {
    this._nav.push(PrivateEventShowPage, {privateEvent: p});
  }


}
