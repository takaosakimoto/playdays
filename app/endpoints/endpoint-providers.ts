import { Type } from '@angular/core';

import { ChatroomEndpoint } from './chatroom.endpoint';
import { ChatMessageEndpoint } from './chat-message.endpoint';
import { ChatParticipationEndpoint } from './chat-participation.endpoint';
import { CommentEndpoint } from './comment.endpoint';
import { DeviceEndpoint } from './device.endpoint';
import { DistrictEndpoint } from './district.endpoint';
import { FriendEndpoint } from './friend.endpoint';
import { FriendRequestEndpoint } from './friend-request.endpoint';
import { PlaceEndpoint } from './place.endpoint';
import { PrivateEventEndpoint } from './private-event.endpoint';
import { PrivateEventInvitationEndpoint } from './private-event-invitation.endpoint';
import { PublicEventEndpoint } from './public-event.endpoint';
import { RegionEndpoint } from './region.endpoint';
import { RegistrationEndpoint } from './registration.endpoint';
import { UpdateEndpoint } from './update.endpoint';
import { LoginEndpoint } from './login.endpoint';
import { ReminderEndpoint } from './reminder.endpoint';
import { SessionEndpoint } from './session.endpoint';
import { TagEndpoint } from './tag.endpoint';
import { TrialClassEndpoint } from './trial-class.endpoint';
import { UserEndpoint } from './user.endpoint';
import { VerifyAccessTokenEndpoint } from './verify-access-token.endpoint';
import { MeEndpoint } from './me.endpoint';
import { LogoutEndpoint } from './logout.endpoint';
import { CategoryEndpoint } from './category.endpoint';

export const ENDPOINT_PROVIDERS: Type[] = [
  CategoryEndpoint,
  DistrictEndpoint,
  FriendEndpoint,
  FriendRequestEndpoint,
  PlaceEndpoint,
  PublicEventEndpoint,
  RegionEndpoint,
  RegistrationEndpoint,
  LoginEndpoint,
  ReminderEndpoint,
  SessionEndpoint,
  TagEndpoint,
  TrialClassEndpoint,
  UserEndpoint,
  ChatroomEndpoint,
  ChatMessageEndpoint,
  ChatParticipationEndpoint,
  VerifyAccessTokenEndpoint,
  PrivateEventEndpoint,
  PrivateEventInvitationEndpoint,
  DeviceEndpoint,
  MeEndpoint,
  CommentEndpoint,
  LogoutEndpoint,
  UpdateEndpoint
];
