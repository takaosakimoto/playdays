import { Component } from '@angular/core';
import { NavController, Modal } from 'ionic-angular/index';
import { Subscription } from 'rxjs/Rx';
import { Chatroom } from '../../models';
import { GetChatroomsAction } from '../../actions';
import { ChatroomStore } from '../../stores';
import { ChatroomShowPage } from './show';
import { ChatroomNewChatPage } from './new-chat';
import * as moment from 'moment';

@Component({
  templateUrl: 'build/pages/chatroom/index.html',
  providers: [GetChatroomsAction]
})

export class ChatroomIndexPage {

  public chatrooms: Array<Chatroom>;
  private _chatroomsSubscription: Subscription;

  constructor(
    private _nav: NavController,
    private _chatroomStore: ChatroomStore,
    private _getChatroomsAction: GetChatroomsAction
  ) {
  }

  ngOnInit() {
    console.debug('ChatroomIndexPage ngOnInit');
    this._chatroomsSubscription = this._setupChatroomsSubscription();
  }

  ionViewWillEnter() {
    console.debug('ChatroomIndexPage ionViewWillEnter');
    this._getChatroomsAction.execute();
  }

  ionViewDidLeave() {
    console.debug('ChatroomIndexPage ionViewDidLeave');
  }
  ionViewDidUnload() {
    console.debug('DirectoryIndexPage ionViewDidUnload');
    this._chatroomsSubscription.unsubscribe();
  }

  public lastChatMessageDateFormat(date: Date): string {
    return moment(date).fromNow();
  }

  public goToChatroomShowPage(chatroom: Chatroom): void {
    this._nav.push(ChatroomShowPage, {chatroom: chatroom});
  }

  public openChatroomNewChatModel(): void {
    let modal = Modal.create(ChatroomNewChatPage);
    modal.onDismiss((chatroom) => {
      if (chatroom) {
        this.goToChatroomShowPage(chatroom);
      }
    });
    this._nav.present(modal);
  }

  private _setupChatroomsSubscription(): Subscription {
    let chatroomsSource = this._chatroomStore.chatrooms$;

    return chatroomsSource.subscribe((chatrooms: Array<Chatroom>) => {
      console.log(chatrooms);
      this.chatrooms = chatrooms;
    });
  }
}
