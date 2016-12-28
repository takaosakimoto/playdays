import { Component, Input } from '@angular/core';
import { IAcceptedFriendRequestReminder } from '../../../interfaces/index'
import { ArchiveReminderAction } from '../../../actions';

interface Reminder {
  content: IAcceptedFriendRequestReminder;
  contentType: String;
  id: number;
  state: String;
}

@Component({
  providers: [ArchiveReminderAction],
  selector: 'accepted-friend-request-reminder-card[reminder]',
  templateUrl: 'build/pages/reminder-tab/dashboard-card-type/accepted-friend-request.html',
})
export class AcceptedFriendRequestReminderComponent {
  @Input() public reminder: Reminder;
  private isUnRead: Boolean = false;
  // @Output() public onPrimaryClick = new EventEmitter();

  constructor(
    private _archiveReminderAction: ArchiveReminderAction
  ) {
  }

  ngOnInit(): void {
    console.debug('AcceptedFriendRequestReminderComponent OnInit');
    this.isUnRead = this.reminder.state == 'unread';
  }

  public archive(ev:Event): void {
    ev.stopPropagation();
    this._archiveReminderAction.execute(this.reminder.id);
  }

}
