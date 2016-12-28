import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular/index';
import { Subscription } from 'rxjs/Rx';
import { PublicEvent } from '../../models';
import { PublicEventStore } from '../../stores';
import { GetPublicEventsAction } from '../../actions';
import { PublicEventShowPage } from './show';
import { PublicEventJoinPage } from './join';
import { ProtectedDirective } from '../../directives/protected.directive';
import { TimeSlotList } from '../../components/index';

@Component({
  templateUrl: 'build/pages/public-event/index.html',
  providers: [GetPublicEventsAction],
  directives: [ProtectedDirective, TimeSlotList]
})

export class PublicEventIndexPage {
  @ViewChild(Content) content: Content;
  public shouldHideSearchbarCancelButton: boolean = true;
  public searchbarInput: string = '';
  public publicEvents: Array<PublicEvent> = [];

  private _publicEventsSubscription: Subscription;

  constructor(
    private _nav: NavController,
    private _publicEventStore: PublicEventStore,
    private _getPublicEventsAction: GetPublicEventsAction
  ) {
  }

  ngOnInit(): void {
    console.debug('PublicEventIndexPage OnInit');
    this._publicEventsSubscription = this._setupPublicEventsSubscription();
  }

  ionViewWillEnter() {
    console.debug('PublicEventIndexPage ionViewWillEnter');
    this._getPublicEventsAction.execute();
  }

  ionViewWillUnload(): void {
    console.debug('PublicEventIndexPage ionViewWillUnload');
  }

  ionViewDidUnload(): void {
    console.debug('PublicEventIndexPage ionViewDidUnload');
    this._publicEventsSubscription.unsubscribe();
  }

  public goToPublicEventShowPage(v: Object): void {
    this._nav.push(PublicEventShowPage, v);
  }

  public goToJoinPublicEvent(v: Object): void {
    this._nav.push(PublicEventJoinPage, v);
  }

  public scrollToTop() {
    this.content.scrollToTop();
  }

  private _setupPublicEventsSubscription(): Subscription {
    return this._publicEventStore.publicEvents$.subscribe(
      (publicEvents: Array<PublicEvent>) => {
        this.publicEvents = publicEvents;
        console.log(this.publicEvents);
      }
    );
  }

}
