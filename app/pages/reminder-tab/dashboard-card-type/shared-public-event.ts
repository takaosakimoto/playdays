import { NavController } from 'ionic-angular';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/common';
import * as moment from 'moment';
import { ISharedPublicEventReminder } from '../../../interfaces/index'
import { ArchiveReminderAction } from '../../../actions';
import { PublicEventShowPage } from '../../public-event/show';
import { DateDiff } from './date-diff';

interface Reminder {
  content: ISharedPublicEventReminder;
  contentType: String;
  createdAt: Date;
  id: number;
  state: String;
}

@Component({
  providers: [ArchiveReminderAction],
  selector: 'shared-public-event-reminder-card[reminder]',
  templateUrl: 'build/pages/reminder-tab/dashboard-card-type/shared-public-event.html',
  pipes: [DateDiff],
})
export class SharedPublicEventReminderComponent {
  @Input() public reminder: Reminder;
  // @Output() public onPrimaryClick = new EventEmitter();
  private isUnRead: Boolean = false;

  constructor(
    private _archiveReminderAction: ArchiveReminderAction,
    private _nav: NavController
  ) {
  }


  ngOnInit(): void {
    console.debug('SharedPublicEventReminderComponent OnInit');
    this.isUnRead = this.reminder.state == 'unread';
  }

  goToPublicEventShowPage(publicEventId: number): void {
    this._nav.push(PublicEventShowPage, {publicEventId: publicEventId});
  }

  public archive(ev:Event): void {
    ev.stopPropagation();
    this._archiveReminderAction.execute(this.reminder.id);
  }
}
