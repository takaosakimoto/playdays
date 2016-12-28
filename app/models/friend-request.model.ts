import * as _ from 'lodash';
import { ModelBase } from '../engine/model';

export class FriendRequest extends ModelBase<FriendRequest> {

  public id: number;
  public state: string;
  public requesterId: number;
  public requesteeId: number;
  public requester: {
    id: number;
    fbUserId: string;
    fbUserPictureUrl: string;
    name: string;
    aboutMe: string;
    children: Array<any>;
    region: {
      id: number;
      name: string;
    }
    district: {
      id: number;
      name: string;
    }
  };
  public requestee: {
    id: number;
    fbUserId: string;
    fbUserPictureUrl: string;
    name: string;
    aboutMe: string;
    children: Array<any>;
    region: {
      id: number;
      name: string;
    }
    district: {
      id: number;
      name: string;
    }
  };

  deserializeFromJson(json: any): FriendRequest {
    this.id = _.get(json, 'id', 0);
    this.state = _.get(json, 'state', '');
    this.requesterId = _.get(json, 'requester_id', 0);
    this.requesteeId = _.get(json, 'requestee_id', 0);

    let requesterFbUserId = _.get(json, 'requester.fb_user_id', '');

    if (requesterFbUserId) {
      this.requester = {
        id: _.get(json, 'requester.id', 0),
        children: _.get(json, 'requester.children', []),
        fbUserId: requesterFbUserId,
        fbUserPictureUrl: `https://graph.facebook.com/v2.6/${requesterFbUserId}/picture?height=100`,
        name: _.get(json, 'requester.name', ''),
        aboutMe: _.get(json, 'requester.about_me', ''),
        region: {
          id: _.get(json, 'requester.region.id', 0),
          name: _.get(json, 'requester.region.name', '')
        },
        district: {
          id: _.get(json, 'requester.district.id', 0),
          name: _.get(json, 'requester.district.name', ''),
        }
      };
    }

    let requesteeFbUserId = _.get(json, 'requestee.fb_user_id', '');
    if (requesteeFbUserId) {
      this.requestee = {
        id: _.get(json, 'requestee.id', 0),
        children: _.get(json, 'requestee.children', []),
        fbUserId: requesteeFbUserId,
        fbUserPictureUrl: `https://graph.facebook.com/v2.6/${requesteeFbUserId}/picture?height=100`,
        name: _.get(json, 'requestee.name', ''),
        aboutMe: _.get(json, 'requestee.about_me', ''),
        region: {
          id: _.get(json, 'requestee.region.id', 0),
          name: _.get(json, 'requestee.region.name', '')
        },
        district: {
          id: _.get(json, 'requestee.district.id', 0),
          name: _.get(json, 'requestee.district.name', ''),
        }
      };
    }

    return this;
  }
}
