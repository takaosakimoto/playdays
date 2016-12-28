import * as _ from 'lodash';
import { ModelBase } from '../engine/model';
//import { IFBAuthenticationStatus } from '../interfaces';
import { IAuthenticationStatus } from '../interfaces';

class PlaceType {
  public name:String = '';
  public id:Number = 0;
}

export class Me extends ModelBase<Me> {

  public id: number;
  public fbUserId: string;
  //public fbAuthenticationStatus: IFBAuthenticationStatus;
  public authenticationStatus: IAuthenticationStatus;
  //public fbCurrentUser: any;
  public device: {
    fbAccessToken: string;
    fbExpiresIn: number;
  };

  //public fbUserPictureUrl: string;
  public fname: string;
  public lname: string;
  public email: string;
  public status: string;
  //public region: PlaceType;
  public region_id: number;
  //public district: PlaceType;
  public district_id: number;
  public children: Array<any>;
  public aboutMe: string;
  //public friendsCount: number;
  public languages: Array<String>;
  public mobilePhoneNumber: String;
  public like_places: Array<Number>;
  public like_events: Array<Number>;
  public password: any;

  deserializeFromJson(json: any): Me{
    this.id=_.get(json, 'id', 0);
    this.fbUserId=''+_.get(json, 'id', 0);
    this.device = {
      fbAccessToken: _.get(json, 'token', ''),
      fbExpiresIn: _.get(json, 'expires_in', 0)
    };
    if(this.device.fbAccessToken!=''){
      this.status="connected";
      window.localStorage.setItem('authorized', 'activated');
    }else{
      this.status="";
      window.localStorage.setItem('authorized', '');
    }
    this.fname = _.get(json, 'fname', '');
    this.lname = _.get(json, 'lname', '');
    this.email = _.get(json, 'email', '');
    this.region_id = _.get(json, 'region_id', 0);
    if(this.region_id==null)
      this.region_id=0;
    this.district_id= _.get(json, 'district_id', 0);
    if(this.district_id==null)
      this.district_id=0;
    this.children = _.get(json, 'children', []);
    this.aboutMe = _.get(json, 'about_me', '');
    this.languages = _.get(json, 'languages', []);
    this.like_places = _.get(json, 'like_places', []);
    if(this.like_places==null)
      this.like_places=[];
    this.like_events = _.get(json, 'like_events', []);
    if(this.like_events==null)
      this.like_events=[];
    this.mobilePhoneNumber = _.get(json, 'mobile_phone_number', '');
    this.password = _.get(json, 'password', '');
    
    //this.authenticationStatus.authResponse.userID=''+this.id;
    //this.authenticationStatus.authResponse.accessToken=this.device.fbAccessToken;
    //this.authenticationStatus.authResponse.expiresIn=this.device.fbExpiresIn;


    window.localStorage.setItem('userID', ''+this.id);
    window.localStorage.setItem('token', this.device.fbAccessToken);
    window.localStorage.setItem('expiresIn', ''+this.device.fbExpiresIn);

    return this;
  }

  //deserializeFromJson(json: any): Me {
  //  this.id = _.get(json, 'id', 0);
  //  this.fbUserId = _.get(json, 'fb_user_id', '');
  //  this.device = {
  //    fbAccessToken: _.get(json, 'device.fb_access_token', ''),
  //    fbExpiresIn: _.get(json, 'device.fb_expires_in', 0)
  //  };
  //  this.fbUserPictureUrl = `https://graph.facebook.com/v2.6/${this.fbUserId}/picture?height=300`;
  //  this.fname = _.get(json, 'name', '');
  //  this.email = _.get(json, 'email', '');
  //  this.region = _.get(json, 'region', new PlaceType);
  //  this.district = _.get(json, 'district', new PlaceType);
  //  this.children = _.get(json, 'children', []);
  //  this.aboutMe = _.get(json, 'about_me', '');
  //  this.friendsCount = _.get(json, 'friends_count', 0);
  //  this.languages = _.get(json, 'languages', []);
  //  this.mobilePhoneNumber = _.get(json, 'mobile_phone_number', '');
  //  return this;
  //}


}
