import { Component, Output, Input, EventEmitter } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Subject, Subscription } from 'rxjs/Rx';
import { Friend } from '../../models';
import { FriendGroupList } from '../../components';
import * as _ from 'lodash';

@Component({
  template: `
    <ion-navbar primary *navbar>
      <ion-buttons>
        <button (click)="close()">
          <ion-icon name="md-close"></ion-icon>
        </button>
      </ion-buttons>
      <ion-title>ADD PARTICIPANT</ion-title>
    </ion-navbar>

    <ion-toolbar>
      <ion-searchbar
        [placeholder]="'Search'"
        [debounce]="1000"
        [cancelButtonText]="Cancel"
        (ionInput)="searchInput$.next($event.target.value)">
      </ion-searchbar>
    </ion-toolbar>

    <ion-content class="friend-index-page">
      <friend-group-list
        [friends]="filteredFriends"
        (onClickFriendItem)="onFriendSelected($event)">
      </friend-group-list>

      <div [hidden]="!showNoSearchResultMessage">
        <center>
          No Search Result
        </center>
      </div>
    </ion-content>
  `,
  directives: [FriendGroupList]
})

export class SelectFriend {
  public showNoSearchResultMessage: boolean = false;
  public searchInput$ = new Subject<string>();
  public friends: Array<Friend> = [];
  public filteredFriends: Array<Friend> = [];

  constructor(
    private _navParams: NavParams,
    private _viewCtrl: ViewController
  ) {
  }

  public close() {
    this._viewCtrl.dismiss();
  }

  ngOnInit() {
    console.debug('SelectFriend ngOnInit');
    this.friends = this._navParams.get('friends');
    this._setupFilteredFriendsSubscription()
  }

  private _setupFilteredFriendsSubscription(): Subscription {
    return this.searchInput$.startWith('').map(
      (searchText: string) => {
        if (searchText === '') {
          return this.friends;
        } else {
          return _.filter(this.friends, (friend) => {
            const targetString = friend.name.toLowerCase();
            return targetString.search(searchText.toLowerCase()) >= 0;
          });
        }
      }
    ).subscribe(
      (friends: Array<Friend>) => {
        this.showNoSearchResultMessage = (friends.length === 0);
        this.filteredFriends = friends;
      }
    );
  }

  public onFriendSelected(friend: Friend) {
    this._viewCtrl.dismiss(friend);
  }
}
