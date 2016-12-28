import { Component } from '@angular/core';
import { NavParams, NavController, Modal } from 'ionic-angular';
import { Subscription } from 'rxjs/Rx';
import { ProtectedDirective } from '../../directives/protected.directive';
import { PublicEvent, Comment } from '../../models';
import { PublicEventJoinPage } from './join';
import { ShowDetail } from '../../components/index';
import { PublicEventStore } from '../../stores';
import { CommentList } from '../../components/index';
import { NewCommentPage } from '../comment/new';
import { CommentStore } from '../../stores';
import { HeroImageComponent, TimeSlotPicker } from '../../components/index';
// import { ElasticHeader } from '../../directives/elastic-header.directive';
import { CreateCommentAction, GetCommentsAction, FindUsersByFbIdAction, UpdateAction } from '../../actions';
import { AddFriendShowPage } from '../add-friend/show';
import * as _ from 'lodash';


@Component({
  templateUrl: 'build/pages/public-event/show.html',
  directives: [ShowDetail, ProtectedDirective, CommentList, HeroImageComponent, TimeSlotPicker],
  providers: [CreateCommentAction, GetCommentsAction, FindUsersByFbIdAction, UpdateAction]
})
export class PublicEventShowPage {
  public publicEventItem: {item: PublicEvent, timeSlotId: Number, publicEventId: number, type: number};
  public comments: Array<Comment>;
  eventTabs: string = "general";

  constructor(
    private _nav: NavController,
    private _navParams: NavParams,
    private _getCommentsAction: GetCommentsAction,
    private _createCommentAction: CreateCommentAction,
    private _findUsersByFbIdAction: FindUsersByFbIdAction,
    private _updateAction: UpdateAction,
    private _publicEventStore: PublicEventStore,
    private _commentStore: CommentStore
  ) {
  }

  ngOnInit(): void {
    console.debug('PublicEventShowPage OnInit');
    this.publicEventItem = this._navParams.data;
    this.publicEventItem.type=0;
    if (this.publicEventItem.publicEventId != undefined) {
      this._publicEventStore.getOne$(this.publicEventItem.publicEventId).first().subscribe(
      (publicEvent: PublicEvent) => {
        this.publicEventItem.item = publicEvent;
      }
    );

    }
    this._setupCommentsSubscription();
  }

  goToJoinPublicEvent(): void {
    this._nav.push(PublicEventJoinPage, this.publicEventItem);
  }

  public showingInformation: Boolean = true;
  public showingBooking: Boolean = false;
  public showingComments: Boolean = false;

  public changeDisplayToInformation(): void {
    this.showingInformation = true;
    this.showingBooking = false;
    this.showingComments = false;
  }

  public changeDisplayToBooking(): void {
    this.showingBooking = true;
    this.showingInformation = false;
    this.showingComments = false;
  }

  public changeDisplayToComments(): void {
    this.showingBooking = false;
    this.showingInformation = false;
    this.showingComments = true;
  }

  public handleOpenCommentModalButtonClicked() {
    let modal = Modal.create(
      NewCommentPage, {type: 'event', id: this.publicEventItem.item.id}
    );
    this._nav.present(modal);
  }

  public gotoUserProfile(fbUserId) {
    this._findUsersByFbIdAction.success$.subscribe(
      (user) => {
        this._nav.push(AddFriendShowPage, {user});
      }
    )
    this._findUsersByFbIdAction.execute(fbUserId);
  }

  private _setupCommentsSubscription(): Subscription {
    const subscription = this._commentStore.comments$.subscribe(
      (c: Array<Comment>) => {
        this.comments =
          _.filter(c, ['event_id', this.publicEventItem.item.id]);
      }
    );
    this._getCommentsAction.execute({event_id: this.publicEventItem.item.id});
    return subscription;
  }

  public gotoLike(params){
    this._updateAction.execute(params);
    console.log(params);
  }
}
