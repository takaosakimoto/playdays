import * as _ from 'lodash';
import { ModelBase } from '../engine/model';
import { Friend } from './friend.model';

export class PrivateEventParticipation extends ModelBase<PrivateEventParticipation> {

  public id: number;
  public state: string;
  public privateEventId : number;
  public consumerId: number;
  public friend: Friend;
  public insertedAt: Date;
  public updatedAt: Date;

  deserializeFromJson(json: any): PrivateEventParticipation {
    this.id = _.get(json, 'id', 0);
    this.state = _.get(json, 'state', '');
    this.privateEventId = _.get(json, 'private_event_id', 0);
    this.consumerId = _.get(json, 'consumer_id', 0);
    this.friend  = new Friend(_.get(json, 'consumer'));
    return this;
  }
}
