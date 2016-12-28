import { Component } from '@angular/core';
import { NavParams, NavController, Modal } from 'ionic-angular';
import { Subscription } from 'rxjs/Rx';
import { ProtectedDirective } from '../../directives/protected.directive';
import { TrialClass, Comment } from '../../models';
import { TrialClassJoinPage } from './join';
import { ShowDetail } from '../../components/index';
import { TrialClassStore } from '../../stores';
import { CommentList } from '../../components/index';
import { NewCommentPage } from '../comment/new';
import { CommentStore } from '../../stores';
import { CreateCommentAction, GetCommentsAction, FindUsersByFbIdAction } from '../../actions';
import { AddFriendShowPage } from '../add-friend/show';
import * as _ from 'lodash';

@Component({
  templateUrl: 'build/pages/trial-class/show.html',
  directives: [ShowDetail, ProtectedDirective, CommentList],
  providers: [CreateCommentAction, GetCommentsAction, FindUsersByFbIdAction]
})
export class TrialClassShowPage {
  public trialClassItem: {item: TrialClass, timeSlotId: number, trialClassId: number};
  public timeSlotId: number;
  public comments: Array<Comment>;

  constructor(
    private _nav: NavController,
    private _navParams: NavParams,
    private _trialClassStore: TrialClassStore,
    private _getCommentsAction: GetCommentsAction,
    private _createCommentAction: CreateCommentAction,
    private _findUsersByFbIdAction: FindUsersByFbIdAction,
    private _commentStore: CommentStore
  ) {
  }

  ngOnInit():void {
    console.debug('TrialClassShowPage OnInit');
    this.trialClassItem = this._navParams.data;
    if (this.trialClassItem.trialClassId != undefined) {
      this._trialClassStore.getOne$(this.trialClassItem.trialClassId).first().subscribe(
      (trailClass: TrialClass) => {
        this.trialClassItem.item = trailClass;
      }
    );

    }
    this._setupCommentsSubscription();
  }

  goToJoinTrialClass():void {
    this._nav.push(TrialClassJoinPage, this.trialClassItem);
  }

  public handleOpenCommentModalButtonClicked() {
    let modal = Modal.create(
      NewCommentPage, {type: 'trial_class', id: this.trialClassItem.item.id}
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
          _.filter(c, ['trial_class_id', this.trialClassItem.item.id]);
      }
    );
    this._getCommentsAction.execute({trial_class_id: this.trialClassItem.item.id});
    return subscription;
  }
}
