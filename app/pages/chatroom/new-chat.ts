import { Component } from '@angular/core';import { ViewController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Subject, Subscription } from 'rxjs/Rx';
import { Friend, Chatroom } from '../../models';
import { FriendStore } from '../../stores';
import { ICreateChatroomRequest } from '../../interfaces';
import { CreateChatroomAction } from '../../actions';
import { ChatroomNewGroupChatPage1 } from './new-group-chat1';
import { FriendGroupList } from '../../components';
import * as _ from 'lodash';


@Component({
  templateUrl: 'build/pages/chatroom/new-chat.html',
  providers: [CreateChatroomAction],
  directives: [FriendGroupList]
})

export class ChatroomNewChatPage {
  public showNoSearchResultMessage: boolean = false;
  public shouldHideSearchbarCancelButton: boolean = true;
  public searchInput$ = new Subject<string>();
  public filteredFriends: Array<Friend> = [];
  private _filteredFriendsSubscription: Subscription;

  constructor(
    private _nav: NavController,
    private _viewCtrl: ViewController,
    private _friendStore: FriendStore,
    private _createChatroomAction: CreateChatroomAction
  ) {
  }

  ngOnInit() {
    console.debug('ChatroomNewChatPage ngOnInit');
    this._filteredFriendsSubscription = this._setupFilteredFriendsSubscription();
  }

  ngAfterViewInit() {
  }

  ionViewDidLeave() {
    console.debug('ChatroomNewChatPage ionViewDidLeave');
  }

  ionViewDidUnload() {
    console.debug('ChatroomNewChatPage ionViewDidUnload');
    this._filteredFriendsSubscription.unsubscribe();
  }

  ngOnDestroy() {
    console.debug('ChatroomNewGroupChatPage ngOnDestroy');
  }

  public close() {
    this._viewCtrl.dismiss();
  }

  public goToChatroomNewGroupChatPage(): void {
    this._nav.push(ChatroomNewGroupChatPage1);
  }

  public createChatroom(friend: Friend): void {
    let params: ICreateChatroomRequest = {
      consumer_id: friend.id
    };
    this._createChatroomAction.success$.first().subscribe(
      (chatroom: Chatroom): void => {
        this._viewCtrl.dismiss(chatroom);
      });
    this._createChatroomAction.error$.first().subscribe(
      (e): void => {
        console.debug(e);
      });
    this._createChatroomAction.execute(params);
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
}
