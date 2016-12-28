import { Injectable } from '@angular/core';
import { TrialClass } from '../../models';
import { TrialClassEndpoint } from '../../endpoints';
import { TrialClassStore } from '../../stores';
import { ActionNoPayload } from '../../engine/action';

@Injectable()
export class GetTrialClassesAction extends ActionNoPayload<Array<TrialClass>> {

  constructor(
    private _trialClassEndpoint: TrialClassEndpoint,
    private _trialClassStore: TrialClassStore
  ) {
    super();
  }

  onExecute() {
    this._trialClassEndpoint.fetchMultiple()
      .subscribe(
        (trialClasses: Array<TrialClass>) => {
          this._trialClassStore.saveMany(trialClasses);
          this.success$.next(trialClasses);
        },
        e => this.error$.next(e)
      );
  }
}
