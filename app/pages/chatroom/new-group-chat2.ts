import { ViewChild, Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { Searchbar } from 'ionic-angular/index';
import { Subject, Subscription } from 'rxjs/Rx';
import { ICreateGroupChatroomRequest } from '../../interfaces';
import { Friend, Chatroom } from '../../models';
import { FriendStore } from '../../stores';
import { CreateGroupChatroomAction } from '../../actions';
import { SelectFriendGroupCheckBoxList } from '../../components';
import * as _ from 'lodash';

@Component({
  templateUrl: 'build/pages/chatroom/new-group-chat2.html',
  providers: [CreateGroupChatroomAction],
  directives: [SelectFriendGroupCheckBoxList],
})

export class ChatroomNewGroupChatPage2 {
  public showNoSearchResultMessage: boolean = false;
  public shouldHideSearchbarCancelButton: boolean = true;
  public searchInput$ = new Subject<string>();
  public filteredFriends: Array<Friend>;
  public selectedFriendIds: Array<number> = [];
  private _filteredFriendsGroupsSubscription: Subscription;

  constructor(
    private _nav: NavController,
    private _navParams: NavParams,
    private _friendStore: FriendStore,
    private _createGroupChatroomAction: CreateGroupChatroomAction
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

  public createGroupChatroom(): void {
    let name = this._navParams.data.name;
    let params: ICreateGroupChatroomRequest = {
      consumer_ids: this.selectedFriendIds,
      name: name,
    };
    this._createGroupChatroomAction.success$.first().subscribe(
      (chatroom: Chatroom): void => {
        let modalIndex = this._nav.length() - 3;
        let modal: ViewController = this._nav.getByIndex(modalIndex);
        let navTransition = this._nav.popTo(modal, { animate: false });
        navTransition.then(() => {
          modal.dismiss(chatroom);
        });
      });
    this._createGroupChatroomAction.error$.first().subscribe(
      (e): void => {
        console.debug(e);
      });
    this._createGroupChatroomAction.execute(params);
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
