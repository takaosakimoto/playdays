import { Injectable } from '@angular/core';
import { Reminder } from '../../models';
import { ReminderEndpoint } from '../../endpoints';
import { ReminderStore } from '../../stores';
import { ActionNoPayload } from '../../engine/action';

@Injectable()
export class GetRemindersAction extends ActionNoPayload<Array<Reminder>> {

  constructor(
    private _reminderEndpoint: ReminderEndpoint,
    private _reminderStore: ReminderStore
  ) {
    super();
  }

  onExecute() {
    this._reminderEndpoint.fetchMultiple()
      .subscribe(
        (reminders: Array<Reminder>) => {
          this._reminderStore.saveMany(reminders);
          this.success$.next(reminders);
        },
        e => this.error$.next(e)
      );
  }
}
