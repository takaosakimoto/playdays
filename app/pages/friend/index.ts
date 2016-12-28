import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Subject, Subscription } from 'rxjs/Rx';
import { Friend } from '../../models';
import { MeStore, FriendStore } from '../../stores';
import { GetFriendsAction } from '../../actions';
import { FriendShowPage } from './show';
import { AddFriendSearchIndexPage } from '../add-friend/search-index';
import { FriendGroupList } from '../../components';
import * as _ from 'lodash';

@Component({
  templateUrl: 'build/pages/friend/index.html',
  providers: [GetFriendsAction],
  directives: [FriendGroupList]
})

export class FriendIndexPage {
  public showPage: boolean = false;
  public showSearchbar: boolean = false;
  public showNoSearchResultMessage: boolean = false;
  public shouldHideSearchbarCancelButton: boolean = true;
  public searchInput$ = new Subject<string>();
  public filteredFriends: Array<Friend> = [];
  private _meLoggedInSubscription: Subscription;
  private _filteredFriendsSubscription: Subscription;
  private _unregisterResumeEventListenter;

  constructor(
    private _nav: NavController,
    private _meStore: MeStore,
    private _friendStore: FriendStore,
    private _getFriendsAction: GetFriendsAction
  ) {
  }

  ngOnInit() {
    console.debug('FriendIndexPage ngOnInit');
    this._meLoggedInSubscription = this._setupMeLoggedInSubscription();
    if (!this._unregisterResumeEventListenter) {
      this._unregisterResumeEventListenter = document.addEventListener('resume', () => {
        this._getFriendsAction.execute();
      });
    }
  }

  ngAfterViewInit() {
    console.debug('FriendIndexPage ngAfterViewInit');
    this._filteredFriendsSubscription = this._setupFilteredFriendsSubscription();
  }

  ionViewWillEnter() {
    console.debug('FriendIndexPage ionViewWillEnter');
    this.showSearchbar = true;
  }

  ionViewWillLeave() {
    console.debug('FriendIndexPage ionViewWillLeave');
    this.showSearchbar = false;
  }

  ionViewDidLeave() {
    console.debug('FriendIndexPage ionViewDidLeave');
  }

  ionViewWillUnload() {
    console.debug('DirectoryIndexPage ionViewDidUnload');
  }

  ionViewDidUnload() {
    console.debug('DirectoryIndexPage ionViewDidUnload');
    this._meLoggedInSubscription.unsubscribe();
    this._filteredFriendsSubscription.unsubscribe();
    this._unregisterResumeEventListenter();
  }

  ngOnDestroy() {
    console.debug('DirectoryIndexPage ngOnDestroy');
  }

  public goToFriendShowPage(friend: Friend): void {
    this._nav.push(FriendShowPage, {friend: friend});
  }

  public goToFriendSearchPage() {
    this._nav.push(AddFriendSearchIndexPage);
  }

  private _setupFilteredFriendsSubscription(): Subscription {
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

  private _setupMeLoggedInSubscription(): Subscription {
    return this._meStore.loggedIn$.subscribe(
      (hasLoggedIn: boolean): void => {
        if (hasLoggedIn) {
          this.showPage = true;
          this.showSearchbar = true;
        }
      }
    );
  }
}
