import { Component, Input, Output, EventEmitter} from '@angular/core';
import { IONIC_DIRECTIVES } from 'ionic-angular/index';
import { Friend } from '../../models';
import * as _ from 'lodash';

interface IFilteredFriendsGroup {
  header: string;
  friends: Array<Friend>;
}

@Component({
  selector: 'select-friend-group-checkbox-list',
  template: `
    <ion-list>
      <div *ngFor="let friendsGroup of _friendsGroups">
        <ion-list-header>
          {{friendsGroup.header}}
        </ion-list-header>
        <ion-item *ngFor="let friend of friendsGroup.friends">
          <ion-avatar item-left button clear  (click)="handlerCheckboxChange($event, friend.id)">
            <img [src]="friend.fbUserPictureUrl" class="invite-friend-avatar-img"/>
          </ion-avatar>
          <ion-label>{{friend.name}}</ion-label>
          <ion-checkbox
            [checked]="_selectedFriendIds.indexOf(friend.id) >= 0"
            (ionChange)="handlerCheckboxChange($event, friend.id)">
          </ion-checkbox>
        </ion-item>
      </div>
    </ion-list>
  `,
  directives: [IONIC_DIRECTIVES],
})

export class SelectFriendGroupCheckBoxListComponent {

  @Output() change: EventEmitter<Array<number>> = new EventEmitter<Array<number>>();

  private _friendsGroups: Array<IFilteredFriendsGroup>;
  private _selectedFriendIds: Array<number> = [];

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

  @Input()
  set selectedFriendIds(ids: Array<number>) {
    this._selectedFriendIds = ids;
  }

  public handlerCheckboxChange(event, id): void {
    let arr = this._selectedFriendIds;
    if (event._checked) {
      arr.push(id);
    } else {
      _.pull(arr, id);
    }
    this._selectedFriendIds = arr;
    this.change.emit(arr);
  }
}
