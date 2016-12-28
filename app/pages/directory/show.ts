import { Component } from '@angular/core';
import { NavController, NavParams, Modal } from 'ionic-angular';
import { ProtectedDirective } from '../../directives/protected.directive';
import { Place, Comment, Me } from '../../models';
import { PrivateEventNewPage } from '../private-event/new';
import { Subscription } from 'rxjs/Rx';
import { IIndexCommentRequest, ISignupRequest } from '../../interfaces';
import { CreateCommentAction, GetCommentsAction, FindUsersByFbIdAction, UpdateAction } from '../../actions';
import { AddFriendShowPage } from '../add-friend/show';
import { CommentStore } from '../../stores';
import { CommentList, HeroImageComponent } from '../../components/index';
import { NewCommentPage } from '../comment/new';
import { ShowDetail } from '../../components/index';
import { MeStore, DestroyStores } from '../../stores';

interface Param {
  item: Item;
  timeSlotId: Number;
  isLiked: Boolean;
}

interface Item {
  id: Number;
  name: String;
  websiteUrl: String;
  contactNumber: String;
  locationAddress: String;
  description: String;
  image : String;
  priceRange?: {hi: Number, lo: Number};
  lat: String;
  long: String;
}

@Component({
  templateUrl: 'build/pages/directory/show.html',
  directives: [ProtectedDirective, CommentList, ShowDetail, HeroImageComponent],
  providers: [CreateCommentAction, GetCommentsAction, FindUsersByFbIdAction, UpdateAction]
})

export class DirectoryShowPage {
  public placeItem: {item: Place, timeSlotId: number, type: number};
  public comments: Array<Comment>;
  private _commentsSubscription: Subscription;

  eventTabs: string = "general";

  constructor(
    private _nav: NavController,
    private _navParams: NavParams,
    private _getCommentsAction: GetCommentsAction,
    private _findUsersByFbIdAction: FindUsersByFbIdAction,
    private _commentStore: CommentStore,
    private _createCommentAction: CreateCommentAction,
    private _updateAction: UpdateAction
  ) {
    const place = this._navParams.data.place;
    this.placeItem = {item: place, timeSlotId: null, type: 1};
    this._commentsSubscription = this._setupCommentsSubscription();
    let _indexCommentRequest: IIndexCommentRequest = {
      place_id: place.id
    };
    this._getCommentsAction.execute(_indexCommentRequest);
  }

  ngOnInit() {
    console.debug('DirectoryShowPage OnInit');
  }

  ionViewDidunload() {
    console.debug('DirectoryShowPage ionViewDidunload');
    this._commentsSubscription.unsubscribe();
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


  public goToPrivateEventNewPage(): void {
    this._nav.push(PrivateEventNewPage, { place: this.placeItem.item });
  }

  public handleOpenCommentModalButtonClicked() {
    let modal = Modal.create(NewCommentPage, {type: 'place', id: this.placeItem.item.id});
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
    return this._commentStore.comments$.subscribe((c: Array<Comment>) => {
      this.comments = c;
    });
  }

  public gotoLike(params){
    this._updateAction.execute(params);
    console.log(params);
  }
}
