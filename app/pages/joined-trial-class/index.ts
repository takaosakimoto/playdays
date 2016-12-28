import { Component } from '@angular/core';
import {
  Page,
  NavController
} from 'ionic-angular';
import { Subscription } from 'rxjs/Rx';
import { Session } from '../../models';
import { MeStore, SessionStore } from '../../stores';
// import { GetSessionsAction } from '../../actions';
import { find, memoize } from 'lodash';
import * as moment from 'moment';
import { TrialClassShowPage } from '../trial-class/show';

@Component({
  templateUrl: 'build/pages/joined-trial-class/index.html',
  // providers: [GetSessionsAction]
})
export class JoinedTrialClassIndexPage {
  public sessions: Array<Session> = [];

  // private _meLoggedInSubscription: Subscription;
  private _sessionsSubscription: Subscription;
  private showPage:Boolean = false;

  constructor(
    private _nav: NavController,
    private _meStore: MeStore,
    private _sessionStore: SessionStore
    // private _getSessionsAction: GetSessionsAction
  ) {
  }

  ngOnInit(): void {
    console.debug('JoinedTrialClassIndexPage OnInit');
    // this._meLoggedInSubscription = this._setUpMeLoggedInSubscription();
    this._sessionsSubscription = this._setUpSessionSubscription();
    console.log('********************************************************');
  }

  ionViewWillUnload(): void {
    console.debug('JoinedTrialClassIndexPage ionViewWillUnload');
    // this._meLoggedInSubscription.unsubscribe();
    this._sessionsSubscription.unsubscribe();
  }

  goToShowTrialClassPage(session: Session): void {
    this._nav.push(TrialClassShowPage, {item: session.timeSlot.trialClass, timeSlotId: session.timeSlot.id});
  }

  private phraseDate(date:Date):String {
    return moment(date).format('DD-M-YYYY');
  }

  private phraseTime(time:Date):String {
    return moment(time).format('HH:mm A');
  }

  private _setUpSessionSubscription():Subscription {


    let sessionsSource = this._sessionStore.trialClasses$;

    return sessionsSource.subscribe(
      (sessions: Array<Session>): void => {
        this.sessions = sessions;
      }
    );
  }

  private  plainAddress(address: string): string {
    return  address ? String(address).replace(/<[^>]+>/gm, '').replace(/&nbsp;/g, '') : '';
  }

  private dateFormat(date: Date): string {
    return moment(date).format('Do MMMM[,] dddd');
  }

  private timeFormat(from: Date, to: Date): string {
    return moment(from).format('LT') + ' - ' + moment(to).format('LT');
  }

  private capitalize(value: string) {
   return value.charAt(0).toUpperCase() + value.slice(1);
 }

  // private _setUpMeLoggedInSubscription(): Subscription {
  //   let meLoggedInSource = this._meStore.loggedIn$;
  //
  //   return meLoggedInSource.subscribe(
  //     (hasLoggedIn: boolean): void => {
  //       if (hasLoggedIn) {
  //         this.showPage = true;
  //         this._getSessionsAction.execute();
  //       } else {
  //         this.showPage = false;
  //       }
  //     }
  //   );
  // }



}
