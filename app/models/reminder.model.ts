import * as _ from 'lodash';
import { ModelBase } from '../engine/model';
import { PrivateEvent } from '../models';
import {
  IFriendRequestReminder,
  IAcceptedFriendRequestReminder,
  ITrialClassReminder,
  IJoinedPublicEventReminder,
  ISharedPublicEventReminder,
  IPrivateEventInvitationReminder,
  INewPrivateEventParticipationReminder,
} from '../interfaces/index';

// invitation of joining private group
// acceptance of people joining private group

function json2FriendRequest(json: Object): IFriendRequestReminder {
  let image = _.get(json, 'image', '');
  return {
    name: _.get(json, 'name', ''),
    friendId: _.get(json, 'friend_id', 0),
    id: _.get(json, 'id', 0),
    image: `https://graph.facebook.com/v2.6/${image}/picture?height=300`,
  };
}

function json2AcceptedFriendRequest(json: Object): IAcceptedFriendRequestReminder {
  let image = _.get(json, 'image', '');
  return {
    name: _.get(json, 'name', ''),
    friendId: _.get(json, 'friend_id', 0),
    id: _.get(json, 'id', 0),
    image: `https://graph.facebook.com/v2.6/${image}/picture?height=300`,
  };
}

function json2TrialClass(json: Object): ITrialClassReminder {
  return {
    name: _.get(json, 'name', ''),
    date: new Date(_.get(json, 'date', 0)),
    id: _.get(json, 'id', 0),
    sessionId: _.get(json, 'session_id', 0),
    timeSlotId: _.get(json, 'time_slot_id', 0),
  };
}

function json2JoinedPublicEvent(json: Object): IJoinedPublicEventReminder {
  return {
    name: _.get(json, 'name', ''),
    date: new Date(_.get(json, 'date', 0)),
    id: _.get(json, 'id', 0),
    sessionId: _.get(json, 'session_id', 0),
    timeSlotId: _.get(json, 'time_slot_id', 0),
  };
}

function json2SharedPublicEvent(json: Object): ISharedPublicEventReminder {
  let image = _.get(json, 'image', '');

  return {
    name: _.get(json, 'name', ''),
    date: new Date(_.get(json, 'date', 0)),
    consumerName: _.get(json, 'consumer_name', ''),
    id: _.get(json, 'id', 0),
    sessionId: _.get(json, 'session_id', 0),
    timeSlotId: _.get(json, 'time_slot_id', 0),
    image: `https://graph.facebook.com/v2.6/${image}/picture?height=300`,
  };
}

function json2PrivateEventInvitation(json: Object): IPrivateEventInvitationReminder {
  return {
    id: _.get(json, 'id', 0),
    state: _.get(json, 'state', ''),
    privateEvent: new PrivateEvent(_.get(json, 'private_event', {})),
  };
}

function json2NewPrivateEventParticipation(json: Object): INewPrivateEventParticipationReminder {
  return {
    id: _.get(json, 'id', 0),
    privateEvent: new PrivateEvent(_.get(json, 'private_event', {})),
  };
}

export class Reminder extends ModelBase<Reminder> {
  public id: number;
  public state: string;
  public reminderType: string;
  public createdAt: Date;
  public content: IFriendRequestReminder | IAcceptedFriendRequestReminder | IJoinedPublicEventReminder | ISharedPublicEventReminder | ITrialClassReminder | IPrivateEventInvitationReminder | INewPrivateEventParticipationReminder

  deserializeFromJson(json: any): Reminder {
    this.id = _.get(json, 'id', 0);
    this.state = _.get(json, 'state', '');
    this.reminderType = _.get(json, 'reminder_type', '');
    this.createdAt = new Date(_.get(json, 'inserted_at', 0));
    let content = _.get(json, 'content', {});
    switch (this.reminderType) {
      case 'friendRequestReminder':
        this.content = json2FriendRequest(content);
        break;
      case 'acceptedFriendRequestReminder':
        this.content = json2AcceptedFriendRequest(content);
        break;
      case 'joinedPublicEventReminder':
        this.content = json2JoinedPublicEvent(content);
        break;
      case 'sharedPublicEventReminder':
        this.content = json2SharedPublicEvent(content);
        break;
      case 'joinedTrialClassReminder':
        this.content = json2TrialClass(content);
        break;
      case 'rejectedTrialClassReminder':
        this.content = json2TrialClass(content);
        break;
      case 'privateEventInvitationReminder':
        this.content = json2PrivateEventInvitation(content);
        break;
      case 'newPrivateEventParticipationReminder':
        this.content = json2NewPrivateEventParticipation(content);
        break;
      default:
        console.error('Unkowen reminder type');
        break;
    }

    return this;
  }

  afterStoreDeserialize(): void {
    this.createdAt = new Date(this[`createdAt`]);
    switch (this.reminderType) {
      case 'joinedPublicEventReminder':
      case 'sharedPublicEventReminder':
      case 'joinedTrialClassReminder':
      case 'rejectedTrialClassReminder':
        this.content['date'] = new Date(this.content['date']);
        break;
    };
  };

}
