import { NavController } from 'ionic-angular/index';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { IAcceptFriendInvitationRequest } from '../../interfaces';
import { FriendRequest } from '../../models';
import { MeStore, FriendRequestStore } from '../../stores';
import { GetFriendsAction, GetFriendRequestsAction, AcceptFriendRequestAction } from '../../actions';
import { AddFriendSearchIndexPage } from './search-index';
import { FriendRequestList } from '../../components';
import { AddFriendShowPage } from './show';

@Component({
  templateUrl: 'build/pages/add-friend/new.html',
  providers: [GetFriendsAction, GetFriendRequestsAction, AcceptFriendRequestAction],
  directives: [FriendRequestList],
})

export class AddFriendNewPage {
  public friendRequests: Array<FriendRequest> = [];

  private _meLoggedInSubscription: Subscription;
  private _inboundFriendRequestsStoreSubscription: Subscription;
  private _getFriendRequestsActionSuccessSubscription: Subscription;
  private _getFriendRequestsActionErrorSubscription: Subscription;
  private _acceptFriendRequestActionSuccessSubscription: Subscription;
  private _unregisterResumeEventListenter;

  constructor(
    private _nav: NavController,
    private _meStore: MeStore,
    private _friendRequestStore: FriendRequestStore,
    private _getFriendsAction: GetFriendsAction,
    private _getFriendRequestsAction: GetFriendRequestsAction,
    private _acceptFriendRequestAction: AcceptFriendRequestAction
  ) {
  }

  ngOnInit() {
    console.debug('FriendNewPage ngOnInit');
    this._meLoggedInSubscription = this._setUpMeLoggedInSubscroption();
    this._inboundFriendRequestsStoreSubscription = this._setupInboundFriendRequestsStoreSubscription();
    this._getFriendRequestsActionSuccessSubscription = this._setupGetFriendRequestsActionSuccessSubscription();
    this._getFriendRequestsActionErrorSubscription = this._setupGetFriendRequestsActionErrorSubscription();
    this._acceptFriendRequestActionSuccessSubscription = this._setupAcceptFriendRequestActionSuccessSubscription();

    if (!this._unregisterResumeEventListenter) {
      this._unregisterResumeEventListenter = document.addEventListener('resume', () => {
        this._getFriendRequestsAction.execute();
      });
    }
  }

  ionViewDidLeave() {
    console.debug('FriendNewPage ionViewDidLeave');
  }

  ionViewDidUnload() {
    this._meLoggedInSubscription.unsubscribe();
    this._inboundFriendRequestsStoreSubscription.unsubscribe();
    this._getFriendRequestsActionSuccessSubscription.unsubscribe();
    this._getFriendRequestsActionErrorSubscription.unsubscribe();
    this._acceptFriendRequestActionSuccessSubscription.unsubscribe();
    this._unregisterResumeEventListenter();
  }

  ngOnDestroy() {
    //
  }

  public goToFriendSearchPage() {
    this._nav.push(AddFriendSearchIndexPage);
  }

  public goToAddFriendhowPage(user) {
    this._nav.push(AddFriendShowPage, {user: user});
  }

  public acceptFriendRequest(friendRequest): void {
    let request: IAcceptFriendInvitationRequest = {
      id: friendRequest.id,
      params: {
        action_type: 'accept',
        requester_id: friendRequest.requesterId
      }
    };
    this._acceptFriendRequestAction.execute(request);
  }


  private _setUpMeLoggedInSubscroption(): Subscription {
    let meLoggedInSource = this._meStore.loggedIn$;

    return meLoggedInSource.subscribe(
      (hasLoggedIn: boolean): void => {
        if (hasLoggedIn) {
          this._getFriendRequestsAction.execute();
        }
      }
    );
  }

  private _setupInboundFriendRequestsStoreSubscription(): Subscription {
    return this._friendRequestStore.inboundFriendRequests$
      .subscribe((frs: Array<FriendRequest>): void => {
        this.friendRequests = frs;
      });
  }

  private _setupGetFriendRequestsActionSuccessSubscription(): Subscription {
    return this._getFriendRequestsAction.success$
      .subscribe((friendRequests: Array<FriendRequest>): void => {
        //
      });
  }

  private _setupGetFriendRequestsActionErrorSubscription(): Subscription {
    return this._getFriendRequestsAction.error$.subscribe((e): void => {
      console.debug('failed to get friend requests', e);
    });
  }

  private _setupAcceptFriendRequestActionSuccessSubscription(): Subscription {
    return this._acceptFriendRequestAction.success$.subscribe((): void => {
      this._getFriendsAction.execute();
    });
  }
}
