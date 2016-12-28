import { Component } from '@angular/core';
import { Alert, NavController, NavParams } from 'ionic-angular';
import { PublicEvent } from '../../models';
import { TimeSlotPicker } from '../../components/index';
import { CreateSessionAction } from '../../actions';
import { PublicEventSharePage } from './share';
import { PublicEventIndexPage } from './index';
import { Toast } from '../../utils/toast';

@Component({
  templateUrl: 'build/pages/public-event/join.html',
  directives: [TimeSlotPicker],
  providers: [CreateSessionAction]
})
export class PublicEventJoinPage {
  public publicEventItem: {item: PublicEvent, timeSlotId: Number};
  public isLoading: Boolean = false;
  public sessionId: number = 0;

  constructor(
    private _nav: NavController,
    private _navParams: NavParams,
    private _createSessionAction: CreateSessionAction,
    private _toast: Toast
  ) {
  }

  ngOnInit(): void {
    console.debug('PublicEventJoinPage OnInit');
    this.publicEventItem = this._navParams.data;
  }

  joinPublicEvent({timeSlotId}: { timeSlotId: Number}): void {
    this._createSessionAction.success$.subscribe(
      (session) => {
        this.isLoading = false;
        this.sessionId = session.id;
        this._toast.create('You have joined this event.');
      }
    );

    this._createSessionAction.error$.subscribe(
      (e) => {
        this.isLoading = false;
        this._nav.push(PublicEventIndexPage);
        this._showCreateSessionErrorAlert();
        console.error('failed to create session', e);
      }
    );

    this.isLoading = true;
    this._createSessionAction.execute(timeSlotId);
  }

  private _showCreateSessionErrorAlert() {
    let alert = Alert.create({
      title: 'Join public event fail',
      message: 'Try Again',
      enableBackdropDismiss: false
    });
    this._nav.present(alert);

    setTimeout(() => {
      alert.dismiss();
    }, 1500);
  }


  sharePublicEvent():void {
    if (this.sessionId)
      this._nav.push(PublicEventSharePage, {sessionId: this.sessionId});
  }
}
