import { NavController } from 'ionic-angular';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/common';
import * as moment from 'moment';
import { ArchiveReminderAction, } from '../../../actions';
import { ITrialClassReminder } from '../../../interfaces/index'
import { TrialClassShowPage } from '../../trial-class/show';
import { DateDiff } from './date-diff';

interface Reminder {
  content: ITrialClassReminder;
  contentType: String;
  createdAt: Date;
  id: number;
  state: String;
}

@Component({
  providers: [ArchiveReminderAction],
  selector: 'joined-trial-class-reminder-card[reminder]',
  templateUrl: 'build/pages/reminder-tab/dashboard-card-type/joined-trial-class.html',
  pipes: [DateDiff],
})
export class JoinedTrialClassReminderComponent {
  @Input() public reminder: Reminder;
  // @Output() public onPrimaryClick = new EventEmitter();
  private isUnRead: Boolean = false;

  constructor(
    private _archiveReminderAction: ArchiveReminderAction,
    private _nav: NavController
  ) {
  }

  ngOnInit(): void {
    console.debug('JoinedTrialClassReminderComponent OnInit');
    this.isUnRead = this.reminder.state === 'unread';
  }

  goToShowTrialClassPage(trailClassId: number): void {
    this._nav.push(TrialClassShowPage, {trialClassId: trailClassId});
  }

  public archive(ev:Event): void {
    ev.stopPropagation();
    this._archiveReminderAction.execute(this.reminder.id);
  }
}
