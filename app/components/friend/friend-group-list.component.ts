import { Component, Input, Output, EventEmitter} from '@angular/core';
import { IONIC_DIRECTIVES } from 'ionic-angular/index';
import { Friend } from '../../models';
import * as _ from 'lodash';

interface IFriendsGroup {
  header: string;
  friends: Array<Friend>;
}

@Component({
  selector: 'friend-group-list',
  template: `
    <ion-list>
      <div *ngFor="let friendsGroup of _friendsGroups">
        <ion-list-header>
          {{friendsGroup.header}}
        </ion-list-header>
        <button ion-item detail-none
          *ngFor="let friend of friendsGroup.friends"
          (click)="handlerItemOnClick(friend)">
          <ion-label>
            {{friend.name}}
          </ion-label>
        </button>
      </div>
    </ion-list>
  `,
  directives: [IONIC_DIRECTIVES],
})

export class FriendGroupListComponent {

  @Output() onClickFriendItem: EventEmitter<Friend> = new EventEmitter<Friend>();

  private _friendsGroups: Array<IFriendsGroup>;

  constructor() {
    //
  }

  @Input()
  set friends(friends:  Array<Friend>) {
    let friendsGroups = _.map(_.groupBy(friends, (f) => f.name[0]), (g) => {
      return {
        header: g[0].name[0],
        friends: g
      };
    });
    this._friendsGroups = friendsGroups;
  }

  handlerItemOnClick(friend: Friend): void {
    this.onClickFriendItem.emit(friend);
  }
}
