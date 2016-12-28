import { Component, Type } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Platform, NavController, Modal, Tabs} from 'ionic-angular';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'lodash';
import { MeStore, ChatroomStore } from '../../stores';
import {
  VerifyFBAuthenticationAction,
  GetChatroomsAction,
  GetFriendsAction,
  GetSessionsAction,
  CreateChatroomAction,
  CreateGroupChatroomAction,
  GetPrivateEventsAction,
  UpdatePrivateEventInvitationAction,
  SubscribeFriendRequestAcceptedNotificationAction,
  SubscribeNewChatMessageCreatedNotificationAction,
  SubscribeNewChatroomCreatedNotificationAction,
  SubscribeNewFriendRequestNotificationAction,
  SubscribeNewReminderCreatedNotificationAction,
  SubscribeSessionApprovedNotificationAction,
  SubscribeSessionRejectedNotificationAction,
} from '../../actions';
import { VerifiedAccessToken, Me, Chatroom, PrivateEventInvitation } from '../../models';
import { DiscoveryTabIndexPage } from '../discovery-tab/index';
import { MyLikesTabIndexPage } from '../my-likes-tab/index';
import { ProfileTabIndexPage } from '../profile-tab/index';
import { FriendsTabIndexPage } from '../friends-tab/index';
import { ReminderTabIndexPage } from '../reminder-tab/index';
import { MeTabIndexPage } from '../me-tab/index';
// import { DirectoryIndexPage } from '../directory/index';
import { DirectoryHomePage } from '../directory/homepage/index';
import { PublicEventsHomePage } from '../public-event/homepage/index';
// import { PublicEventIndexPage } from '../public-event/index';
import { AuthenticationPage } from '../authentication/authentication';
import { Toast } from '../../utils/toast';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html',
  providers: [
    Toast,
    VerifyFBAuthenticationAction,
    GetFriendsAction,
    GetChatroomsAction,
    GetPrivateEventsAction,
    GetSessionsAction,
    CreateChatroomAction,
    CreateGroupChatroomAction,
    UpdatePrivateEventInvitationAction,
    SubscribeFriendRequestAcceptedNotificationAction,
    SubscribeNewChatMessageCreatedNotificationAction,
    SubscribeNewChatroomCreatedNotificationAction,
    SubscribeNewFriendRequestNotificationAction,
    SubscribeNewReminderCreatedNotificationAction,
    SubscribeSessionApprovedNotificationAction,
    SubscribeSessionRejectedNotificationAction,
  ],
})

export class TabsPage {
  @ViewChild(Tabs) tabs: Tabs;

  public discoveryTabRoot: Type = DiscoveryTabIndexPage;
  public directoryTabRoot: Type = DirectoryHomePage;
  public publicEventTabRoot: Type = PublicEventsHomePage;
  public profileTabRoot: Type = ProfileTabIndexPage;
  public myLikesTabRoot: Type = MyLikesTabIndexPage;
  public reminderTabRoot: Type = ReminderTabIndexPage;
  public meTabRoot: Type = MeTabIndexPage;
  // public friendsTabRoot: Type = FriendsTabIndexPage;
  public friendsTabBadge: any;
  private _me: Me;
  private _meLoggedInSubscription: Subscription;
  private _meSubscription: Subscription;
  private _totalUnreadCountSubscription: Subscription;
  private _chatroomsSubscription: Subscription;
  private _actionSuccessSubscriptions: Array<Subscription>;
  private joinedNotificatonChannel: boolean = false; // temp

