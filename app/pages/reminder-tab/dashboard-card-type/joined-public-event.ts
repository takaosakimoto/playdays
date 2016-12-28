import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgModel } from '@angular/common';
import * as moment from 'moment';
import { IJoinedPublicEventReminder } from '../../../interfaces/index';
import { ArchiveReminderAction } from '../../../actions';
import { PublicEventShowPage } from '../../public-event/show';
import { DateDiff } from './date-diff';

interface Reminder {
  content: IJoinedPublicEventReminder;
  contentType: String;
  createdAt: Date;
  id: number;
  state: String;
}

@Component({
  providers: [ArchiveReminderAction],
  selector: 'joined-public-event-reminder-card[reminder]',
  templateUrl: 'build/pages/reminder-tab/dashboard-card-type/joined-public-event.html',
  pipes: [DateDiff],
})
export class JoinedPublicEventReminderComponent {
  @Input() public reminder: Reminder;
  // @Output() public onPrimaryClick = new EventEmitter();
  private isUnRead: Boolean = false;

  constructor(
    private _archiveReminderAction: ArchiveReminderAction,
    private _nav: NavController
  ) {
  }

  ngOnInit(): void {
    console.debug('JoinedPublicEventReminderComponent OnInit');
    this.isUnRead = this.reminder.state === 'unread';
  }

  goToPublicEventShowPage(publicEventId: number): void {
    this._nav.push(PublicEventShowPage, {publicEventId: publicEventId});
  }

  private archive(ev:Event): void {
    ev.stopPropagation();
    this._archiveReminderAction.execute(this.reminder.id);
  }
}
