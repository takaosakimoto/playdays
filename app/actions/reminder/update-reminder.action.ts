import { Injectable } from '@angular/core';
import { ReminderEndpoint } from '../../endpoints';
import { ReminderStore } from '../../stores';
import { Reminder } from '../../models';
import { Action } from '../../engine/action';

@Injectable()
export class ArchiveReminderAction extends Action<number, Reminder> {
  constructor(
    private _reminderEndpoint: ReminderEndpoint,
    private _reminderStore: ReminderStore
  ) {
    super();
  }

  onExecute(id: number):void {
    this._reminderEndpoint.archive(id)
      .subscribe(
        reminder => {
          this._reminderStore.saveOne(reminder);
          this.success$.next(reminder);
        },
        e => this.error$.next(e)
      );
  }
}

@Injectable()
export class MarkReminderAsReadAction extends Action<number, Reminder> {
  constructor(
    private _reminderEndpoint: ReminderEndpoint,
    private _reminderStore: ReminderStore
  ) {
    super();
  }

  onExecute(id: number):void {
    this._reminderEndpoint.markAsRead(id)
      .subscribe(
        reminder => {
          this._reminderStore.saveOne(reminder);
          this.success$.next(reminder);
        },
        e => this.error$.next(e)
      );
  }
}
