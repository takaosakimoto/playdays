import { Component } from '@angular/core';
import { Page, ActionSheet, NavController } from 'ionic-angular';
import { Subscription } from 'rxjs/Rx';
import { MeStore } from '../../stores';
import { SocialSharing } from 'ionic-native';
import { INavItemGroup } from '../../interfaces';
import { SettingsIndexPage } from '../settings/index';
import { ComingSoonIndexPage } from '../coming-soon/index';
import { FriendIndexPage } from '../friend/index';
import { AddFriendNewPage } from '../add-friend/new';
import { FeedbackIndexPage } from '../feedback/index';
import { ProfileTabIndexPage } from '../profile-tab/index';
import { ReminderTabIndexPage } from '../reminder-tab/index';
import { NavItemGroups } from '../../components/nav-item-groups';


@Component({
  templateUrl: 'build/pages/me-tab/index.html',
  directives: [NavItemGroups],
})

export class MeTabIndexPage {
  public showPage: boolean = false;
  public meTabNavGroups: [INavItemGroup];
  private _meLoggedInSubscription: Subscription;
  private _totalUnreadCountSubscription: Subscription;
  constructor(
    private _nav: NavController,
    private _meStore: MeStore
  ) {
    this.meTabNavGroups = [
      {
        hasHeader: false,
        header: '',
        listItems: [
          {
            title: 'PROFILE',
            smallText: null,
            page: ProfileTabIndexPage,
            bgImage: 'url(img/my-profile.png)',
            borderColor: '20px solid #3891E2'
          },
          // {
          //   title: 'FRIENDS LIST',
          //   page: FriendIndexPage,
          //   smallText: null,
          //   bgImage: 'url(img/friendlistBg01FriendListMask.png)',
          //   borderColor: '20px solid #D0021B'
          // },
          {
            title: 'ABOUT',
            smallText: null,
            page: SettingsIndexPage,
            bgImage: 'url(img/setting.png)',
            borderColor: '20px solid #417505'
          },
          {
            title: 'FEEDBACK',
            smallText: null,
            page: FeedbackIndexPage,
            bgImage: 'url(img/feedback.png)',
            borderColor: ' 20px solid #13355C'
          },
          {
            title: 'UPCOMING',
            smallText: 'Vote New Features!',
            page: ComingSoonIndexPage,
            bgImage: 'url(img/pinkDotsBgEventsMask.png)',
            borderColor: ' 20px solid #AE2260'
          }
        ]
      },
    ];
  }

  presentActionSheet(options) {
    let actionSheet = ActionSheet.create({
      title: 'Spread the word',
      subTitle: 'Help your friends with kids find things to do!',
      buttons: [
        {
          text: 'Share via Whatsapp',
          handler: () => {
            console.log('Share via Whatsapp clicked');
            window.plugins.socialsharing.shareViaWhatsApp('App to find things to do with your kids', null, 'www.playdays.co');
          }
        },
        {
          text: 'Share via Facebook',
          handler: () => {
            console.log('Share via Facebook clicked');
            window.plugins.socialsharing.shareViaFacebook(null, null, 'www.playdays.co');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel button clicked');
          }
        }
      ]
    });
    this._nav.present(actionSheet);
  }

  ngOnInit() {
    console.debug('FriendsTabIndexPage ngOnInit');
    // this._totalUnreadCountSubscription = this._setupTotalUnreadCountSubscription();
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

  // private _setupTotalUnreadCountSubscription(): Subscription {
  //   return this._chatroomStore.totalUnreadCount$.subscribe((count: number): void => {
  //     this._setChatroomNavItemBadge(count);
  //   });
  // }

  // private _setChatroomNavItemBadge(count: number) {
  //   this.friendsTabNavGroups[0].listItems[1].badge = count;
  // }
}
