import { Component, ViewChild } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Subject, Subscription } from 'rxjs/Rx';
import { Friend } from '../../models';
import { FriendStore } from '../../stores';
import { SelectFriendGroupCheckBoxList } from '../../components';
import * as _ from 'lodash';

@Component({
  templateUrl: 'build/pages/private-event/invite.html',
  providers: [],
  directives: [SelectFriendGroupCheckBoxList],
})

export class PrivateEventInviteFriendPage {
  public showNoSearchResultMessage: boolean = false;
  public shouldHideSearchbarCancelButton: boolean = true;
  public searchInput$ = new Subject<string>();
  public filteredFriends: Array<Friend>;
  public selectedFriendIds: Array<number> = [];
  private _filteredFriendsGroupsSubscription: Subscription;

  constructor(
    private _viewCtrl: ViewController,
    private _navParams: NavParams,
    private _friendStore: FriendStore
  ) {
    this.selectedFriendIds = this._navParams.data.selectedFriendIds;
  }

  ngOnInit() {
    console.debug('PrivateEventInviteFriendPage ngOnInit');
  }

  ngAfterViewInit() {
    this._filteredFriendsGroupsSubscription = this._setupFilteredFriendsGroupSubscription();
  }

  ionViewDidLeave() {
    console.debug('PrivateEventInviteFriendPage ionViewDidLeave');
  }

  ionViewDidUnload() {
    console.debug('PrivateEventInviteFriendPage ionViewDidUnload');
    this._filteredFriendsGroupsSubscription.unsubscribe();
  }

  ngOnDestroy() {
    console.debug('PrivateEventInviteFriendPage ngOnDestroy');
  }

  public handleCheckboxChange(ids: Array<number>): void {
    this.selectedFriendIds = ids;
  }

  public hanldeCloseButtonClicked(): void {
    this._viewCtrl.dismiss();
  }

  public handleOkButtonClicked(): void {
    this._viewCtrl.dismiss(this.selectedFriendIds);
  }

  private _setupFilteredFriendsGroupSubscription(): Subscription {
    let searchbarInputSource = this.searchInput$.startWith('');
    let friendsSource = this._friendStore.friends$
    .filter((friends: Array<Friend>) => friends.length > 0);
    let filteredFriendsSource = searchbarInputSource.combineLatest(friendsSource, (searchText: string, friends: Array<Friend>) => {
      if (searchText === '') {
        return friends;
      } else {
        return _.filter(friends, (friend) => {
          const targetString = friend.name.toLowerCase();
          return targetString.search(searchText.toLowerCase()) >= 0;
        });
      }
    });

    return filteredFriendsSource.subscribe(
      (friends: Array<Friend>) => {
        this.showNoSearchResultMessage = (friends.length === 0);
        this.filteredFriends = friends;
      }
    );
  }

}
