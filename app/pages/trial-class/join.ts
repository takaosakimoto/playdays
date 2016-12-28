import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TrialClass } from '../../models';
import { TimeSlotPicker } from '../../components/index';
import { CreateSessionAction } from '../../actions';
import { JoinedTrialClassIndexPage } from '../joined-trial-class/index';
import { Toast } from '../../utils/toast';

@Component({
  templateUrl: 'build/pages/trial-class/join.html',
  directives: [TimeSlotPicker],
  providers: [CreateSessionAction]
})
export class TrialClassJoinPage {
  public trialClassItem: {item: TrialClass, timeSlotId: Number};
  public timeSlotId: number;

  constructor(
    private _nav: NavController,
    private _navParams: NavParams,
    private _createSessionAction: CreateSessionAction,
    private _toast: Toast
  ) {
  }

  ngOnInit():void {
    console.debug('TrialClassJoinPage OnInit');
    this.trialClassItem = this._navParams.data;
  }

  joinTrialClass({timeSlotId}:{timeSlotId:Number}):void {
    this._createSessionAction.success$.subscribe(
      () => {
        this._toast.create('You have joined this trial class.');
        this._nav.push(JoinedTrialClassIndexPage)
      }
    );

    this._createSessionAction.execute(timeSlotId);
  }

}
