import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Modal } from 'ionic-angular';
import { ChatParticipation, Friend } from '../../models';
import { CreateChatParticipationAction } from '../../actions';
import { ICreateChatParticipationRequest } from '../../interfaces';
import { FriendStore } from '../../stores';
import { FriendGroupList } from '../../components';
import { SelectFriend } from './select-friend';
import * as _ from 'lodash';

@Component({
  templateUrl: 'build/pages/chatroom/chat-participations-index.html',
  providers: [CreateChatParticipationAction],
  directives: [FriendGroupList]
})

export class ChatParticipationsIndexPage {

  public chatParticipations: Array<ChatParticipation>;
  private chatRoomId: number;

  constructor(
    private _nav: NavController,
    private _viewCtrl: ViewController,
    private _navParams: NavParams,
    private _friendStore: FriendStore,
    private _createChatParticipationAction: CreateChatParticipationAction
  ) {
  }

  ngOnInit() {
    console.debug('ChatParticipationsIndex ngOnInit');

    this.chatParticipations = this._navParams.data.chatroom.chatParticipations;
    this.chatRoomId = this._navParams.data.chatroom.id;
  }

  public close() {
    this._viewCtrl.dismiss();
  }

  public addUserToChatRoom() {
    this._friendStore.friends$.subscribe(
      (friends: Array<Friend>): void => {
        const inGroup = _.map(this.chatParticipations, (cp)=>({id: cp.consumerId}));
        const filteredFriends = _['differenceBy'](friends, inGroup, 'id');

        let modal = Modal.create(SelectFriend, {friends: filteredFriends});
        modal.onDismiss((friend) => {
          if (friend) {
            this._createChatParticipationAction.success$.subscribe(
              (cp:ChatParticipation) => this.chatParticipations.push(cp)
            )
            this._createChatParticipationAction.error$.subscribe(
              e => console.log('Error While Creating Chat Participation', e)
            )

            this._createChatParticipationAction.execute({
              consumer_id: friend.id, chatroom_id: this.chatRoomId
            });

          }
        });
        this._nav.present(modal);
      }
    )
  }

}
