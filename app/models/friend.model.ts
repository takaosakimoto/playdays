import * as _ from 'lodash';
import { ModelBase } from '../engine/model';
import { Region } from './region.model';
import { District } from './district.model';

export class Friend extends ModelBase<Friend> {

  public id: number;
  public fbUserId: string;
  public fbUserPictureUrl: string;
  public name: string;
  public region: Region;
  public district: District;
  public children: Array<any>;
  public languages: Array<string>;
  public aboutMe: string;

  deserializeFromJson(json: any): Friend {
    let fbUserId = _.get(json, 'fb_user_id', '');
    this.id = _.get(json, 'id', 0);
    this.fbUserId = fbUserId;
    this.fbUserPictureUrl = `https://graph.facebook.com/v2.6/${fbUserId}/picture?height=300`;
    this.name = _.get(json, 'name', '');

    let r = _.get(json, 'region', null);
    if (r) {
      this.region = new Region(r);
    }
    let d = _.get(json, 'district', null);
    if (d) {
      this.district = new District(d);
    }

    this.children = _.get(json, 'children', []);
    this.languages = _.get(json, 'languages', []);
    this.aboutMe = _.get(json, 'about_me', '');


    return this;
  }
}
