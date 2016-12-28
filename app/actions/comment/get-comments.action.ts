import { Injectable } from '@angular/core';
import { Comment } from '../../models';
import { CommentEndpoint } from '../../endpoints';
import { CommentStore } from '../../stores';
import { Action } from '../../engine/action';
import { IIndexCommentRequest } from '../../interfaces';


@Injectable()
export class GetCommentsAction extends Action<IIndexCommentRequest, Array<Comment>> {

  constructor(
    private _commentEndpoint: CommentEndpoint,
    private _commentStore: CommentStore
  ) {
    super();
  }

  onExecute(params: IIndexCommentRequest):void {
    this._commentEndpoint.fetchMultiple(params).subscribe(
        (comments: Array<Comment>) => {
          this._commentStore.saveMany(comments);
          this.success$.next(comments);
        },
        e => this.error$.next(e)
      );
  }
}
