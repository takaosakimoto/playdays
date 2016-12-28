import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProtectedDirective } from '../../directives/protected.directive';
import { Platform } from 'ionic-angular/index';
import { DomSanitizationService, SafeResourceUrl } from '@angular/platform-browser';
// import {ElasticHeader} from '../../directives/elastic-header.directive';
import * as moment from 'moment';
import { MeStore, DestroyStores } from '../../stores';
import { Me } from '../../models';
import { Subscription } from 'rxjs/Rx'
import { IUpdateRequest } from '../../interfaces';

interface Param {
  item: Item;
  timeSlotId: Number;
  isLiked: Boolean;
  type: Number;
}

interface Item {
  id: Number;
  name: String;
  websiteUrl: String;
  contactNumber: String;
  locationAddress: String;
  description: String;
  image : String;
  priceRange?: {hi: Number, lo: Number};
  lat: String;
  long: String;
}

@Component({
  selector: 'show-detail',
  templateUrl: 'build/components/show-detail/index.html',
  directives: [ProtectedDirective]
})
export class ShowDetailComponent {
  @Input() public model:Param;
  @Output() public joinOnClick = new EventEmitter<Param>();
  @Output() public onClickLike = new EventEmitter<IUpdateRequest>();

  constructor(
    private _platform: Platform,
    private _meStore: MeStore,
    private _sanitationService: DomSanitizationService
  ) {
  }

  public mapHref: SafeResourceUrl = '';
  public me: Me;
  private meSubscription: Subscription;
  private _requestParams: IUpdateRequest;

  ngOnInit(): void {
    console.debug('ShowDetailComponent OnInit');
    console.log(this.model);
    this.meSubscription = this._meStore.me$.subscribe(
      (me: Me) => {
        this.me = me;
        console.log(me);
      }
    );
    console.log(this.model.type);
    console.log(this.model.item.id);
    if(this.model.type==1){
      if(this.in_array(this.me.like_places, this.model.item.id)){
        this.model.isLiked=true;
      }else{
        this.model.isLiked=false;
      }
    }else{
      if(this.in_array(this.me.like_events, this.model.item.id)){
        this.model.isLiked=true;
      }else{
        this.model.isLiked=false;
      }
    }
    console.log(this.model.isLiked);
  }

  ngAfterViewInit():void {
    const ll = `${this.model.item.lat},${this.model.item.long}`;
    const name = this.model.item.name;
    this.mapHref = this._sanitationService.bypassSecurityTrustUrl(
      this._platform.is('ios')
        ? `maps:ll=${ll}&q=${name}&z=19`
        : `geo:${ll}?q=loc:${ll}+(${name})&z=19`
    );
  }

  emitJoinOnClick():void {
    this.joinOnClick.emit(this.model);
  }

  emitOnClickLike():void {
    if(this.model.isLiked){
      if(this.model.type==1){
        let index = this.me.like_places.indexOf(this.model.item.id);
        this.me.like_places.splice(index, 1);
      }else{
        let index = this.me.like_events.indexOf(this.model.item.id);
        this.me.like_events.splice(index, 1);
      }
      
      this.model.isLiked=false;
    }else{
      if(this.model.type==1)
        this.me.like_places.push(this.model.item.id);
      else
        this.me.like_events.push(this.model.item.id);
      this.model.isLiked=true;
    }

    this._requestParams={
      token: window.localStorage.getItem('token'),
      id: this.me.id,
      fname: this.me.fname,
      lname: this.me.lname,
      email: this.me.email,
      region_id: this.me.region_id,
      district_id: this.me.district_id,
      about_me: this.me.aboutMe,
      mobile_phone_number: this.me.mobilePhoneNumber,
      languages: this.me.languages,
      children: this.me.children,
      password: this.me.password,
      like_places: this.me.like_places,
      like_events: this.me.like_events
    };

    this.onClickLike.emit(this._requestParams);
  }

  gotoLike(){
    console.log(this.model);
    console.log(this.model.isLiked);

   
    
    //this._updateAction.execute(this._requestParams);

    this._meStore.update(this.me);
    console.log(this.me);
    console.log(this.model.isLiked);
  }

  in_array(array, id){
    //for(var i=0;i<array.length;i++) {
    //    return (array[i] === id)
    //}
    //return false;
    return array.includes(id);
  }
}
