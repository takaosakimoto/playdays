import { Component, ViewChild } from '@angular/core';
import { NavController, Searchbar, VirtualScroll } from 'ionic-angular/index';
import { Subscription, Subject } from 'rxjs/Rx';
import { ICreateFriendInvitationRequest, IAcceptFriendInvitationRequest } from '../../interfaces';
import { User, Friend, FriendRequest, Me } from '../../models';
import { ISearchUserByNameRequest} from '../../interfaces';
import { MeStore, FriendStore, FriendRequestStore, SearchUsersResultStore } from '../../stores';
import { SearchUsersAction, CreateFriendRequestAction, AcceptFriendRequestAction, GetFriendsAction } from '../../actions';
import { AddFriendShowPage } from './show';
import * as _ from 'lodash';

@Component({
  templateUrl: 'build/pages/add-friend/search-index.html',
  providers: [SearchUsersAction, CreateFriendRequestAction, AcceptFriendRequestAction, GetFriendsAction]
})

export class AddFriendSearchIndexPage {
  @ViewChild(VirtualScroll) virtualScroll: VirtualScroll;
  public showNoSearchResultMessage: boolean = false;
  public showSearchbar: boolean = false;
  public searchbarDebounce: number = 250;
  public shouldHideSearchbarCancelButton: boolean = true;
  public serachResults: Array<User>;
  public searchInput$ = new Subject<any>();
  public me: Me;
  private _searchBarInputSubscription: Subscription;
  private _searchUserResultSubscription: Subscription;
  private _searchUsersActionSuccessSubscription: Subscription;
  private _searchUsersActionErrorSubscription: Subscription;
  private _acceptFriendRequestActionSubscription: Subscription;
  private _meStoreSubscription: Subscription;
  private acceptFriendRequestIds: Array<number> = [];
  private acceptFriendRequests: Array<FriendRequest> = [];

  constructor(
    private _nav: NavController,
    private _meStore: MeStore,
    private _friendStore: FriendStore,
    private _friendRequestStore: FriendRequestStore,
    private _searchUsersResultStore: SearchUsersResultStore,
    private _searchUsersAction: SearchUsersAction,
    private _createFriendRequestAction: CreateFriendRequestAction,
    private _acceptFriendRequestAction: AcceptFriendRequestAction,
    private _getFriendsAction: GetFriendsAction
  ) {
  }

  ngOnInit() {
    console.debug('AddFriendSearchIndexPage ngOnInit');
    this._meStoreSubscription = this._setupMeStoreSubscription();
    this._searchUserResultSubscription = this._setupSearchUserResultSubscription();
    this._searchUsersActionSuccessSubscription = this._setupSearchUserActionSuccessSubscription();
    this._searchUsersActionErrorSubscription = this._setupSearchUserActionErrorSubscription();
    this._acceptFriendRequestActionSubscription = this._setupAcceptFriendRequestActionSubscription();
  }

  ngAfterViewInit() {
    this._searchBarInputSubscription = this._setupSearchBarInputSubscription();
  }

  ionViewWillEnter() {
    console.debug('AddFriendSearchIndexPage ionViewWillEnter');
    this.showSearchbar = true;
  }

  ionViewWillLeave() {
    console.debug('AddFriendSearchIndexPage ionViewWillLeave');
    this.showSearchbar = false;
  }

  ionViewDidLeave() {
    console.debug('AddFriendSearchIndexPage ionViewDidLeave');
  }

  ionViewWillUnload() {
    //
  }

  ionViewDidUnload() {
    this._searchBarInputSubscription.unsubscribe();
    this._searchUserResultSubscription.unsubscribe();
    this._searchUsersActionSuccessSubscription.unsubscribe();
    this._searchUsersActionErrorSubscription.unsubscribe();
    this._acceptFriendRequestActionSubscription.unsubscribe();
    this._meStoreSubscription.unsubscribe();
    this._searchUsersResultStore.destroy();
  }