  constructor(
    private _platform: Platform,
    private _nav: NavController,
    private _toast: Toast,
    private _meStore: MeStore,
    private _chatroomStore: ChatroomStore,
    private _verifyFBAuthenticationAction: VerifyFBAuthenticationAction,
    private _getFriendsAction: GetFriendsAction,
    private _getChatroomsAction: GetChatroomsAction,
    private _getPrivateEventsAction: GetPrivateEventsAction,
    private _getSessionAction: GetSessionsAction,
    private _createChatroomAction: CreateChatroomAction,
    private _createGroupChatroomAction: CreateGroupChatroomAction,
    private _updatePrivateEventInvitationAction: UpdatePrivateEventInvitationAction,
    private _subscribeFriendRequestAcceptedNotificationAction: SubscribeFriendRequestAcceptedNotificationAction,
    private _subscribeNewChatroomCreatedNotificationAction: SubscribeNewChatroomCreatedNotificationAction,
    private _subscribeNewFriendRequestNotificationAction: SubscribeNewFriendRequestNotificationAction,
    private _subscribeNewReminderNotificationAction: SubscribeNewReminderCreatedNotificationAction,
    private _subscribeSessionApprovedNotificationAction: SubscribeSessionApprovedNotificationAction,
    private _subscribeSessionRejectedNotificationAction: SubscribeSessionRejectedNotificationAction,
    private _subscribeNewChatMessageCreatedNotificationAction: SubscribeNewChatMessageCreatedNotificationAction
  ) {
  }

  ngOnInit() {
    console.debug('TabsPage ngOnInit');
    this._meLoggedInSubscription = this._setupMeLoggedInSubscription();
    this._meSubscription = this._setupMeSubscription();
    this._totalUnreadCountSubscription = this._setupTotalUnreadCountSubscription();
    this._actionSuccessSubscriptions = this._setupActionSuccessSubscriptions();
    this._totalUnreadCountSubscription = this._setupTotalUnreadCountSubscription();
  }

  ionViewLoaded() {
    console.debug('TabsPage ionViewLoaded');
  }

  ionViewWillEnter() {
    console.debug('TabsPage ionViewWillEnter');
  }

