import { Component } from '@angular/core';
import {
  Page,
  NavController
} from 'ionic-angular';
import { Subscription } from 'rxjs/Rx';
import { TrialClass } from '../../models';
import { TimeSlot } from '../../models';
import { TrialClassStore } from '../../stores';
import { TrialClassShowPage } from './show';
import { TrialClassJoinPage } from './join';
import { ProtectedDirective } from '../../directives/protected.directive';
import { TimeSlotList } from '../../components/index';
import * as moment from 'moment';

@Component({
  templateUrl: 'build/pages/trial-class/index.html',
  directives: [ProtectedDirective, TimeSlotList]
})
export class TrialClassIndexPage {
  public trialClasses: Array<TrialClass> = [];

  private trialClassesSubscription: Subscription;

  constructor(
    private _nav: NavController,
    private _trialClassStore: TrialClassStore
  ) {
  }

  ngOnInit(): void {
    console.debug('TrialClassIndexPage OnInit');
    this._setupTrialClasses();
  }

  ionViewWillUnload(): void {
    console.debug('TrialClassIndexPage ionViewWillUnload');
    this.trialClassesSubscription.unsubscribe();
  }

  private goToTrialClassShowPage(v:Object): void {
    this._nav.push(TrialClassShowPage, v);
  }

  private goToJoinTrialClass(v:Object): void {
    this._nav.push(TrialClassJoinPage, v);
  }

  private _setupTrialClasses() {
    this._trialClassStore.trialClasses$.subscribe(
      (trialClasses: Array<TrialClass>) => {
        this.trialClasses = trialClasses;
      }
    );
  }

}
