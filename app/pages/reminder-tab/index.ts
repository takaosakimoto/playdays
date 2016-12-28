import {
  Page,
  NavController
} from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Reminder } from '../../models';
import { MeStore, ReminderStore } from '../../stores';
import { GetRemindersAction } from '../../actions';
import { DashboardReminderListComponent } from './dashboard-reminder-list';
import { CalendarReminderComponent } from './calendar-reminder';
import * as moment from 'moment';

@Component({
  templateUrl: 'build/pages/reminder-tab/index.html',
  directives: [DashboardReminderListComponent, CalendarReminderComponent],
  providers: [GetRemindersAction]
})
export class ReminderTabIndexPage {
  @ViewChild('calendarReminder') calendarReminder:CalendarReminderComponent;

  public reminders: Array<Reminder> = [];

  private _meLoggedInSubscription: Subscription;
  private _remindersSubscription: Subscription;
  private showPage: Boolean = false;

  constructor(
    private _nav: NavController,
    private _meStore: MeStore,
    private _reminderStore: ReminderStore,
    private _getRemindersAction: GetRemindersAction
  ) {
  }

  ngOnInit(): void {
    console.debug('ReminderTabIndexPage OnInit');
    this._meLoggedInSubscription = this._setUpMeLoggedInSubscription();
    this._remindersSubscription = this._setUpReminderSubscription();
  }

  ionViewWillUnload(): void {
    console.debug('ReminderTabIndexPage ionViewWillUnload');
    this._meLoggedInSubscription.unsubscribe();
    this._remindersSubscription.unsubscribe();
  }

  sortByTime(a, b) {
    var x = a.createdAt;
    var y = b.createdAt;
    return x > y ? -1 : x < y ? 1 : 0;
  }

  public showingDashboard:Boolean = false;

  public shouldDisplayWeekViewBtn():Boolean {
    return !this.showingDashboard && this.calendarReminder && this.calendarReminder.isMonthView;
  }

  public shouldDisplayMonthViewBtn():Boolean {
    return !this.showingDashboard && this.calendarReminder && this.calendarReminder.isWeekView;
  }

  public gotoWeekView() {
    this.calendarReminder.changeViewMode('week-view');
  }
  public gotoMonthView() {
    this.calendarReminder.changeViewMode('month-view');
  }

  public changeDisplayComponent():void {
    this.showingDashboard = !this.showingDashboard;
  }

  private _setUpReminderSubscription():Subscription {
    let remindersSource = this._reminderStore.reminders$;

    return remindersSource.subscribe(
      (reminders: Array<Reminder>): void => {
        this.reminders = reminders.sort(this.sortByTime);
      }
    );
  }

  private _setUpMeLoggedInSubscription(): Subscription {
    let meLoggedInSource = this._meStore.loggedIn$;

    return meLoggedInSource.subscribe(
      (hasLoggedIn: boolean): void => {
        if (hasLoggedIn) {
          this.showPage = true;
          this._getRemindersAction.execute();
        } else {
          this.showPage = false;
        }
      }
    );
  }

}