  ionViewDidEnter() {
    console.debug('TabsPage ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.debug('TabsPage ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.debug('TabsPage ionViewDidLeave');
  }

  ionViewWillUnload() {
    console.debug('TabsPage ionViewWillUnload');
  }

  ionViewDidUnload() {
    console.debug('TabsPage ionViewDidUnload');
    this._meLoggedInSubscription.unsubscribe();
    this._meSubscription.unsubscribe();
    this._totalUnreadCountSubscription.unsubscribe();
    _.map(this._actionSuccessSubscriptions, _.method('unsubscribe'));
  }

  public selectEventsHomePageTab() {
    this._selectedProtectedTab();
  }

  public selectDirectoryHomePageTab() {
    this._selectedProtectedTab();
  }

  public selectFriendsTab() {
   this._selectedProtectedTab();
  }

  public selectProfileTab() {
    this._selectedProtectedTab();
  }

  public selectReminderTab() {
    this._selectedProtectedTab();
  }

  private _selectedProtectedTab() {
    this._meStore.loggedIn$.first().subscribe(
      (loggedIn) => {
        if (!loggedIn) {
          this._showAuthenticationModal();
        }
      }
    );
  }

  private _setupMeLoggedInSubscription(): Subscription {
    this._meStore.loggedIn$.first().subscribe(
      (hasLoggedIn: boolean): void => {
        if (hasLoggedIn) {
          //this._verifyFBAuthenticationStatus();
        }
      }
    );

    return this._meStore.loggedIn$.subscribe(
      (hasLoggedIn: boolean): void => {
        if (hasLoggedIn) {
          //this._getFriendsAction.execute();
          //this._getChatroomsAction.execute();
          //this._getPrivateEventsAction.execute();
          //this._getSessionAction.execute();
        }
      }
    );
  }

  private _setupMeSubscription(): Subscription {
    let loggedInSource = this._meStore.loggedIn$.filter((x) => x);
    let meSource = this._meStore.me$.filter((x) => !!x.id);
    let source = loggedInSource.combineLatest(meSource, (x, me) => me);
    return source.subscribe((me: Me): void => {
      this._me = me;
      if (!this.joinedNotificatonChannel) {
        this._joinNotificationChannels();
        this.joinedNotificatonChannel = true;
      }

      if (!this._chatroomsSubscription) {
        this._chatroomsSubscription = this._setupChatroomsSubscription();
      }
    });
  }

  private _setupTotalUnreadCountSubscription(): Subscription {
    return this._chatroomStore.totalUnreadCount$.subscribe((count: number): void => {
      if (count === 0) {
        this.friendsTabBadge = '';
      } else {
        this.friendsTabBadge = count;
      }
    });
  }

  private _setupActionSuccessSubscriptions(): Array<Subscription> {
    let sessionApprovedSource = this._subscribeSessionApprovedNotificationAction.success$;
    let sessionRejectedSource = this._subscribeSessionRejectedNotificationAction.success$;
    let newChatroomSource = this._subscribeNewChatroomCreatedNotificationAction.success$;
    let friendRequestAcceptedSource = this._subscribeFriendRequestAcceptedNotificationAction.success$;
    let newFriendRequestSource = this._subscribeNewFriendRequestNotificationAction.success$;
    let createChatRoomSource = this._createChatroomAction.success$;
    let createGroupChatroomActionSource = this._createGroupChatroomAction.success$;
    let UpdatePrivateEventInvitationSource = this._updatePrivateEventInvitationAction.success$;
    return [
      sessionApprovedSource.subscribe(
        () => this._toast.create('Your Class is begin confirmed')
      ),
      sessionRejectedSource.subscribe(
        () => this._toast.create('Your Class is begin rejected')
      ),
      newChatroomSource.subscribe(
        (chatroom: Chatroom) => this._joinChatroomChannels(chatroom)
      ),
      friendRequestAcceptedSource.subscribe(
        () => this._getFriendsAction.execute()
      ),
      newFriendRequestSource.subscribe(

      ),
      createChatRoomSource.subscribe(
        (chatroom: Chatroom) => this._joinChatroomChannels(chatroom)
      ),
      createGroupChatroomActionSource.subscribe(
        (chatroom: Chatroom) => this._joinChatroomChannels(chatroom)
      ),
      UpdatePrivateEventInvitationSource.subscribe(
        () => this._getPrivateEventsAction.execute()
      )
    ];
  }

  private _verifyFBAuthenticationStatus() {
    this._verifyFBAuthenticationAction.execute();
    this._verifyFBAuthenticationAction.success$.first().subscribe(
      (verifiedAccessToken: VerifiedAccessToken) => {
        console.debug('verifiedAccessToken', verifiedAccessToken);
        if (!verifiedAccessToken.isValid) {
          // remove all stores
          this._meStore.destroy();
        }
      }
    );
  }

  private _showAuthenticationModal() {
    let modal = Modal.create(AuthenticationPage);
    this._nav.present(modal);
  }

  private _joinNotificationChannels(): void {
    let consumerId = this._me.id;
    let params = {consumerId: consumerId};
    this._subscribeNewFriendRequestNotificationAction.execute(params);
    this._subscribeFriendRequestAcceptedNotificationAction.execute(params);
    this._subscribeNewChatroomCreatedNotificationAction.execute(params);
    this._subscribeSessionApprovedNotificationAction.execute(params);
    this._subscribeSessionRejectedNotificationAction.execute(params);
    this._subscribeNewReminderNotificationAction.execute(params);
  }

  private _setupChatroomsSubscription(): Subscription {
    return this._chatroomStore.chatrooms$.first().subscribe((chatrooms: Array<Chatroom>): void => {
      _.each(chatrooms, (c) => {
        this._joinChatroomChannels(c);
      });
    });
  }

  private _joinChatroomChannels(chatroom: Chatroom): void {
    let params = { chatroomId: chatroom.id, consumerId: this._me.id };
    this._subscribeNewChatMessageCreatedNotificationAction.execute(params);
  }


}
