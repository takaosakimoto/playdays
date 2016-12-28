import { Component, ViewChild } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { Searchbar } from 'ionic-angular/index';
import { Subject, Subscription } from 'rxjs/Rx';
import { ICreateGroupChatroomRequest } from '../../interfaces';
import { Friend, Chatroom } from '../../models';
import { FriendStore } from '../../stores';
import { ShareSessionAction } from '../../actions';
import { SelectFriendGroupCheckBoxList } from '../../components';
import { Toast } from '../../utils/toast';
import * as _ from 'lodash';

@Component({
  templateUrl: 'build/pages/public-event/share.html',
  providers: [ShareSessionAction, Toast],
  directives: [SelectFriendGroupCheckBoxList],
})

export class PublicEventSharePage {
  public showNoSearchResultMessage: boolean = false;
  public shouldHideSearchbarCancelButton: boolean = true;
  public searchInput$: Subject<string> = new Subject<string>();
  public filteredFriends: Array<Friend>;
  public selectedFriendIds: Array<number> = [];
  private _filteredFriendsGroupsSubscription: Subscription;

  public sessionId = 0;

  constructor(
    private _nav: NavController,
    private _navParams: NavParams,
    private _toast: Toast,
    private _friendStore: FriendStore,
    private _shareSessionAction: ShareSessionAction
  ) {
  }

  ngOnInit() {
    console.debug('ChatroomNewGroupChatPage ngOnInit');
  }

  ngAfterViewInit() {
    this._filteredFriendsGroupsSubscription = this._setupFilteredFriendsGroupSubscription();
  }

  ionViewDidLeave() {
    console.debug('ChatroomNewGroupChatPage ionViewDidLeave');
  }

  ionViewDidUnload() {
    console.debug('ChatroomNewGroupChatPage ionViewDidUnload');
    this._filteredFriendsGroupsSubscription.unsubscribe();
  }

  ngOnDestroy() {
    console.debug('ChatroomNewGroupChatPage ngOnDestroy');
  }

  public handleCheckboxChange(val: Array<number>): void {
    this.selectedFriendIds = val;
  }

  public shareSession(): void {
    this.sessionId = this._navParams.data.sessionId;

    this._shareSessionAction.success$.first().subscribe(
      (): void => {
        let modalIndex = this._nav.length() - 2;
        let modal: ViewController = this._nav.getByIndex(modalIndex);
        let navTransition = this._nav.popTo(modal, { animate: false });
        navTransition.then(() => {
          modal.dismiss();
        });
        this._toast.create('Your Friend will know that you joined this event')
      }
    );
    this._shareSessionAction.error$.first().subscribe(
      (e): void => {
        console.debug(e);
      }
    );
    this._shareSessionAction.execute({
      id: this.sessionId,
      friends_consumer_ids: this.selectedFriendIds
    });
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
