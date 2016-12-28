import { Component, Pipe, PipeTransform } from '@angular/core';
import { NavController, Modal } from 'ionic-angular/index';
import { Subscription } from 'rxjs/Rx';
import { Me as BaseMe } from '../../models';
import { MeStore, DestroyStores } from '../../stores';
import { GetMeAction, LogoutAction } from '../../actions';
import { ProfileEditPage } from './edit';
import { FriendIndexPage } from '../friend/index';
import { RegionStore, DistrictStore } from '../../stores';
import { Region, District } from '../../models';
import * as _ from 'lodash';
import * as moment from 'moment';
import { ILogoutRequest } from '../../interfaces';
import { TabsPage } from '../tabs/tabs';

interface Me extends BaseMe {
  languagesString: String;
  liveIn: String;
  childrenAge: Array<String>;
}

const ORDINALS = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth'];
@Pipe({name: 'ordinalInWord'})
class OrdinalInWordPipe implements PipeTransform {
  transform(num: number): String {
    return _.get(ORDINALS, num, String(num));
  }
}

function dob2Age(dob: {birthday: String}): String {
  let d = moment().set({date: 1, hour: 0, minute: 0, second: 0});
  let t = d.diff(moment(dob.birthday + '-01'), 'years', true);

  let result:String;
  switch (Math.trunc(t)) {
    case 0:
      result = '';
      break;
    case 1:
      result = '1 year ';
      break;
    default:
      result = String(Math.trunc(t)) + ' years '
      break;
  };
  let month = Math.round(t % 1 * 12);
  if (month === 0 && result !== '') {
    return result;
  } else {
    return String(month) + ' month' + (month>1?'s':'');
  }

}

@Component({
  templateUrl: 'build/pages/profile-tab/index.html',
  providers: [GetMeAction, DestroyStores, LogoutAction],
  pipes: [OrdinalInWordPipe]
})
export class ProfileTabIndexPage {
  public isLoading: boolean;
  public fbUserPictureUrl: string;
  public me: Me;
  private meSubscription: Subscription;
  private regionSubscription: Subscription;
  private districtSubscription: Subscription;

  public regions: Array<Region>;
  public districts: Array<District>;

  private current_region: Region;
  private current_district: District;

  public _firstN:string;
  public _lastN:string;
  public font_C:string;
  public back_C:string;

  constructor(
    private _nav: NavController,
    private _meStore: MeStore,
    private _destroyStore: DestroyStores,
    private _getMeAction: GetMeAction,
    private _regionStore: RegionStore,
    private _districtStore: DistrictStore,
    private _logoutAction: LogoutAction
  ) {
  }

  ngOnInit() {
    let _back_colors=['#123123', '#b612bf', '#39a538', '#d6b926', '#26c4d6'];
    let _font_colors=['#ffffff', '#31cbd4', '#ce20b7', '#20ce37', '#ecf129'];
    let pos= Math.floor(Math.random()*5)
    this.back_C=_back_colors[pos];
    this.font_C=_font_colors[pos];

    console.debug('ProfileTabIndexPage ngOnInit');
    this._setupMe();
    this._firstN=this.me.fname.charAt(0);
    this._lastN=this.me.lname.charAt(0);
  }

  ionViewDidUnload() {
    console.debug('ProfileTabIndexPage ionViewDidUnload');
    //this.meSubscription.unsubscribe();
    this.regionSubscription.unsubscribe();
    this.districtSubscription.unsubscribe();
  }

  public logout() {
    window.localStorage.setItem('authorized', '');
    this._nav.pop();
    this._nav.parent.select(0);
    this._destroyStore.logout();

    
    //let _logoutRequest: ILogoutRequest = {
    //  user_Id: window.localStorage.getItem('userID')
    //};
    //this._logoutAction.execute(_logoutRequest);

  }

  public gotoEditPage() {
    this._nav.push(ProfileEditPage, {me: this.me});
  }

  public gotoFriendIndex() {
    this._nav.push(FriendIndexPage);
  }

  private _setupMe() {

    this.regionSubscription = this._regionStore.regions$.subscribe(
      (regions: Array<Region>) => {
        this.regions = regions;
      }
    );

    this.districtSubscription = this._districtStore.districts$.subscribe(
      (districts: Array<District>) => {
        this.districts = districts;
      }
    );

    this.meSubscription = this._meStore.me$.subscribe(
      (me: Me) => {
        this.me = me;

        if (_.isEmpty(me)) return;
    
        this.me.languagesString = _(me.languages)
          .map(_['upperFirst'])
          .join(', ');

        this.me.liveIn='';
        if(this.me.region_id!=0){
          this.me.liveIn = this.regions[this.me.region_id-1].name;
        }
        if(this.me.district_id!=0){
         this.me.liveIn+=', ' + this.districts[this.me.district_id-1].name;
        }
        this.me.childrenAge = _.map(me.children, dob2Age);
        //console.log(me);
      }
    );

    if (_.isEmpty(this.me)) return;

    this._getMeAction.error$.subscribe(
      (e) => {
        console.error('failed to get the current user', e);
      }
    );

    //this._getMeAction.execute(null);
  }

}
