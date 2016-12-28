import {
  Component,
  Input,  Output,
  EventEmitter,
  Pipe, PipeTransform
} from '@angular/core';
import { ProtectedDirective } from '../../directives/protected.directive';
import { Comment } from '../../models';
import * as moment from 'moment';


const dateMap = {
  lastDay : '[Yesterday] h[:]mma',
  sameDay : '[Today] h[:]mma',
  nextDay : '[Tomorrow] h[:]mma',
  lastWeek : '[last] dddd h[:]mma',
  nextWeek : 'dddd h[:]mma',
  sameElse : 'L'
};

@Pipe({name: 'phrasedDate'})
export class PhrasedDate implements PipeTransform {
  transform(date: Date): String {
    return moment(date).calendar(null, dateMap);
  }
}

@Component({
  selector: 'comment-list',
  template: `
  <div class="comment-container">
    <center>
      <button *ngIf="comments.length !== 0" round class="comment-btn"
      protected
      (protectedOnClick)="handleAddCommentClicked()">

        WRITE A COMMENT
      </button>
    </center>

    <center>
      <button *ngIf="comments.length == 0" round class="no-comment-btn"
      protected
      (protectedOnClick)="handleAddCommentClicked()">

        Be the first to comment
      </button>
    </center>

    <p *ngIf="comments.length == 0" class="no-body-has-comment-yet">
      No comments yet, be the first to comment and help the Playdays parenting community!
    </p>
    <div
      *ngFor="let comment of comments"
      class="comment-card-item"
    >
      <h5 class="comment-avatar" (click)="handleAvatarClick(comment)">{{ comment.userName }}</h5>
      <div
        class="comment-card-block"
      >
        <p class="comment-card-text">{{comment.textContent}}</p>
      </div>
      <p class="comment-card-time">
        {{ comment.createdAt | phrasedDate }}
      </p>
    </div>
  </div>
  `,
  directives: [ProtectedDirective],
  pipes: [PhrasedDate],
})
export class CommentListComponent {

  @Input() comments: Comment;
  @Output() onAddComment: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCommentAvatarClick: EventEmitter<string> = new EventEmitter<string>();

  public handleAddCommentClicked(): void {
    this.onAddComment.emit(null);
  }

  public handleAvatarClick(comment): void {
    this.onCommentAvatarClick.emit(comment.fbUserId);
  }

}
