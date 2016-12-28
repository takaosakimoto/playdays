import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular/index';
import { CreateChatroomAction } from '../../actions';
import { ICreateChatroomRequest } from '../../interfaces';
import { Friend, Chatroom } from '../../models';
import { ChatroomShowPage } from '../chatroom/show';

@Component({
  templateUrl: 'build/pages/friend/show.html',
  providers: [CreateChatroomAction],
})

export class FriendShowPage {
  public friend: Friend;

  constructor(
    private _navParams: NavParams,
    private _nav: NavController,
    private _createChatroomAction: CreateChatroomAction
  ) {
  }

  ngOnInit() {
    console.debug('FriendShowPage ngOnInit');
    this.friend = this._navParams.data.friend;
  }

  public createChatroom(): void {
    let params: ICreateChatroomRequest = {
      consumer_id: this.friend.id
    };
    this._createChatroomAction.success$.first().subscribe(
      (chatroom: Chatroom): void => {
        this._nav.push(ChatroomShowPage, {chatroom: chatroom});
      });
    this._createChatroomAction.error$.first().subscribe(
      (e): void => {
        console.debug(e);
      });
    this._createChatroomAction.execute(params);
  }

}
