import { ModelBase } from '../engine/model';
import * as _ from 'lodash';

export class VerifiedAccessToken extends ModelBase<VerifiedAccessToken> {
  public id: number;
  public fbUserId: string;
  public isValid: boolean;


  deserializeFromJson(json: any): VerifiedAccessToken {
    this.id = _.get(json, 'user_id', 0);
    this.fbUserId = _.get(json, 'fb_user_id', '');
    this.isValid = _.get(json, 'is_valid', false);
    return this;
  }
}
