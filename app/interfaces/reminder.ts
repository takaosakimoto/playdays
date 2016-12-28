import { PrivateEvent } from '../models';

export interface IFriendRequestReminder {
  name: string;
  friendId: number;
  id: number;
  image: string;
}

export interface IAcceptedFriendRequestReminder {
  name: string;
  friendId: number;
  id: number;
  image: string;
}

export interface ITrialClassReminder {
  name: string;
  id: number;
  date: Date;
  sessionId: number;
  timeSlotId: number;
}

export interface IJoinedPublicEventReminder {
  name: string;
  id: number;
  date: Date;
  sessionId: number;
  timeSlotId: number;
}

export interface ISharedPublicEventReminder extends IJoinedPublicEventReminder {
  consumerName: string;
  image: string;
}

export interface IPrivateEventInvitationReminder {
  id: number;
  state: string;
  privateEvent: PrivateEvent;
}

export interface INewPrivateEventParticipationReminder {
  id: number;
  privateEvent: PrivateEvent;
}

export interface IReminder {
  id: number;
  state: string;
  reminderType: string;
  createdAt: Date;
  content: IFriendRequestReminder | IAcceptedFriendRequestReminder | IJoinedPublicEventReminder | ISharedPublicEventReminder | ITrialClassReminder;
  date: Date;
}
