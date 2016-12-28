import { Type } from '@angular/core';
import { NotificationChannel } from './notification.channel';
import { ChatroomChannel } from './chatroom.channel';

export const CHANNEL_PROVIDERS: Type[] = [
  NotificationChannel,
  ChatroomChannel,
];
