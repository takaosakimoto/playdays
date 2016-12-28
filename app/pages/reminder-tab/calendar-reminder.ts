import { Component, Input } from '@angular/core';
import { NgModel } from '@angular/common';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Calendar, WeekViewCalendar } from '../../components/index';
import { IReminder } from '../../interfaces/index'
import {
  IFriendRequestReminder,
  IAcceptedFriendRequestReminder,
  ITrialClassReminder,
  IJoinedPublicEventReminder,
  ISharedPublicEventReminder,
} from '../../interfaces/index'
import { DASHBOARD_CARD_DIRECTIVES } from './dashboard-card-type/index';
import { CalendarPipe } from './calendar-pipe';

function dateEqual(a:Date, b:Date):Boolean {
  return a && b && (a.getDate() === b.getDate()) &&
    (a.getMonth() === b.getMonth()) &&
    (a.getFullYear() === b.getFullYear())
}

@Component({
  selector: 'calendar-reminder[reminders]',
  directives: [Calendar, WeekViewCalendar, DASHBOARD_CARD_DIRECTIVES],
  templateUrl: 'build/pages/reminder-tab/calendar-reminder.html',
  pipes: [CalendarPipe],
})
export class CalendarReminderComponent {
  public calendarEvents = [];
  @Input() public set reminders(reminders:Array<IReminder>) {
    this.eventReminders = _(reminders)
      .filter('content.date')
      .value();

    this.calendarEvents = _(this.eventReminders)
      .reject(['reminderType', 'rejectedTrialClassReminder'])
      .reject(['reminderType', 'sharedPublicEventReminder'])
      .reject(['state', 'archived'])
      .map('content.date')
      .map((date:Date)=>({date: date.getDate(), month: date.getMonth(), year: date.getFullYear()}))
      ['uniqWith'](_.isEqual)
      .value();
  };

  // public calendarStartFrom = new Date;
  public viewMode:String = 'month-view';

  public _selectedDate:Date;
  public get selectedDate():Date {
    return this._selectedDate;
  };
  public set selectedDate(date:Date) {
    if (!dateEqual(date, this._selectedDate)) {
      this._selectedDate = date;
      this.filteredEventReminders =
        _.filter(this.eventReminders, ['content.date', date]);
    }
  };
  public eventReminders:Array<IReminder>;
  public filteredEventReminders:Array<IReminder>;

  ngOnInit(): void {
    console.debug('CalendarReminderComponent OnInit');

    let d = new Date;
    d.setHours(8,0,0,0);
    this.selectedDate = d;
  }

  public onDateClick(date:Date) {
    this.changeViewMode();
  }

  public changeViewMode(mode?:String) {
    if (mode) {
      this.viewMode = mode;
    } else {
      this.viewMode = this.viewMode?'week-view':'month-view';
    }
  }

  public get isMonthView():Boolean {
    return this.viewMode === 'month-view';
  }

  public get isWeekView():Boolean {
    return this.viewMode === 'week-view';
  }

}
