import { Component, Input } from '@angular/core';
import { IONIC_DIRECTIVES } from 'ionic-angular/index';
import { INewPrivateEventParticipationReminder } from '../../../interfaces/index'
import { ArchiveReminderAction, GetRemindersAction, UpdatePrivateEventInvitationAction } from '../../../actions';

interface Reminder {
  content: INewPrivateEventParticipationReminder;
  contentType: String;
  id: number;
  state: String;
}

@Component({
  selector: 'new-private-event-participation-reminder[reminder]',
  templateUrl: 'build/pages/reminder-tab/dashboard-card-type/new-private-event-participation.html',
  providers: [ArchiveReminderAction, GetRemindersAction, UpdatePrivateEventInvitationAction],
  directives: [IONIC_DIRECTIVES]
})

export class NewPrivateEventParticipationReminderComponent {
  @Input() public reminder: Reminder;

  constructor(
    private _archiveReminderAction: ArchiveReminderAction
  ) {
  }

  ngOnInit(): void {
    console.debug('MewPrivateeventParticipationReminderComponent OnInit');
  }

  public archive(ev:Event): void {
    ev.stopPropagation();
    this._archiveReminderAction.execute(this.reminder.id);
  }

}
