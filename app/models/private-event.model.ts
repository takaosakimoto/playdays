import * as _ from 'lodash';
import { ModelBase } from '../engine/model';
import { Place} from './place.model';
import { Friend } from './friend.model';
import { PrivateEventInvitation } from './private-event-invitation.model';
import { PrivateEventParticipation } from './private-event-participation.model';

export class PrivateEvent extends ModelBase<PrivateEvent> {

  public id: number;
  public name: string;
  public date: Date;
  public from: Date;
  public place: Place;
  public host: Friend;
  public privateEventInvitations:  Array<PrivateEventInvitation>;
  public privateEventParticipations: Array<PrivateEventParticipation>;

  deserializeFromJson(json: any): PrivateEvent {
    this.id = _.get(json, 'id', 0);
    this.name = _.get(json, 'name', '');
    this.date = new Date(_.get(json, 'date', 0));
    this.from = new Date(_.get(json, 'from', 0));
    this.place = new Place(_.get(json, 'place', {}));
    this.host = new Friend(_.get(json, 'host', {}));

    this.privateEventInvitations = _.get(json, 'private_event_invitations', []).map(i => new PrivateEventInvitation(i));
    this.privateEventParticipations = _.get(json, 'private_event_participations', []).map(p => new PrivateEventParticipation(p));
    return this;
  }
}
