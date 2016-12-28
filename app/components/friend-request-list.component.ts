import { Component, Input, Output, EventEmitter} from '@angular/core';
import { IONIC_DIRECTIVES } from 'ionic-angular/index';
import { Subscription } from 'rxjs/Rx';
import { Me, User, FriendRequest } from '../models';
import { MeStore } from '../stores';

@Component({
  selector: 'friend-request-list',
  template: `
    <ion-list
      *ngIf="friendRequests.length !== 0">
      <ion-item
        *ngFor="let friendRequest of friendRequests"
        [hidden]="friendRequest.requesterId === me.id">
        <ion-avatar item-left button clear *ngIf="friendRequest.requester" (click)="handlerItemOnClick(friendRequest.requester)">
          <img [src]="friendRequest.requester.fbUserPictureUrl"/>
        </ion-avatar>
        <div button dark clear *ngIf="friendRequest.requester"
          (click)="handlerItemOnClick(friendRequest.requester)">
          <p>{{friendRequest.requester.name}}<p>
        </div>
        <button
          primary clear item-right
          (click)="handlerAcceptButtonOnClick(friendRequest)">
          ACCEPT
        </button>
      </ion-item>
    </ion-list>
  `,
  directives: [IONIC_DIRECTIVES],
})

export class FriendRequestListComponent {
  @Input() friendRequests: Array<FriendRequest>;
  @Output() onClickFriendRequestItem = new EventEmitter<User>();
  @Output() onClickAcceptButton =  new EventEmitter<FriendRequest>();

  public me: Me;
  private _meStoreSubscription: Subscription;
  constructor(
    private _meStore: MeStore
  ) {
  }

  ngOnInit() {
    this._meStoreSubscription = this._setupMeStoreSubscription();
  }

  ngOnDestroy() {
    this._meStoreSubscription.unsubscribe();
  }


  handlerItemOnClick(user: User): void {
    this.onClickFriendRequestItem.emit(user);
  }

  handlerAcceptButtonOnClick(fr: FriendRequest): void {
    if (fr.requesteeId === this.me.id) {
      this.onClickAcceptButton.emit(fr);
    }
  }

  private _setupMeStoreSubscription(): Subscription {
    return this._meStore.me$.subscribe((me: Me): void => {
      this.me = me;
    });
  }

}
