import { Component } from '@angular/core';
import { NavController } from 'ionic-angular/index';
import { Subscription } from 'rxjs/Rx';
import { PrivateEvent, Place } from '../../models';
import { PrivateEventStore } from '../../stores';
import { GetPrivateEventsAction } from '../../actions';
import { PrivateEventListComponent } from '../../components';
import { DirectoryShowPage } from '../directory/show';
import { PrivateEventShowPage } from './show';

@Component({
  templateUrl: 'build/pages/private-event/index.html',
  directives: [PrivateEventListComponent],
  providers: [GetPrivateEventsAction],
})

export class PrivateEventIndexPage {
  public privateEvents: Array<PrivateEvent> = [];
  private _privateEventsSubscription: Subscription;

  constructor(
    private _nav: NavController,
    private _privateEventStore: PrivateEventStore,
    private _getPrivateEventsAction: GetPrivateEventsAction
  ) {
  }

  ngOnInit(): void {
    console.debug('PrivateEventIndexPage OnInit');
    this._privateEventsSubscription = this._setupPrivateEventsSubscription();
  }

  ionViewWillEnter(): void {
    console.debug('PrivateEventIndexPage ionViewWillEnter');
    this._getPrivateEventsAction.execute();
  }

  ionViewDidUnload(): void {
    console.debug('PrivateEventIndexPage ionViewDidUnload');
    this._privateEventsSubscription.unsubscribe();
  }

  public handlePrivateEventClicked(privateEvent: PrivateEvent): void {
    this._nav.push(PrivateEventShowPage, {privateEvent: privateEvent});
  }

  public handlePlaceClicked(place: Place): void {
    this._nav.push(DirectoryShowPage, {place: place});
  }

  private _setupPrivateEventsSubscription(): Subscription {
    return this._privateEventStore.privateEvents$.subscribe((p: Array<PrivateEvent>) => {
      this.privateEvents = p;
    });
  }
}
