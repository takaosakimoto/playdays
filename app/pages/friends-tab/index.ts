import { Component } from '@angular/core';
import { Page } from 'ionic-angular';
import { Subscription } from 'rxjs/Rx';
import { MeStore, ChatroomStore } from '../../stores';
import { INavItemGroup } from '../../interfaces';
import { FriendIndexPage } from '../friend/index';
import { AddFriendNewPage } from '../add-friend/new';
import { ChatroomIndexPage } from '../chatroom/index';
import { PrivateEventIndexPage } from '../private-event/index';
import { NavItemGroups } from '../../components/nav-item-groups';


@Component({
  templateUrl: 'build/pages/friends-tab/index.html',
  directives: [NavItemGroups],
})

export class FriendsTabIndexPage {
  public showPage: boolean = false;
  public friendsTabNavGroups: [INavItemGroup];
  private _meLoggedInSubscription: Subscription;
  private _totalUnreadCountSubscription: Subscription;
  constructor(
    private _meStore: MeStore,
    private _chatroomStore: ChatroomStore
  ) {
    this.friendsTabNavGroups = [
      {
        hasHeader: false,
        header: '',
        listItems: [
          {
            title: 'Friends List',
            page: FriendIndexPage,
            smallText: null,
            bgImage: 'url(img/friends-list.png)',
            borderColor: '20px solid #D0021B'
          },
          {
            title: 'Add A New Friend',
            smallText: null,
            page: AddFriendNewPage,
            bgImage: 'url(img/add-new-friend-list.png)',
            borderColor: ' 20px solid #13355C'
          },
          // {
          //   title: 'Chats',
          //   smallText: '(Coming Soon)',
          //   page: null,
          //   bgImage: 'url(img/chats-list.png)',
          //   borderColor: '20px solid #F5A623'
          // },
          {
            title: 'Private Events',
            smallText: '(Coming Soon)',
            page: null,
            bgImage: 'url(img/joined-private-events.png)',
            borderColor: ' 20px solid #AE2260'
          }
        ]
      },
    ];
  }

  ngOnInit() {
    console.debug('FriendsTabIndexPage ngOnInit');
    this._totalUnreadCountSubscription = this._setupTotalUnreadCountSubscription();
    this._meLoggedInSubscription = this._setupMeLoggedInSubscription();
  }

  ionViewLoaded() {
    console.debug('FriendsTabIndexPage ionViewLoaded');
  }

  ionViewDidEnter() {
    console.debug('FriendsTabIndexPage ionViewDidEnter');
  }

  ionViewDidLeave() {
    console.debug('FriendsTabIndexPage ionViewDidLeave');
  }

  ionViewWillUnload() {
    console.debug('FriendsTabIndexPage ionViewWillUnload');
  }

  ionViewDidUnload() {
    console.debug('FriendsTabIndexPage ionViewDidUnload');
    this._meLoggedInSubscription.unsubscribe();
    this._totalUnreadCountSubscription.unsubscribe();
  }

  private _setupMeLoggedInSubscription() {
    return this._meStore.loggedIn$.subscribe(
      (hasLoggedIn: boolean): void => {
        if (hasLoggedIn) {
          this.showPage = true;
        } else {
          this.showPage = false;
        }
      }
    );
  }

  private _setupTotalUnreadCountSubscription(): Subscription {
    return this._chatroomStore.totalUnreadCount$.subscribe((count: number): void => {
      this._setChatroomNavItemBadge(count);
    });
  }

  private _setChatroomNavItemBadge(count: number) {
    this.friendsTabNavGroups[0].listItems[1].badge = count;
  }
}
