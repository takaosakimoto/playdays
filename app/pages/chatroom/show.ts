import { NgZone, ViewChild, Component } from '@angular/core';
import { NavParams, Content, NavController, Platform } from 'ionic-angular/index';
import { Keyboard } from 'ionic-native';
import { Subscription } from 'rxjs/Rx';
import { ICreateChatMessageRequest, IUpdateChatParticipationRequest } from '../../interfaces';
import { Me, Chatroom, ChatParticipation, ChatMessage} from '../../models';
import { MeStore, ChatroomStore } from '../../stores';
import { ChatParticipationsIndexPage } from './chat-participations-index';
import {
  GetOneChatroomAction,
  CreateChatMessageAction,
  UpdateChatParticipationAction,
  SubscribeNewChatMessageCreatedNotificationAction
} from '../../actions';
import { Autosize } from '../../directives/auto-size-textarea.directive';
import * as _ from 'lodash';

@Component({
  templateUrl: 'build/pages/chatroom/show.html',
  providers: [GetOneChatroomAction, CreateChatMessageAction, UpdateChatParticipationAction],
  directives: [Autosize],
})

export class ChatroomShowPage {
  @ViewChild(Content) content: Content;
  public currentChatParticipation: ChatParticipation;
  public chatBox: string = '';
  public chatroom: Chatroom;
  public chatParticipations: Array<ChatParticipation>;
  public showContent: boolean = false;
  private _active: boolean = false;
  private _chatroomSubscription: Subscription;
  // private _createChatMessageActionSuccessSubscription: Subscription;
  private _newChatMessageCreatedSubscription: Subscription;
  private _unregisterResumeEventListenter;

  constructor(
    private _ngZone: NgZone,
    private _platform: Platform,
    private _navParams: NavParams,
    private _meStore: MeStore,
    private _nav: NavController,
    private _chatroomStore: ChatroomStore,
    private _getOneChatroomAction: GetOneChatroomAction,
    private _createChatMessageAction: CreateChatMessageAction,
    private _updateChatParticipationAction: UpdateChatParticipationAction,
    private _subscribeNewChatMessageCreatedNotificationAction: SubscribeNewChatMessageCreatedNotificationAction
  ) {
  }

  ngOnInit() {
    console.debug('ChatroomShowPage ngOnInit');
    this.chatroom = this._navParams.data.chatroom;
    this.chatParticipations = this.chatroom.chatParticipations;
    this._meStore.me$.first().subscribe((me: Me) => {
      this.currentChatParticipation = _.find(this.chatroom.chatParticipations, (cp: ChatParticipation) => cp.consumerId === me.id);
    }).unsubscribe();

    this._chatroomSubscription = this._setupChatroomSubscription();
    // this._createChatMessageActionSuccessSubscription = this._setupCreateChatMessageActionSuccessSubscription();
    this._newChatMessageCreatedSubscription = this._setupNewChatMessageCreatedSubscription();
    if (!this._unregisterResumeEventListenter) {
      this._unregisterResumeEventListenter = document.addEventListener('resume', () => {
        this._getOneChatroomAction.execute(this.chatroom.id);
        this._updateChatParticipationLastReadChatMessage();
      });
    }
  }

  ionViewWillEnter() {
    console.debug('ChatroomShowPage ionViewWillEnter');
    this.showContent = false;
  }

  ionViewDidEnter() {
    console.debug('ChatroomShowPage ionViewDidEnter');
    this._scrollToBottom();
    setTimeout(() => {
      this.showContent = true;
    }, 300);

    this._platform.ready().then(() => {
      Keyboard.disableScroll(false);
    });

    this._active = true;
    this._getOneChatroomAction.execute(this.chatroom.id);
    this._updateChatParticipationLastReadChatMessage();
  }

  ionViewWillLeave() {
    this._active = false;
  }

  ionViewDidLeave() {
    console.debug('ChatroomShowPage ionViewDidLeave');

  }

  ionViewDidUnload() {
    console.debug('ChatroomShowPage ionViewDidUnload');
    this._chatroomSubscription.unsubscribe();
    // this._createChatMessageActionSuccessSubscription.unsubscribe();
    this._unregisterResumeEventListenter();
  }

  public sendMessage(message): void {
    if (message && message !== '') {
      let params: ICreateChatMessageRequest = {
        chatroom_id: this.chatroom.id,
        text_content: message
      };
      this._createChatMessageAction.execute(params);
    }
    this.chatBox = '';
  }

  public messageInputKeypress(keypress:KeyboardEvent, elem:HTMLTextAreaElement):void {
    if (keypress.keyCode === 13 || keypress.keyCode === 10) {
      console.log(this.chatBox);
      this.sendMessage(this.chatBox);
      this.chatBox = '';
      keypress.preventDefault();
      keypress.stopPropagation();
      elem.style.height = 'auto';
      return;
    };
  }

  public hackToHideTabbar(elem:HTMLDivElement):void {
    elem.innerHTML = `
    <style>
      tabbar {
        height: 0;
      }

      ion-page.chatroom-show-page {
        height: 100% !important;
      }
    </style>
    `;
  }
  public hackToDisplayTabbar(elem:HTMLDivElement):void {
    elem.innerHTML = '';
  }

  public showChatParticipations(): void {
    this._nav.push(
      ChatParticipationsIndexPage, {chatroom: this.chatroom}
    );
  }

  private _setupChatroomSubscription(): Subscription {
    let chatroomId = this.chatroom.id;
    return this._chatroomStore.chatroom$(chatroomId).subscribe(
      (chatroom: Chatroom): void => {
        this._ngZone.run(() => {
          this.chatroom = chatroom;
          setTimeout(() => {
            this._scrollToBottom();
          }, 100);
        });
      });
  }

  private _setupNewChatMessageCreatedSubscription(): Subscription {
    return this._subscribeNewChatMessageCreatedNotificationAction.success$.subscribe(
      (chatMessage: ChatMessage): void => {
        if (this._active) {
          let chatroom = this.chatroom;
          chatroom.unreadCount = 0;
          this._chatroomStore.saveOne(chatroom);
          this._updateChatParticipationLastReadChatMessage(chatMessage);
        }
      }
    );
  }

  private _updateChatParticipationLastReadChatMessage(chatMessage: ChatMessage = null): void {
    const lastChatMessageId = (chatMessage || _.last(this.chatroom.chatMessages)).id;
    let request: IUpdateChatParticipationRequest = {
      id: this.currentChatParticipation.id,
      params: {
        last_read_chat_message_id: lastChatMessageId
      }
    };

    this._updateChatParticipationAction.execute(request);
  }
  //
  // private _setupCreateChatMessageActionSuccessSubscription(): Subscription {
  //   return this._createChatMessageAction.success$.subscribe((c): void => {
  //        this._scrollToBottom();
  //     });
  // }

  private _scrollToBottom() {
    let dimensions = this.content.getContentDimensions();

    return this.content.scrollTo(0, dimensions.contentBottom + dimensions.scrollBottom, 300);
  }

}
