import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ITrialClassReminder } from '../../../interfaces/index';
import { ArchiveReminderAction } from '../../../actions';
import { TrialClassShowPage } from '../../trial-class/show';

interface Reminder {
  content: ITrialClassReminder;
  contentType: String;
  id: number;
  state: String;
}

@Component({
  providers: [ArchiveReminderAction],
  selector: 'rejected-trial-class-reminder-card[reminder]',
  templateUrl: 'build/pages/reminder-tab/dashboard-card-type/rejected-trial-class.html',
})
export class RejectedTrialClassReminderComponent {
  @Input() public reminder: Reminder;
  private isUnRead: Boolean = false;
  // @Output() public onPrimaryClick = new EventEmitter();

  constructor(
    private _archiveReminderAction: ArchiveReminderAction,
    private _nav: NavController
  ) {
  }

  ngOnInit(): void {
    console.debug('RejectedTrialClassReminderComponent OnInit');
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
