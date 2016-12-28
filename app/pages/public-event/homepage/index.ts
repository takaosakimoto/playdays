import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { Slides } from 'ionic-angular/index';
import { Subscription } from 'rxjs/Rx';
import { PublicEvent, EventTag} from '../../../models';
// import { GetPlacesAction } from '../../../actions';
import { AppStore, PublicEventStore, EventTagStore } from '../../../stores';
import { PublicEventShowPage } from '../show';
import { PublicEventIndexPage } from '../index';
// import { Keyboard } from 'ionic-native';
import * as _ from 'lodash';

@Component({
  templateUrl: 'build/pages/public-event/homepage/index.html',
  // providers: [GetPlacesAction],
})

export class PublicEventsHomePage {
  @ViewChild(Slides) private slider: Slides;
  public sliderOptions = {
    initialSlide: 0,
    autoHeight: true,
    // direction: 'vertical'
  };
  public publicEvents: Array<PublicEvent> = [];
  private activeSlide:boolean = false;
  // private _isOpen:boolean = false;

  private _featuredPublicEventsSubscriptions: Subscription;

  constructor(
    private _nav: NavController,
    private _navParams: NavParams,
    private _appStore: AppStore,
    private _publicEventStore: PublicEventStore,
    // private _eventTagStore: EventTagStore,
    private _platform: Platform
  ) {
  }

  ngOnInit() {
    console.debug('PublicEventsHomepage OnInit');
    this._featuredPublicEventsSubscriptions = this._setupPublicEventsHomepageSubscription();
    console.log('this._nav', this._nav);
  }

  // ngAfterViewInit() {
  //
  // }

  ionViewWillEnter() {
    console.debug('PublicEventsHomepage ionViewWillEnter');
  }

  ionViewDidEnter() {
    console.debug('PublicEventsHomepage ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.debug('PublicEventsHomepage ionViewWillLeave');
  }

  ionViewDidUnload() {
    console.debug('PublicEventsHomepage ionViewDidUnload');
    this._featuredPublicEventsSubscriptions.unsubscribe();
  }

  ngOnDestroy() {
    console.debug('PublicEventsHomepage ngOnDestroy');
  }

  public onSlideChanged() {
    let currentIndex = this.slider.getActiveIndex();
    console.log('Current index is', currentIndex);
    if (currentIndex) {
      this.activeSlide = true;
    }
  }

  public handleListByDayButtonClicked() {
    this._nav.push(PublicEventIndexPage);
  }

  public goToPublicEventShowPage(publicEventId: number): void {
    this._nav.push(PublicEventShowPage, {publicEventId: publicEventId});
  }

  private _setupPublicEventsHomepageSubscription(): Subscription {
    return this._publicEventStore.isFeaturedEvents$.subscribe(
      (publicEvents: Array<PublicEvent>): void => {
        this.publicEvents = publicEvents;
        console.log('isFeatured Events', this.publicEvents);
      }
    );
  }

  // private plainAddress(address: string): string {
  //   return  address ? String(address).replace(/<[^>]+>/gm, '').replace(/&nbsp;/g, '') : '';
  // }
}
