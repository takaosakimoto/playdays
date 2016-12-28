import { Injectable } from '@angular/core';
// import { Platform } from 'ionic-angular/index';
import {
  ChatroomStore,
  FriendStore,
  FriendRequestStore,
  MeStore,
  ReminderStore,
  SearchUsersResultStore,
  SessionStore,
  PrivateEventStore,
  PrivateEventInvitationStore,
} from './index';
import * as _ from 'lodash';

@Injectable()
export class DestroyStores {

  constructor(
    private _chatroomStore: ChatroomStore,
    private _friendStore: FriendStore,
    private _friendRequestStore: FriendRequestStore,
    private _meStore: MeStore,
    private _reminderStore: ReminderStore,
    private _searchUsersResultStore: SearchUsersResultStore,
    private _sessionStore: SessionStore,
    private _privateEventStore: PrivateEventStore,
    private _privateEventInvitationStore: PrivateEventInvitationStore
  ) {
  }

  public logout(): void {
    _([
      this._meStore
    ]).each(
      _.method('destroy')
    );

    //_([
    //  this._chatroomStore,
    //  this._friendStore,
    //  this._friendRequestStore,
    //  this._meStore,
    //  this._reminderStore,
    //  this._friendStore,
    //  this._searchUsersResultStore,
    //  this._sessionStore,
    //  this._privateEventStore,
    //  this._privateEventInvitationStore
    //]).each(
    //  _.method('destroy')
    //);
  }

}
