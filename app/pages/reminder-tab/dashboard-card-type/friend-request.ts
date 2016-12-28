import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IFriendRequestReminder } from '../../../interfaces/index'
import { ArchiveReminderAction } from '../../../actions';

interface Reminder {
  content: IFriendRequestReminder;
  contentType: String;
  id: number;
  state: String;
}

@Component({
  providers: [ArchiveReminderAction],
  selector: 'friend-request-reminder-card[reminder]',
  templateUrl: 'build/pages/reminder-tab/dashboard-card-type/friend-request.html',
})
export class FriendRequestReminderComponent {
  @Input() public reminder: Reminder;
  private isUnRead: Boolean = false;
  // @Output() public onPrimaryClick = new EventEmitter();

  constructor(
    private _archiveReminderAction: ArchiveReminderAction
  ) {
  }

  ngOnInit(): void {
    console.debug('FriendRequestReminderComponent OnInit');
    this.isUnRead = this.reminder.state === 'unread';
  }

  // emitOnPrimaryClick(ev):void {
  //   this.onPrimaryClick.emit(ev);
  // }

  public archive(ev:Event): void {
    ev.stopPropagation();
    this._archiveReminderAction.execute(this.reminder.id);
  }
}
