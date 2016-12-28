import * as _ from 'lodash';
import { ModelBase } from '../engine/model';

export class User extends ModelBase<User> {

  public id: number;
  public fbUserId: string;
  public fbUserPictureUrl: string;
  public name: string;
  public region: {
    name: string;
  };
  public district: {
    name: string;
  };
  public children: Array<any>;
  public aboutMe: string;
  public isAdded: boolean = false;

  deserializeFromJson(json: any): User {
    let fbUserId = _.get(json, 'fb_user_id', '');
    this.id = _.get(json, 'id', 0);
    this.fbUserId = fbUserId;
    this.fbUserPictureUrl = `https://graph.facebook.com/v2.6/${fbUserId}/picture?height=300`;
    this.name = _.get(json, 'name', '');
    this.region = {
      name: _.get(json, 'region.name', ''),
    };
    this.district = {
      name: _.get(json, 'district.name', '')
    };
    this.children = _.get(json, 'children', []);
    this.aboutMe = _.get(json, 'about_me', '');

    return this;
  }
}
