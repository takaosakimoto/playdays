import { Type } from '@angular/core';

import { AcceptedFriendRequestReminderComponent } from './accepted-friend-request';
import { FriendRequestReminderComponent } from './friend-request';
import { JoinedPublicEventReminderComponent } from './joined-public-event';
import { JoinedTrialClassReminderComponent } from './joined-trial-class';
import { RejectedTrialClassReminderComponent } from './rejected-trial-class';
import { PrivateEventInvitationReminderComponent } from './private-event-invitation';
import { NewPrivateEventParticipationReminderComponent } from './new-private-event-participation';
import { SharedPublicEventReminderComponent } from './shared-public-event';

export const DASHBOARD_CARD_DIRECTIVES: Type[] = [
  AcceptedFriendRequestReminderComponent,
  FriendRequestReminderComponent,
  JoinedPublicEventReminderComponent,
  JoinedTrialClassReminderComponent,
  RejectedTrialClassReminderComponent,
  PrivateEventInvitationReminderComponent,
  NewPrivateEventParticipationReminderComponent,
  SharedPublicEventReminderComponent
];
