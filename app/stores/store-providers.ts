import { Type } from '@angular/core';
import { AppStore } from './app.store';
import { CategoryStore } from './category.store';
import { DistrictStore } from './district.store';
import { FriendStore } from './friend.store';
import { FriendRequestStore } from './friend-request.store';
import { MeStore } from './me.store';
import { PlaceStore } from './place.store';
import { PublicEventStore } from './public-event.store';
import { RegionStore } from './region.store';
import { ReminderStore } from './reminder.store';
import { TagStore } from './tag.store';
import { TimeSlotStore } from './time-slot.store';
import { TrialClassStore } from './trial-class.store';
import { UserStore } from './user.store';
import { SearchUsersResultStore } from './search-users-result.store';
import { ChatroomStore } from './chatroom.store';
import { SessionStore } from './session.store';
import { PrivateEventStore } from './private-event.store';
import { PrivateEventInvitationStore } from './private-event-invitation.store';
import { CommentStore } from './comment.store';

export const STORE_PROVIDERS: Type[] = [
  AppStore,
  DistrictStore,
  CategoryStore,
  ChatroomStore,
  FriendStore,
  FriendRequestStore,
  MeStore,
  PlaceStore,
  PublicEventStore,
  RegionStore,
  ReminderStore,
  TagStore,
  TimeSlotStore,
  TrialClassStore,
  FriendStore,
  UserStore,
  SearchUsersResultStore,
  SessionStore,
  PrivateEventStore,
  PrivateEventInvitationStore,
  CommentStore
];
