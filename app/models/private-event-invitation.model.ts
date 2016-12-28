import * as _ from 'lodash';
import { ModelBase } from '../engine/model';
import { Friend } from './friend.model';
import { PrivateEvent } from './private-event.model';

export class PrivateEventInvitation extends ModelBase<PrivateEventInvitation> {

  public id: number;
  public state: string;
  public privateEventId : number;
  public privateEvent: PrivateEvent;
  public consumerId: number;
  public friend: Friend;
  public insertedAt: Date;
  public updatedAt: Date;

  deserializeFromJson(json: any): PrivateEventInvitation {
    this.id = _.get(json, 'id', 0);
    this.state = _.get(json, 'state', '');
    this.privateEventId = _.get(json, 'private_event_id', 0);
    this.consumerId = _.get(json, 'consumer_id', 0);
    this.friend  = new Friend(_.get(json, 'consumer'));

    let privateEvent = _.get(json, 'private_event');
    if (privateEvent) {
      this.privateEvent = new PrivateEvent(privateEvent);
    }

    return this;
  }
}
