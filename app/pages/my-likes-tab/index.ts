import { ViewChild, Component } from '@angular/core';
import { VirtualScroll, Platform, NavController, NavParams, Modal } from 'ionic-angular';
import { Content } from 'ionic-angular/index';
import { Place, Me, PublicEvent } from '../../models';
import { Subject, Subscription, Observable } from 'rxjs/Rx';
import { Keyboard } from 'ionic-native';
import * as _ from 'lodash';
import { PlaceStore, MeStore, PublicEventStore } from '../../stores';
import { LikeDirectories, LikeEvents } from '../../components/index';
import { DirectoryShowPage } from '../directory/show';
import { PublicEventShowPage } from '../public-event/show';

@Component({
  templateUrl: 'build/pages/my-likes-tab/index.html',
  directives: [LikeDirectories, LikeEvents]
})
export class MyLikesTabIndexPage {
  @ViewChild(VirtualScroll) virtualScroll: VirtualScroll;
  @ViewChild(Content) content: Content;

  constructor(
    private _nav: NavController,
    private _navParams: NavParams,
    private _platform: Platform,
    private _placeStore: PlaceStore,
    private _eventStore: PublicEventStore,
    private _meStore: MeStore
  ) {
  }

  public showingEvents: Boolean = false;
  public showingDirectories: Boolean = true;
  public likedPlaces: Array<Place> = [];
  public likedEvents: Array<PublicEvent> = [];
  private _likedPlacesSubscription: Subscription;
  public me: Me;
  public all_places: Array<Place>;
  public all_events: Array<PublicEvent>;
  private meSubscription: Subscription;
  private placesSubscription: Subscription;
  private eventsSubscription: Subscription;

  ngOnInit() {
    console.debug('MyLikesTabIndexPage OnInit');
    this._platform.ready().then(() => {
      Keyboard.disableScroll(true);
    });

  }

  ngAfterViewInit() {
  	//this._likedPlacesSubscription = this._setupLikedPlacesSubscription();

  }

  ionViewWillEnter() {
    console.debug('MyLikesTabIndexPage ionViewWillEnter');
    console.log(this._placeStore);
    console.log(this._meStore);
    this.likedPlaces=[];
    this.likedEvents=[];

    this.meSubscription = this._meStore.me$.subscribe(
      (me: Me) => {
        this.me = me;
        console.log(me);
      }
    );

    this.placesSubscription = this._placeStore.places$.subscribe(
      (places: Array<Place>) => {
        this.all_places = places;
        console.log(places);
      }
    );

    this.eventsSubscription = this._eventStore.publicEvents$.subscribe(
      (events: Array<PublicEvent>) => {
        this.all_events = events;
        console.log(events);
      }
    );

    let liked_places_indexes=this.me.like_places;
    for(var i=0; i<this.all_places.length; i++){
      if(liked_places_indexes.indexOf(this.all_places[i].id)>-1){
        this.likedPlaces.push(this.all_places[i]);
      }
    }

    console.log(this.likedPlaces);

    let liked_events_indexes=this.me.like_events;
    for(var i=0; i<this.all_events.length; i++){
      if(liked_events_indexes.indexOf(this.all_events[i].id)>-1){
        this.likedEvents.push(this.all_events[i]);
      }
    }

    //for(var i=100; i<110; i++){
    //  this.likedEvents.push(this.all_events[i]);
    //}
    console.log(this.likedEvents);

  }

  ionViewDidEnter() {
    console.debug('MyLikesTabIndexPage ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.debug('MyLikesTabIndexPage ionViewWillLeave');
    this.meSubscription.unsubscribe();
    this.placesSubscription.unsubscribe();
    this.eventsSubscription.unsubscribe();
  }

  ionViewDidUnload() {
    console.debug('MyLikesTabIndexPage ionViewDidUnload');
  }

  ngOnDestroy() {

  }

  public changeDisplayToEvents(): void {
    this.showingEvents=true;
    this.showingDirectories=false;
  }

  public changeDisplayToDirectories(): void {
    this.showingEvents=false;
    this.showingDirectories=true;
  }

  public gotoDirectoryDetail(place){
    this._nav.push(DirectoryShowPage, { place: place, type: 0});
  }

  public gotoEventDetail(event){
    this._nav.push(PublicEventShowPage, { event: event, publicEventId: event.id, type: 1});
  }

}