  ngOnDestroy() {
    if (this.virtualScroll && this.virtualScroll['_unreg']) {
      this.virtualScroll['_unreg']();
      this.virtualScroll['_unreg'] = null;
    }
  }

  public showFriendActionLabel(user) {
    if ( this.me.id === user.id ) {
      return '';
    } else if ( this.acceptFriendRequestIds.indexOf(user.id) >= 0) {
      return 'ACCEPT';
    } else {
     return user.isAdded ? 'ADDED' : 'ADD';
    }
  }

  public goToAddFriendShowPage(user) {
    this._nav.push(AddFriendShowPage, { user: user });
  }

  public friendRequestAction(user) {
    if (this.acceptFriendRequestIds.indexOf(user.id) >= 0) {
      this.acceptFriendRequest(_.find(this.acceptFriendRequests, (n) => (n.requesterId === user.id)));
    } else {
      this.createFriendRequest(user);
    }
  }

  private acceptFriendRequest(friendRequest): void {
    if (friendRequest.requesteeId === this.me.id) {
      let request: IAcceptFriendInvitationRequest = {
        id: friendRequest.id,
        params: {
          action_type: 'accept',
          requester_id: friendRequest.requesterId
        }
      };
      this._acceptFriendRequestAction.execute(request);

    }
  }

  private createFriendRequest(user) {
    let params: ICreateFriendInvitationRequest = {
      requestee_id: user.id
    };
    this._createFriendRequestAction.execute(params);
  }

  private _setupSearchBarInputSubscription(): Subscription {
   return this.searchInput$
            .map((ev: KeyboardEvent): ISearchUserByNameRequest => {
              return {
                name: ev.target['value']
              };
            })
            .subscribe(this._searchUsersAction);
  }

  private _setupSearchUserResultSubscription(): Subscription {
    let friendsSource = this._friendStore.friends$;
    let pendingFriendRequestsSource = this._friendRequestStore.pendingFriendRequests$;
    let addedUsersIdSource = friendsSource.combineLatest(
      pendingFriendRequestsSource,
      (friends: Array<Friend>, friendRequests: Array<FriendRequest>
    ): Array<number> => {

      this.acceptFriendRequests = friendRequests;
      let friendsId = [];
      let friendRequestsId = [];
      this.acceptFriendRequestIds = [];
      _.each(friends, (n) => {
        return friendsId.push(n.id);
      });
      _.each(friendRequests, (n) => {
        this.acceptFriendRequestIds.push(n.requesterId);
        return friendRequestsId.push(n.requesteeId);
      });

      let arr = _.union(friendsId, friendRequestsId);
      arr = _.without(arr, this.me.id);
      this.acceptFriendRequestIds = _.without(this.acceptFriendRequestIds, this.me.id);
      return arr;
    });
    let searchResultSource = this._searchUsersResultStore.results$;

    let source = searchResultSource.combineLatest(addedUsersIdSource,
      (users: Array<User>, arr: Array<number>):  Array<User> => {
        _.each(users, (user) => {
        user.isAdded = (arr.indexOf(user.id) >= 0);
      });
      return users;
    });

    return source.subscribe(
      (users: Array<User>): void => {
        this.serachResults = users;
      }
    );
  }

  private _setupAcceptFriendRequestActionSubscription(): Subscription {
    return this._acceptFriendRequestAction.success$
      .subscribe((fr: FriendRequest): void => {
        this._getFriendsAction.execute();
      });
  }

  private _setupSearchUserActionSuccessSubscription(): Subscription {
    return this._searchUsersAction.success$.subscribe(
      (users: Array<User>): void => {
        this.showNoSearchResultMessage = (users.length === 0);
      }
    );
  }

  private _setupMeStoreSubscription(): Subscription {
    return this._meStore.me$.subscribe((me: Me): void => {
      this.me = me;
    });
  }

  private _setupSearchUserActionErrorSubscription(): Subscription {
    return this._searchUsersAction.error$.subscribe(
      (e): void => {
        console.debug('failed to get user search result', e);
      }
    );
  }
}
